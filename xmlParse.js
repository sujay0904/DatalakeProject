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
	str = str.replace(/"]/g, '\"').toString();
	str = str.replace(/\["/g, '\"').toString();
	// str = str.replace('\"]', '').toString();
	str = str.replace(/\[/g, '{').toString();
	str = str.replace(/]/g, '}').toString();
	// str = str.replace(']','}');
	//str = str.replace(/[[\]]/g,'').toString();
	fs.writeFile('myfile.json', str);
	//console.log(str);
}

xmlParse(filepath, main);	// xml parser