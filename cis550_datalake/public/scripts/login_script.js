var mysql = require('mysql');
var connection = mysql.createConnection({
host:'cis550.c1b8xjyzregy.us-east-1.rds.amazonaws.com',
password:'cis550admin',
user:'admin',
port:'3306',
database:'cis550'
});

var main = function(){
	
	var addUser = function() {

		 alert("hi");
		 console.log("adduser");
		   connection.connect(function(err){
			// Case there is an error during the connection
			if(err){
				alert("Cannot access RDS Mysql database!");
			    console.log("Connection problem : " + err);
			} else{
				console.log("Connection ok"); 
				// Check if user has already exists
				var userid = $("#usernamesignup").val();
				connection.query("SELECT * FROM UserInfo WHERE username = '"+userid+"' ORDER BY username", function (error, results, fields) {
					if(error){
						console.log(error);
					}
					if(results.length > 0){
						console.log('exist user');
						alert("User has already exist, Please login!");
					}else{
						//insert user to UserInfo
						var post = {username: $("#usernamesignup").val(),
							    email:$("#emailsignup").val(),
							    password:$("#passwordsignup").val()};
						connection.query('INSERT INTO UserInfo SET ?', post, function(err, result) {
							   if(!err){
							      console.log('inserted',post);
							      alert("Welcome! " + $("#usernamesignup").val()+"\n"+"please login");
							   }
							   else{
								   console.log(err);
								   alert("Insert Not successful!");
							   }
							      
					    });
					}
				});
				 
			} 
			});
		 
	};
	$("#signUpbutton").on("click",function(event){
		addUser();
	});
};

$(document).ready(main);