var spawn = require("child_process").spawn;
var id = 0;
var path = "./JSONPARSER3.py"
var process = spawn('python',[path, "./testing.json", id]);
var x;
process.stdout.on('data', function (x){
console.log(x.toString());
// Do something with the data returned from python script
});
