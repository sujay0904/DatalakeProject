var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var filepath = 'C:/Users/Owner/Desktop/cis550-project/new.json';
var filename = filepath.replace(/^.*[\\\/]/, '').toString();
var file_ext3 = filename.substr(filename.length - 4);
var file_ext4 = filename.substr(filename.length - 5);


var file = fs.readFileSync(filepath, 'utf8');
var insertDocument = function(db, callback) {
	db.collection('testCollection').insert(JSON.parse(file), function(err, result) {
		assert.equal(err, null);
		console.log("inserted");
		callback();
	});
};

var uri = 'mongodb://localhost/cis550project';
MongoClient.connect(uri, function(err, db) {
	assert.equal(null, err);
	insertDocument(db, function() {
		db.close();
	});
});