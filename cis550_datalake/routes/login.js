
//req.body.
// multer node_module
var mysql = require('mysql');
var connection = mysql.createConnection({
host:'cis550.c1b8xjyzregy.us-east-1.rds.amazonaws.com',
password:'cis550admin',
user:'admin',
port:'3306',
database:'cis550'
});

function login(res,name,password){
	connection.connect(function(err){
		if(err){
			console.log("connection prob:"+err)
			res.render('error.ejs',{message: 'unable to connect to database at this time'});
		    return;
		}else{
			console.log("connection ok");
			connection.query("SELECT * FROM UserInfo WHERE username='"+name+"'",function(error,results,fields){
		        
				if(err){
					console.log(err);
					res.render('error.ejs', {message: 'Unable to query database at this time'});
					return;
				}
				if(results.length==0){//check if the user exists
					console.log('Unregistered User,Please sign up!');
					res.render('login.ejs',{message:'username does not exist'});
					return;
				}else{//check if the password is correct
				    if(password==results[0].password){
				    	res.render('searchPage.html');
				    	return;
				    }else{
				    	res.render('login.ejs',{message:'wrong password'});
				    	return;
				    }
				}
			});
		}
	});
}


exports.do_work = function(req, res){
	login(res, req.body.username, req.body.password);
}