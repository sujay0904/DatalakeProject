var Converter=require("csvtojson").Converter;
var columArrData="fs_read.csv";
var fs = require('fs');
var rs=fs.createReadStream(columArrData);
var result = {}


function csvParse(callback){
var csvConverter=new Converter();
//end_parsed will be emitted once parsing finished 
csvConverter.on("end_parsed", function(jsonObj) {
str = JSON.stringify(result);
callback();   
});
 
//record_parsed will be emitted each time a row has been parsed. 
csvConverter.on("record_parsed", function(resultRow, rawRow, rowIndex) {
 
    for (var key in resultRow) {
        if (!result[key] || !result[key] instanceof Array) {
            result[key] = [];
        }
        result[key][rowIndex] = resultRow[key];
    }
 
});
rs.pipe(csvConverter);
}
function main() {
	
	

	fs.writeFile('fs_read.json', str);
	
	}
csvParse(main);