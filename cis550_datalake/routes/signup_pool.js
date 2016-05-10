var mysql = require('mysql');
var pool = mysql.createPool({
connectionLimit : 100,
host:'cis550.c1b8xjyzregy.us-east-1.rds.amazonaws.com',
password:'cis550admin',
user:'admin',
port:'3306',
database:'cis550',
debug:false
});

//var main = function(){
function signup(res,name,email,password){

		 console.log("adduser");
		 pool.getConnection(function(err,connection){
			// Case there is an error during the connection
			if(err){
				connection.release();
				res.json({"code" : 100, "status" : "Error in connection database"});
			    return;
			} else{
				console.log("Connection ok"); 
				// Check if user has already exists
				connection.query("SELECT * FROM UserInfo WHERE username = '"+name+"' ORDER BY username", function (error, results) {
					if(error){
						connection.release();
						console.log(error);
						return;
					}
					if(results.length != 0){
						connection.release();
						console.log('exist user');
						res.render('signup.ejs',{message:'user already exists'});
						return;
					}else{
						//insert user to UserInfo
						var post = {username: name,
							    email:email,
							    password:password};
						connection.query('INSERT INTO UserInfo SET ?', post, function(err, result) {
							   if(!err){
		
							      res.render('login.ejs',{message:'welcome'});
							      return;
							   }
							   else{
								   connection.release();
								   console.log("Unable to query database");
								   res.json({"code" : 100, "status" : "Error in query database"});
								   return;
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