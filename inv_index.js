var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// var filepath = 'C:/Users/Owner/Desktop/cis550-project/test.json';
// var filename = filepath.replace(/^.*[\\\/]/, '').toString();
// var name = filename.substr(0, filename.lastIndexOf('.'));
// var file_ext3 = filename.substr(filename.length - 4);
// var file_ext4 = filename.substr(filename.length - 5);
var uri = 'mongodb://localhost/cis550project';

var id = 1;

var inv_query = {};
var fwd_query = [];
var insert_flag;
var findID = function(db, callback) {
	//var id_str = id.toString();

	//var query = {};
	//query[id]={$exists:true};
	var cursor = db.collection('testCollection').find({}, {_id:0});
	cursor.each(function(err, doc) {	// doc is object type
		assert.equal(err, null);
		if (doc != null) {
			//json = doc[id];

			//json2 = json[name];
			//console.log(json);
			// json3 = json2[3];
			// json4 = json3["c"];
			//console.log(Object.values(doc2));
			//console.log(json2[2]);
			/////////var arr = Object.keys(doc[id]);
			/////////var filename = arr[0];
			//console.log(filename);
			// MONGO INSERT FILENAME WITH ID
			
			////////inv_query[filename]=[id];
			
			//db.collection('InvertedIndex').insert(query);
			//console.log(insert_flag);
			if (insert_flag == 1 ) {
				var arr = Object.keys(doc[id]);
				var filename = arr[0];
				inv_query[filename]=[id];
				//console.log(inv_query);
				inv_insert(doc);
			} else {
				fwd_insert(doc);
			}
			

			//console.log("id : " + id);
			//console.log(">>>>>>> IN FWD_INSERT <<<<<<<");
			id++;
		} else {
			//console.log(">>>>>>>>>>CALLBACK!!!");
			if (insert_flag == 1) {
				id = 1;
				insert_flag = 0;
			} else {
				insert_flag = 1;
			}
			callback();
		}
	});

};

function typeOf (obj) {
  	return {}.toString.call(obj).split(' ')[1].slice(0, -1).toLowerCase();
}
var prev_key;
var new_key;
function fwd_insert(doc) {

	var keys = Object.keys(doc);
	//console.log("keys: " + keys);
	for (var i = 0; i<keys.length; i++) {	// for each key
		if (keys[0] != 0) {
			var values = doc[keys[i]];
			//console.log("values: " + values);
			if (!isNaN(keys[i])) {
				var fwd = {};
				if (keys.length == 1) {
					if (prev_key == undefined) {
						prev_key = keys[i];
					} else {
						new_key = keys[i];
						//console.log(keys[i]);
						fwd["source"]=prev_key;
						fwd["destination"]=new_key;
						//console.log(fwd);
						fwd_query.push(fwd);
						prev_key = new_key;
					}
					//prev_key=keys[i];

				} else if (keys.length > 1 && i == keys.length-1) {
					new_key = keys[i];
					//console.log(prev_key + " : " + new_key);
					fwd["source"]=prev_key;
					fwd["destination"]=new_key;
					fwd_query.push(fwd);
					//console.log(fwd_query);
					prev_key = new_key;
				} else {
					//console.log(prev_key + " : " + keys[i]);
					fwd["source"]=prev_key;
					fwd["destination"]=keys[i];
					fwd_query.push(fwd);

					//console.log(fwd_query);
				}
				
				//console.log(keys[i]);
			}

			fwd_insert(values);

		}
	}
}

function inv_insert(doc) {
	var keys = Object.keys(doc);
	//console.log(keys);
/*	var max = Math.max(...keys);
	if (id <= max) {
		id = max;
	}*/
	for (var i = 0; i<keys.length; i++) {
		if (keys[0] != 0) {
			if (id < keys[i]) {
				id++;
			}
			//console.log(typeOf(keys[i]));
			var values = doc[keys[i]];
			if (values.length > 1 && typeOf(values) == "array") {
				for (var j = 0; j < values.length; j++) {
					if (inv_query[values[j]] != undefined && inv_query[values[j]].length > 0) {
						inv_query[values[j]].push(id);
					} else {
						inv_query[values[j]] = [id];
					}
					
					//console.log("inserted " + values[j] + " : " + id);
				}
			} else {
				if (values.length == 1 || (values.length > 1 && typeOf(values) == "string")) {
					if (inv_query[values] != undefined && inv_query[values].length > 0) {
						inv_query[values].push(id);
					} else {
						inv_query[values] = [id];
					}
					//console.log("inserted1 " + values + " : " + id);
				}
			}
			//console.log(doc[keys[i]]);
			inv_insert(doc[keys[i]]);

		}
		

	}
}




MongoClient.connect(uri, function(err, db) {
	assert.equal(null, err);
	var inv_index = [];
	insert_flag = 1;
	findID(db, function() {
		for (var word in inv_query) {
			var inv_map = {};
			inv_map[word]=inv_query[word];
			inv_index.push(inv_map);
		}
		//console.log(">>>>>>>>>>> END ");
		//console.log(inv_index);
		// CLOSES BEFORE FORWARD INDEX CAN HAPPEN.
		console.log(inv_query);
		db.collection('InvertedIndex').insert(inv_index, function() {
			console.log("in InvertedIndex");
		});
		// console.log("inserted InvertedIndex");

		//console.log(">>>>>>>>>>> END ");
		//console.log(fwd_query);
		/*db.collection('ForwardIndex').insert(fwd_query, function() {
			console.log("in ForwardIndex");
			
		});*/
		// console.log("inserted ForwardIndex");

		//insertDocument(db, query);


		db.close();
		//console.log(">>>>>>CLOSED!!!");
	});

	/*insertDocument(db, function() {
		db.close();
	});*/
});

// to insert into forward index
MongoClient.connect(uri, function(err, db) {
	console.log("reconnected");
	//insert_flag = 0;
	assert.equal(null, err);
	findID(db, function() {
		console.log(fwd_query);
		db.collection('ForwardIndex').insert(fwd_query, function() {
			console.log("inserted ForwardIndex");
		});
		db.close();
	});
});