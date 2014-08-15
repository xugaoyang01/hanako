var express = require('express');
var router = express.Router();
var Post = require('../models/post.js');

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('post', { 
  	title: '发表',
  	user: req.session.user,
  	success: req.flash('success').toString(),
  	error: req.flash('error').toString()
  });
});

router.post('/', function(req, res) {
  var currentUser = req.session.user;
  var post = new Post(currentUser.name, req.body.title, req.body.post);
  post.save(function(err) {
  	if(err) {
  		req.flash('error', err);
  		return res.redirect('/');
  	}

  	req.flash('success', '发布成功!');
  	res.redirect('/');
  });
});

module.exports = router;
