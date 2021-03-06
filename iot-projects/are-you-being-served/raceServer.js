var http = require("http");
var async = require("async");

var port = 8686;

http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    
    let racers = ["Green Ambler", "Catalack", "Steel Runner", "G.I. Jogger"];

    // TODO 6: Get the start time for the race
    let d = new Date();
    let startTime = d.getTime();

    // TODO 11: Make the whole thing parallel
    async.parallel( 
        // TODO 8: Supply an array of functions
        [
            (callback) => {
                wrapper(callback);
            },
            (callback) => {
                wrapper(callback);
            },
            (callback) => {
                wrapper(callback);
            },
            (callback) => {
                wrapper(callback);
            }
        ],
        function (error, results) {
            // TODO 9: add a callback function to the end of the async call to tally the results 
            res.write("Results:\n");
            var victoryOrder = sortTogether(racers, results);

            victoryOrder.forEach(element => {
                res.write(`${element}\n`);
            });
            let end = new Date();
            let elapsed = end.getTime() - startTime; 
            console.log(elapsed+'');
            res.write(`${elapsed}`);
            res.end();
        }
    );
    
}).listen(port);

// TODO 7: create a common function to be called by all functions in the array passed to the async function
function wrapper(callback){
    setTimeout(() => {
        let d = new Date();
        callback(null, d.getTime());
    },Math.random()*1000);

}

function sortTogether(names, times) {
    var tempList = [];
    for (var i = 0; i < names.length; i++) {
        tempList.push({'name': names[i], 'time': times[i]});
    }

    tempList.sort(function(a, b) {
        return ((a.time < b.time) ? -1 : ((a.time == b.time) ? 0 : 1));
    });

    for (var i = 0; i < tempList.length; i++) {
        names[i] = tempList[i].name;
    }
    return names;
}
