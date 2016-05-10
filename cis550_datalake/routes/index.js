
/*
 * GET home page.
 */
//var db = require('../db.js');

exports.index = function(req, res){
//  res.render('index', { title: 'Express',user:"Yimeng" });
	res.render('login',{message:null});
};
exports.search = function(req, res){
	res.render('searchPage',{name:null,message:null});
};
exports.login = function(req,res){
	res.render('login',{message:null});
};
exports.signup = function(req,res){
	res.render('signup',{message:null});
};
