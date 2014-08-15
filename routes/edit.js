var express = require('express');
var router = express.Router();
var Post = require('../models/post.js');
var User = require('../models/user.js');

router.get('/:name/:day/:title', function(req, res) {

  var currentUser = req.session.user;
  Post.edit(currentUser.name, req.params.day, req.params.title, function(err, post) {
    if(err) {
      req.flash('error', err);
      return res.redirect('back');
    }

    res.render('edit', {
        title: '编辑',
        user: req.session.user,
        post: post,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
  });
});

router.post('/:name/:day/:title', function(req, res) {
  var currentUser = req.session.user;
  Post.update(currentUser.name, req.params.day, req.params.title, req.body.post, function(err, post) {
    
    var url = '/u/' + req.params.name + '/' + req.params.day + '/' + req.params.title;
    console.log(url);
    if(err) {
      req.flash('error', err);
      return res.redirect(url);
    }

    res.redirect(url);
  });
});


module.exports = router;