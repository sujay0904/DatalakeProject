// query data from mongodb 

var searchTerm = 'shravan sujay';

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var uri = 'mongodb://localhost/cis550project';

var invertedIndex = [], forwardIndex = [];

var get_InvertedIndex = function (db, callback){

	var cursor = db.collection('InvertedIndex').find({} , {_id:0} );
   	cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         invertedIndex.push(doc);
    	 // console.log(invertedIndex);     
      } else {
         // console.log("not found");
         callback();
      }
   });
};


var get_ForwardIndex = function(db, callback){


	var cursor = db.collection('node').find({ } , {_id:0} );
   	cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         forwardIndex.push(doc);
    	 //console.log(doc);
    	 //console.log('Converting to keys, hopefully: ' + Object.keys(doc));     
      } else {
         // console.log("not found");
         callback();
      }
   });
}

MongoClient.connect(uri, function(err, db) {
  assert.equal(null, err);
  get_InvertedIndex(db, function() {
      db.close();
  });
});

MongoClient.connect(uri, function(err, db) {
  assert.equal(null, err);
  get_ForwardIndex(db, function() {
      db.close();
  });
});






var express = require('express'), http = require('http'); 

var app = express();


tables = {

	"invertedIndex": invertedIndex,
	"forwardIndex": forwardIndex, 
	"searchTerm": searchTerm
}


app.use(express.static(__dirname + "/client/"));

http.createServer(app).listen(3000);
console.log("listening on 3000");

app.get("/data", function(req, res){

	res.json(tables);
});

