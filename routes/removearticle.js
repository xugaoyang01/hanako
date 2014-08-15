var express = require('express');
var router = express.Router();
var Post = require('../models/post.js');
var User = require('../models/user.js');

router.get('/:name/:day/:title', function(req, res) {

  console.log('xxxxx');
  var currentUser = req.session.user;
  Post.remove(currentUser.name, req.params.day, req.params.title, function(err, post) {
    
    if(err) {
      req.flash('error', err);
      return res.redirect('back');
    }

    res.redirect('/');
  });
});


module.exports = router;