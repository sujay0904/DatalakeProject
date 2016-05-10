/**
 * http://usejsdoc.org/
 */

//req.body.
// multer node_module
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

function login(req,res,name,password){
	pool.getConnection(function(err,connection){
		if(err){
			connection.release();
			res.json({"code" : 100, "status" : "Error in connection database"});
		    return;
		}else{
			console.log("connection ok");
			connection.query("SELECT * FROM UserInfo WHERE username='"+name+"'",function(error,results,fields){
		        
				if(err){
					connection.release();
					res.render('error.ejs', {message: 'Unable to query database at this time'});
					return;
				}
				if(results.length==0){//check if the user exists
					connection.release();
					console.log('Unregistered User,Please sign up!');
					res.render('login.ejs',{message:'username does not exist'});
					return;
				}else{//check if the password is correct
				    if(password==results[0].password){
//				    	req.session.user = name;
				    	connection.release();
				    	render(res,name);
				    	return;
				    }else{
				    	connection.release();
				    	res.render('login.ejs',{message:'wrong password'});
				    	return;
				    }
				}
			});
		}
	});
}

function render(res,name) {
	res.render('searchPage.ejs',{name:name,message:null});
}


exports.do_work = function(req, res){
	if (Object.keys(req).length == 0) {
		render(res,"User");
	} else {
		login(req,res, req.body.username, req.body.password);
	}
	
}