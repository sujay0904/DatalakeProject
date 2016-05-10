var mysql = require('mysql');
var session = require('client-sessions');

var pool = mysql.createPool({
	connectionLimit : 100,
	host:'cis550.c1b8xjyzregy.us-east-1.rds.amazonaws.com',
	password:'cis550admin',
	user:'admin',
	port:'3306',
	database:'cis550',
	debug:false
	});

function insert(req,res,filename,permission){
	connection.connect(function(err){
		if(err){
			connection.release();
			res.json({"code" : 100, "status" : "Error in connection database"});
		    return;
		}else{
			    var post  = {username: req.username, filename: filename, permission:permission};
				connection.query('INSERT INTO FileInfo SET ?', post, function(err, result) {
					if(!err){
					       console.log('inserted',post);
					       res.render('searchPage.ejs',{message:'success',name:'name'});}
					 else
					       console.log(err);
				   });
				}
		    
			});
};


exports.do_work = function(req,res,filename,permission){
	insert(req,res,filename,permission);
}
