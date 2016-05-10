var mysql = require('mysql');
var connection = mysql.createConnection({
host:'cis550.c1b8xjyzregy.us-east-1.rds.amazonaws.com',
password:'cis550admin',
user:'admin',
port:'3306',
database:'cis550'
});

//var main = function(){
function signup(res,name,email,password){

		 console.log("adduser");
		 connection.connect(function(err){
			// Case there is an error during the connection
			if(err){
			    console.log("Connection problem : " + err);
			    res.render('error.ejs',{message: 'unable to connect to database at this time'});
//			    return;
			} else{
				console.log("Connection ok"); 
				// Check if user has already exists
				connection.query("SELECT * FROM UserInfo WHERE username = '"+name+"' ORDER BY username", function (error, results, fields) {
					if(error){
						console.log(error);
					}
					if(results.length != 0){
						console.log('exist user');
						res.render('signup.ejs',{message:'user already exists'});
//						return;
					}else{
						//insert user to UserInfo
						var post = {username: name,
							    email:email,
							    password:password};
						connection.query('INSERT INTO UserInfo SET ?', post, function(err, result) {
							   if(!err){
							      console.log('inserted',post);
							      res.render('login.ejs',{message:null});
//							      return;
							   }
							   else{
								   console.log("Unable to query database");
								   res.render('error.ejs',{message:'Unable to query database at this time'});
//								   return
							   }
							      
					    });
					}
				}); 
			} 
			});
		 
	};


exports.signup = function(req,res){
	signup(res,req.body.username,req.body.useremail,req.body.userpassword);
}