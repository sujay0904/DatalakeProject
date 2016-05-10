var mysql = require('mysql');
//create the connection pool which enable max 100 connections
var pool = mysql.createPool({
	connectionLimit : 100,
	host:'cis550.c1b8xjyzregy.us-east-1.rds.amazonaws.com',
	password:'cis550admin',
	user:'admin',
	port:'3306',
	database:'cis550',
	debug:false
});

exports.connect = function(req,res){
	pool.getConnection(function(err,connection){
		if(err){
//            connection.release();
			console.log(err);
//			res.json({"code":100,"status":"Error in connection database"});
//			return;
		}
	
	console.log('connection as id'+connection.threadId);
	var post = {username:req.body.user.name,
			    email:req.body.user.email,
			    password:req.body.user.password};
	connection.query('INSERT INTO UserInfo SET ?', post, function(err, result) {
		   if(!err)
		      console.log('inserted',post);
		    else
		      res.json({"code":101,"status":"Error in inserting database"});
		      console.log(err);
		});
	});
};

exports.index = function(req, res){
//  res.render('index', { title: 'Express',user:"Yimeng" });
	res.render('login.html');
};