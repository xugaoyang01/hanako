var express = require('express');
var router = express.Router();

var crypto = require('crypto');
var User = require('../models/user.js');

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('login', { 
    title: '登录',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString() });
});

router.post('/', function(req, res) {
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('hex');

  User.get(req.body.name, function(err, user) {
  	if(!user) {
  		req.flash('error', '用户不存在!');
  		return res.redirect('/login');
  	}

  	if(user.password != password) {
  		req.flash('error', '密码错误!');
  		return res.redirect('/login');
  	}

  	req.session.user = user;
  	req.flash('success', '登录成功!');
  	res.redirect('/');
  });
});

module.exports = router;
