var express = require('express');
var path = require('path');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var settings = require('./settings');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');//用于页面通知
var partials = require('express-partials');
var formidable = require('formidable');

//定义路由路径
var routes = require('./routes/index');
var login = require('./routes/login');
var reg = require('./routes/reg');
var logout = require('./routes/logout');
var post = require('./routes/post');
var upload = require('./routes/upload');
var userpage = require('./routes/userpage');
var edit = require('./routes/edit');
var removearticle = require('./routes/removearticle');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(partials());
app.use(flash());//用于页面通知
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true, uploadDir:'./public/images'}));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: settings.cookieSecret,
    key: settings.db, //cookie name
    cookie: {maxArg: 1000 * 60 * 60 * 24 * 30}, //30 days
    store: new MongoStore({
        db:settings.db
    }),
    resave: true,
    saveUninitialized: true
}));

//绑定路由路径
app.use('/', routes);
app.use('/edit', edit);
app.use('/u', userpage);
app.use('/login', login);
app.use('/reg', reg);
app.use('/logout', logout);
app.use('/post', post);
app.use('/upload', upload);
app.use('/remove', removearticle);



/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
