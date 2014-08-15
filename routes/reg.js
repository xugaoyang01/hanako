var express = require('express');
var router = express.Router();

var crypto = require('crypto');
var User = require('../models/user.js');

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('reg', { 
    title: '注册',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString() });
});

router.post('/', function(req, res) {
  var name = req.body.name;
  var password = req.body.password;
  var password_re = req.body['password-repeat'];

  if(password_re != password) {
  	req.flash('error', '两次输入的密码不一致!');
  	console.log("两次输入的密码不一致!");
  	return res.redirect('/reg');
  }

  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('hex');
  var newUser = new User({
  	name: req.body.name,
  	password: password,
  	email: req.body.email
  });

  User.get(newUser.name, function(err, user) {
  	if(user) {
  		req.flash('error', '用户已存在!');
  		return res.redirect('/reg');
  	}

  	newUser.save(function(err, user) {
  		if(err) {
  			req.flash('error', err);
  			return res.redirect('/reg');
  		}

  		req.session.user = user;
  		req.flash('success', '注册成功');
  		res.redirect('/');
  	});
  });
});


module.exports = router;
