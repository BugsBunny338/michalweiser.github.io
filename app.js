var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) - 100;
var h = 200;
var barPadding = 1;
var pool = [];
var i = 0;

//Create SVG element
var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

function render() {
    var bars = svg.selectAll("rect")
        .data(dataset);

    bars.enter()
        .append("rect")
        .append("text")
        .text("aaa")
        .attr("x", function (d, i) {
            return i * (w / dataset.length);
        })
        .attr("y", function (d) {
            return -10;
        })
        .attr("width", w / dataset.length - barPadding)
        .attr("height", function (d) {
            return 10;
        });

    bars
        .attr("x", function (d, i) {
            return i * (w / dataset.length);
        })
        .attr("y", function (d) {
            return h - (d.value * 4);
        })
        .attr("width", w / dataset.length - barPadding)
        .attr("height", function (d) {
            return d.value * 4;
        })
        .attr("class", function(d, i) {
            if (d.win) {
                return "win";
            }
        });
}

function createPool() {
    var y, members = [];

    for (i = 0; i < dataset.length; i += 1) {
        for (y = 0; y < dataset[i].value; y += 1) {
            members.push(dataset[i].name);
        }
    }

    return shuffle(members);
}

function getRandomMember() {
    return pool[Math.floor(Math.random()*pool.length)];
}

function publish(member) {
    // mark winner in dataset
    for (i = 0; i < dataset.length; i += 1) {
        if (dataset[i].name === member) {
            dataset[i].win = true;
        }
    }

    // remove member from pool
    pool = pool.clean(member);

    // publish name
    var text = document.getElementById("winners").innerHTML += "<div class=\"winner\">" + member + "</div>";
}

function getWinner() {
    var winner;

    if(pool.length) {
        winner = getRandomMember();
        publish(winner);
        render();
    }
};

document.onclick = getWinner;

render();
pool = createPool();
