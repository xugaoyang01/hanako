var express = require('express');
var router = express.Router();
var Post = require('../models/post.js');
var User = require('../models/user.js');
var Comment = require('../models/comment.js');

/* GET home page. */
router.get('/:name', function(req, res) {

  User.get(req.params.name, function(err, user) {
    if(!user) {
      req.flash('error', '用户不存在!');
      return res.redirect('/');
    }

    Post.getAll(user.name, function(err, posts) {
      if(err) {
        req.flash('error', err);
        return res.redirect('/');
      }

      res.render('userpage', { 
        title: user.name,
        user: req.session.user,
        posts: posts,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
      });
    }); 
  });
});

router.get('/:name/:day/:title', function(req, res) {

  Post.getOne(req.params.name, req.params.day, req.params.title, function(err, post) {
    if(err) {
      req.flash('error', err);
      return res.redirect('/');
    }

    res.render('article', {
        title: req.params.title,
        user: req.session.user,
        post: post,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
  });
});

router.post('/:name/:day/:title', function(req, res) {
  var date = new Date();
  var time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
             + "" + date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + 
              date.getMinutes() : date.getMinutes());
  var comment = {
    name:req.body.name,
    email: req.body.email,
    email: req.body.website,
    time: time,
    content: req.body.content
  };

  var newComment = new Comment(req.params.name, req.params.day, req.params.title, comment);
  newComment.save(function(err) {
    if(err) {
      req.flash('error', err);
      return res.redirect('back');
    }

    req.flash('success', '留言成功!');
    res.redirect('back');
  });
});

module.exports = router;