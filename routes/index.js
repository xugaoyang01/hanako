var express = require('express');
var router = express.Router();
var Post = require('../models/post.js');

/* GET home page. */
router.get('/', function(req, res) {

  Post.getAll(null, function(err, posts) {
  	if(err) {
  		posts = [];
  	}
    
    res.render('index', { 
  	  title: '主页',
  	  user: req.session.user,
  	  posts: posts,
  	  success: req.flash('success').toString(),
  	  error: req.flash('error').toString()
    });
  });
});

module.exports = router;
