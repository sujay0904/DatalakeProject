var fs = require('fs');
var xml2js = require('xml2js');

var filepath = 'C:/Users/Owner/Desktop/cis550-project/test_file.xml';

var str;
function xmlParse(path, callback){
	var parser = new xml2js.Parser();

	fs.readFile(path, function(err, data) {
    	parser.parseString(data);
  	});

	parser.addListener('end', function(data) {
    	str = JSON.stringify(data);
    	callback();
	});
}

function main() {
	//console.log(str);
	fs.writeFile('myfile.json', str);
}

xmlParse(filepath, main);	// xml parser