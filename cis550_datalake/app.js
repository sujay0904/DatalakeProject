
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , db = require('./db.js')
  , signup=require('./routes/signup')
  , login = require('./routes/login')
  , signup_pool=require('./routes/signup_pool')
  , login_pool = require('./routes/login_pool') 
  , xmlParse = require('./routes/xmlParse')
  , jsonParse = require('./routes/jsonParse')
  , csvParse = require('./routes/csvParse')
  , http = require('http')
  , mongoose = require('mongoose')
  , mysql = require('mysql')
  , path = require('path')
  , multer = require('multer')
  , fs = require('fs')
  , insert = require('./routes/insert_table.js')
  , session = require('client-sessions');

var storage = multer.diskStorage({
	   destination: function (req, file, cb) {
		     console.log("Dest");
		     cb(null, './uploads/')
		   },
		   filename: function (req, file, cb) {
		     cb(null, file.fieldname + '-' + Date.now())
		   }
		});
var upload = multer({storage :storage}).single('files');

//app start
var app = express();

init_app(app);

app.use(session({
	cookieName: 'session',
	secret: 'startmeup',
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000,
}));

var authenticate = function (req, res, next) {
	var isAuthenticated = true;
	if (req.session.name == undefined) {
		isAuthenticated = false;
	}
	if (isAuthenticated) {
		next();
	}
	else {
		res.redirect('/');
	}
}

//app.use(multer({ dest: './uploads/',
//	rename: function(fieldname, filename) {
//		return filename;
//	},
//	onFileUploadStart: function() {
//////		console.log("Upload is starting...");
//////	},
//////	onFileUploadComplete: function(file) {
//////		console.log("File uploaded");
//////		filepath = file.path;
//////	}));
////
app.post('/upload', function(req, res) {
////    // get the temporary location of the file
    var tmp_path = req.files.file.path;
////    console.log(tmp_path);
////    // set where the file should actually exists - in this case it is in the "images" directory
    var target_path = './public/upload/' + req.files.file.name;
////    //console.log(target_path);
////    // move the file from the temporary location to the intended location
////    fs.rename(tmp_path, target_path, function(err) {
////        if (err) throw err;
////        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
////        fs.unlink(tmp_path, function() {
////            if (err) throw err;
////            console.log('File uploaded to: ' + target_path + ' - ' + req.files.file.size + ' bytes');
////        });
////    });
////    
    var filename = target_path.replace(/^.*[\\\/]/, '').toString();
////    var file_ext3 = filename.substr(filename.length - 4);
////    var file_ext4 = filename.substr(filename.length - 5);
////    
////    if (file_ext3 == ".xml") {
////    	xmlParse.do_work(req, res, target_path);
////    } else if (file_ext4 == ".json" || file_ext4 == ".JSON") {
////    	console.log(target_path);
////    	jsonParse.do_work(req, res, target_path);
////    } else if (file_ext3 == ".csv") {
////    	csvParse.do_work(target_path);
////    }
    insert.do_work(req,res,filename,req.body.permission);

});


var authentication = function(req,res){
	
}

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
var user;
var password;

app.get('/', routes.index);
app.get('/login-2',function(req,res){
//	res.render('signup',{message:""});
	res.render('login_test.html');
});
app.get('/searchPage', routes.search);
app.get('/login',routes.login);
app.get('/signup',routes.signup);
app.post('/signup',signup_pool.signup);
app.post('/login',login_pool.do_work);
//app.post('/login',function(req, res) {
//	user = req.body.username;
//	password = req.body.password;
//	
//	login.do_work(req, res);
//});



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});




function init_app() {
	// all environments
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.engine('html',require('ejs').renderFile);
	app.set('view engine', 'html');
	app.use(express.favicon());
	
	app.use(express.logger('dev'));
	app.use(express.bodyParser({uploadDir:'./uploads'}));
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
	// development only
	if ('development' == app.get('env')) {
	  app.use(express.errorHandler());
	}
}
