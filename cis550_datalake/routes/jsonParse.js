function json_parse(filepath) {
	var AWS = require('aws-sdk');
	
	var fs = require('fs');
	
	var MongoClient = require('mongodb').MongoClient;
	var assert = require('assert');
	var xml2js = require('xml2js');
	var spawn = require("child_process").spawn;
	var id = 0;
	var path = "./modularJSONPARSER.PY";

	var x;
	AWS.config.loadFromPath('./routes/cred_config.json');
	AWS.config.region = 'us-east-1';

	//var filepath = './test_file.xml';
	console.log("filepath1: " + filepath);
	var filename = filepath.replace(/^.*[\\\/]/, '').toString();
	var file_ext3 = filename.substr(filename.length - 4);
	var file_ext4 = filename.substr(filename.length - 5);
	var bucket = 'cis550project';

	var s3 = new AWS.S3();
	fs.readFile(filepath, function(err, data) {
			var bdata = new Buffer(data, 'binary');
			var params = {Bucket: bucket,
						  Key: filename, //file.name doesn't exist as a property
		            	  Body: bdata};
			s3.upload(params, function (err, data) {
				if (err) {
					console.log('ERROR MSG: ', err);
				} else {
					console.log('Successfully uploaded data');
				}
			});
		});
	console.log("filepath2 " + filepath);
	var process = spawn('python',[path, filepath, id]);
	process.stdout.on('data', function (x){
	console.log("I am here");
	console.log(x.toString());
	// Do something with the data returned from python script
	});
	console.log("before insert_mongo");
	//insert_mongo();
}

function insert_mongo() {
	console.log("in insert_mongo");
	var fs = require('fs');
	var MongoClient = require('mongodb').MongoClient;
	var assert = require('assert');

	var filepath = './routes/new.json';
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

	var uri = 'mongodb://localhost/cis550';
	MongoClient.connect(uri, function(err, db) {
		assert.equal(null, err);
		insertDocument(db, function() {
			db.close();
		});
	});
	
	inv_index();
}

function inv_index() {
	var fs = require('fs');
	var MongoClient = require('mongodb').MongoClient;
	var assert = require('assert');

	var uri = 'mongodb://localhost/cis550';

	var id = 1;

	var inv_query = {};
	var fwd_query = [];
	var nodes_ids = [];
	var words = ["True", "False", "a", "about", "above", "above", "across", "after", "afterwards", "again", "against", "all", "almost", "alone", "along", "already", "also","although","always","am","among", "amongst", "amoungst", "amount",  "an", "and", "another", "any","anyhow","anyone","anything","anyway", "anywhere", "are", "around", "as",  "at", "back","be","became", "because","become","becomes", "becoming", "been", "before", "beforehand", "behind", "being", "below", "beside", "besides", "between", "beyond", "bill", "both", "bottom","but", "by", "call", "can", "cannot", "cant", "co", "con", "could", "couldnt", "cry", "de", "describe", "detail", "do", "done", "down", "due", "during", "each", "eg", "eight", "either", "eleven","else", "elsewhere", "empty", "enough", "etc", "even", "ever", "every", "everyone", "everything", "everywhere", "except", "few", "fifteen", "fify", "fill", "find", "fire", "first", "five", "for", "former", "formerly", "forty", "found", "four", "from", "front", "full", "further", "get", "give", "go", "had", "has", "hasnt", "have", "he", "hence", "her", "here", "hereafter", "hereby", "herein", "hereupon", "hers", "herself", "him", "himself", "his", "how", "however", "hundred", "ie", "if", "in", "inc", "indeed", "interest", "into", "is", "it", "its", "itself", "keep", "last", "latter", "latterly", "least", "less", "ltd", "made", "many", "may", "me", "meanwhile", "might", "mill", "mine", "more", "moreover", "most", "mostly", "move", "much", "must", "my", "myself", "name", "namely", "neither", "never", "nevertheless", "next", "nine", "no", "nobody", "none", "noone", "nor", "not", "nothing", "now", "nowhere", "of", "off", "often", "on", "once", "one", "only", "onto", "or", "other", "others", "otherwise", "our", "ours", "ourselves", "out", "over", "own","part", "per", "perhaps", "please", "put", "rather", "re", "same", "see", "seem", "seemed", "seeming", "seems", "serious", "several", "she", "should", "show", "side", "since", "sincere", "six", "sixty", "so", "some", "somehow", "someone", "something", "sometime", "sometimes", "somewhere", "still", "such", "system", "take", "ten", "than", "that", "the", "their", "them", "themselves", "then", "thence", "there", "thereafter", "thereby", "therefore", "therein", "thereupon", "these", "they", "thickv", "thin", "third", "this", "those", "though", "three", "through", "throughout", "thru", "thus", "to", "together", "too", "top", "toward", "towards", "twelve", "twenty", "two", "un", "under", "until", "up", "upon", "us", "very", "via", "was", "we", "well", "were", "what", "whatever", "when", "whence", "whenever", "where", "whereafter", "whereas", "whereby", "wherein", "whereupon", "wherever", "whether", "which", "while", "whither", "who", "whoever", "whole", "whom", "whose", "why", "will", "with", "within", "without", "would", "yet", "you", "your", "yours", "yourself", "yourselves", "the"];
	var stop_words = new Set();
	for (var i = 0; i < words.length; i++) {
		stop_words.add(words[i]);
	}
	var insert_flag;

	var removeInv = function(db, callback) {
		db.collection('InvertedIndex').deleteMany({}, function(err, results) {
			//console.log(results);
			callback();
		});
	}

	var findID = function(db, callback) {
		//var id_str = id.toString();

		//var query = {};
		//query[id]={$exists:true};
		var cursor = db.collection('testCollection').find({}, {_id:0});
		cursor.each(function(err, doc) {	// doc is object type
			assert.equal(err, null);
			console.log(doc)
			if (doc != null) {
				
				if (insert_flag == 1 ) {
					var arr = Object.keys(doc[id]);
					var filename = arr[0];
					inv_query[filename]=[id];
					//console.log(inv_query);
					inv_insert(doc);
				} else {
					fwd_insert(doc, db);
				}
				

				//console.log("id : " + id);
				//console.log(">>>>>>> IN FWD_INSERT <<<<<<<");
				id++;
			} else {
				//console.log(">>>>>>>>>>CALLBACK!!!");
				if (insert_flag == 1) {
					//id = 1;
					insert_flag = 0;
				} else {
					id = 1;
					insert_flag = 1;
				}
				console.log("insert_flag: " + insert_flag);
				callback();
			}
		});

	};

	function typeOf (obj) {
	  	return {}.toString.call(obj).split(' ')[1].slice(0, -1).toLowerCase();
	}
	var prev_key;
	var new_key;
	var root;
	var children;
	var parent;
	var parent_nodes = [];
	var next_keys;
	var next_next_keys;

	function fwd_insert(doc, db) {

		var keys = Object.keys(doc);
		
		
		if (keys[0] != 0) {
			//if (!isNaN(keys[0])) {
				//console.log("all keys: " + keys);
				//children = keys;
				


			for (var i = 0; i < keys.length; i++) {
				var values = doc[keys[i]];
				//console.log("all keys: " + keys[i]);

				if (!isNaN(keys[i])) {
					var fwd = {};
					var nodes = {};
					//console.log(">>>>>>>>>>> id: " + keys[i]);
					nodes["node_id"]=keys[i];
					nodes_ids.push(nodes);
					if (keys.length == 1) {
						if (root == undefined) {
							root = keys[i];
							//fwd["parent"]="NULL";
							parent_nodes.push(root);
							var root_value = Object.keys(values);
							children = Object.keys(values[root_value]);
							// console.log("root: " + root);
							// console.log("parent: NULL");
							// console.log("children: " + children);
							//fwd["root"]=root;
							fwd["parent"]=null;
							fwd["children"]=children;
							fwd_query.push(fwd);
							db.collection('node').update(nodes, {$set: fwd}, function (err) {
								if (err) {
									console.log("fwd_insert error: " + err);
								} else {
									//console.log("inserted5 node");
								}
							});
						} else {
							next_keys = Object.keys(values);
							next_next_keys = Object.keys(values[next_keys]);
							//console.log("index " + i + ": " + next_next_keys);
							//console.log("length: " + next_next_keys.length);
						
							if (next_next_keys.length >= 0) {
								//parent = keys[i];
								//console.log(next_next_keys.length);
								if (!isNaN(next_next_keys[0]) && next_next_keys[0] != 0) {
									//parent = keys[i];
									parent = parent_nodes[parent_nodes.length-1];
									children = next_next_keys;
									// console.log("root: " + root);
									// console.log("parent: " + parent);
									// console.log("children: " + children);
									//fwd["root"]=root;
									fwd["parent"]=parent;
									fwd["children"]=children;
									fwd_query.push(fwd);
									db.collection('node').update(nodes, {$set: fwd}, function (err) {
										if (err) {
											console.log("fwd_insert error: " + err);
										} else {
											//console.log("inserted5 node");
										}
									});
									parent_nodes.push(keys[i]);
									
								} else {	// it is a leaf
								//parent = keys[i];
									if (i == keys.length-1) {
										parent = parent_nodes[parent_nodes.length-1];
										// console.log("root: " + root);
										// console.log("parent: " + parent);
										// console.log("children: NULL");
										//fwd["root"]=root;
										fwd["parent"]=parent;
										fwd["children"]=null;
										fwd_query.push(fwd);
										db.collection('node').update(nodes, {$set: fwd}, function (err) {
											if (err) {
												console.log("fwd_insert error: " + err);
											} else {
												//console.log("inserted5 node");
											}
										});
										parent_nodes.pop(parent_nodes[parent_nodes.length-1]);
									} else {
										parent = parent_nodes[parent_nodes.length-1];
										// console.log("root: " + root);
										// console.log("parent: " + parent);
										// console.log("children: NULL");
										//fwd["root"]=root;
										fwd["parent"]=parent;
										fwd["children"]=null;
										fwd_query.push(fwd);
										db.collection('node').update(nodes, {$set: fwd}, function (err) {
											if (err) {
												console.log("fwd_insert error: " + err);
											} else {
												//console.log("inserted5 node");
											}
										});
									}
									
								}
								//console.log(values);
							}
						}

						//console.log("all keys in for loop: " + keys);
						//console.log("key: " + keys[i]);
					} else {
						//console.log("keys.length > 1");
						//console.log("key: " + keys[i]);
						//parent = keys[i];
						
						next_keys = Object.keys(values);
						next_next_keys = Object.keys(values[next_keys]);
						//console.log("index " + i + ": " + next_next_keys);
						//console.log("length: " + next_next_keys.length);
						
						if (next_next_keys.length >= 0) {
							//parent = keys[i];
							//console.log(next_next_keys.length);
							if (!isNaN(next_next_keys[0]) && next_next_keys[0] != 0) {
								//parent = keys[i];
								parent = parent_nodes[parent_nodes.length-1];
								children = next_next_keys;
								// console.log("root: " + root);
								// console.log("parent: " + parent);
								// console.log("children: " + children);
								//fwd["root"]=root;
								fwd["parent"]=parent;
								fwd["children"]=children;

								fwd_query.push(fwd);
								db.collection('node').update(nodes, {$set: fwd}, function (err) {
									if (err) {
										console.log("fwd_insert error: " + err);
									} else {
										//console.log("inserted5 node");
									}
								});
								parent_nodes.push(keys[i]);
								
							} else {	// it is a leaf
							//parent = keys[i];
								if (i == keys.length-1) {
									parent = parent_nodes[parent_nodes.length-1];
									// console.log("root: " + root);
									// console.log("parent: " + parent);
									// console.log("children: NULL");
									//fwd["root"]=root;
									fwd["parent"]=parent;
									fwd["children"]=null;
									fwd_query.push(fwd);
									db.collection('node').update(nodes, {$set: fwd}, function (err) {
										if (err) {
											console.log("fwd_insert error: " + err);
										} else {
											//console.log("inserted5 node");
										}
									});
									parent_nodes.pop(parent_nodes[parent_nodes.length-1]);
								} else {
									parent = parent_nodes[parent_nodes.length-1];
									// console.log("root: " + root);
									// console.log("parent: " + parent);
									// console.log("children: NULL");
									//fwd["root"]=root;
									fwd["parent"]=parent;
									fwd["children"]=null;
									fwd_query.push(fwd);
									db.collection('node').update(nodes, {$set: fwd}, function (err) {
										if (err) {
											console.log("fwd_insert error: " + err);
										} else {
											//console.log("inserted5 node");
										}
									});
								}
								
							}
							//console.log(values);
						}
						

					}

				}

				//console.log(keys_values);
				fwd_insert(values,db);

				
			}


		}
	}


	function inv_insert(doc) {
		var keys = Object.keys(doc);
		//console.log(keys);

		for (var i = 0; i<keys.length; i++) {
			if (keys[0] != 0) {
				if (id < keys[i]) {
					id++;
				}
				//console.log(typeOf(keys[i]));
				var values = doc[keys[i]];
				if (values.length > 1 && typeOf(values) == "array") {
					for (var j = 0; j < values.length; j++) {
						if (typeOf(values[j]) == "string") {
							var new_values = values[j].split(" ");
							for (var k = 0; k < new_values.length; k++) {
								if (isNaN(new_values[k]) && !stop_words.has(new_values[k].toString())) {
									if (inv_query[new_values[k]] != undefined && inv_query[new_values[k]].length > 0) {
										inv_query[new_values[k].toString()].push(id);
									} else {
										inv_query[new_values[k].toString()] = [id];
									}
								}
							}
							
						} else {
							if (isNaN(values[j]) && !stop_words.has(values[j].toString())) {
								if (inv_query[values[j]] != undefined && inv_query[values[j]].length > 0) {
									inv_query[values[j].toString()].push(id);
								} else {
									inv_query[values[j].toString()] = [id];
								}
							}
						}
						
						
						console.log("inserted " + values[j] + " : " + id);
					}
				} else {
					if (values.length == 1 || (values.length > 1 && typeOf(values) == "string")) {
						if (typeOf(values) == "string") {
							var new_values = values.split(" ");
							for (var j = 0; j < new_values.length; j++) {
								// console.log(new_values[j].toString());
								if (isNaN(new_values[j]) && !stop_words.has(new_values[j].toString())) {
									if (inv_query[new_values[j]] != undefined && inv_query[new_values[j]].length > 0) {
										inv_query[new_values[j].toString()].push(id);
									} else {
										inv_query[new_values[j].toString()] = [id];
									}
									console.log("inserted2 " + new_values[j] + " : " + id);
								}
							}
						} else {
							if (isNaN(values) && !stop_words.has(values.toString())) {
								if (inv_query[values] != undefined && inv_query[values].length > 0) {
									inv_query[values.toString()].push(id);
								} else {
									inv_query[values.toString()] = [id];
								}
								console.log("inserted1 " + values + " : " + id);
							}
						}

						
						
						
					}
				}
				//console.log(doc[keys[i]]);
				inv_insert(doc[keys[i]]);

			}
			

		}
	}

	MongoClient.connect(uri, function(err, db) {
		assert.equal(null, err);
		removeInv(db, function() {

		});
	});

	// to insert into forward index
	MongoClient.connect(uri, function(err, db) {
		console.log("reconnected");
		insert_flag = 0;
		assert.equal(null, err);
		findID(db);
	});


	MongoClient.connect(uri, function(err, db) {
		assert.equal(null, err);
		var inv_index = [];
		//insert_flag = 1;
		findID(db, function() {
			for (var word in inv_query) {
				var inv_map = {};
				inv_map[word]=inv_query[word];
				inv_index.push(inv_map);
			}
			
			console.log(inv_query);
			
			console.log(inv_index);
			db.collection('InvertedIndex').insert(inv_index, function(err) {
				if (err) {
					console.log("inverted index error: " + err);
				} else {
					console.log(" in InvertedIndex");
				}
				
			});
		});

	});

}

exports.do_work = function(req, res, filepath) {
	console.log("filepath "+ filepath);
	json_parse(filepath);
}