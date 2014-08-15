var express = require('express');
var router = express.Router();
var fs = require('fs');
var formidable = require('formidable'),
    http = require('http'),
    util = require('util');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('upload', { 
    title: '文件上传',
  	user: req.session.user,
  	success: req.flash('success').toString(),
  	error: req.flash('error').toString()
  });
});

router.post('/', function(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
      for(var i in files) {
        if(files[i].size == 0) {
          fs.unlinkSync(files[i].path);
        } else {
          var target_path = './public/images/' + files[i].name;
          fs.renameSync(files[i].path, target_path);
        }
      }
    });
    
    req.flash('success', '文件上传成功!');
    res.redirect('/upload');
});

module.exports = router;