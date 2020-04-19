var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var productRouter = require('./routes/product');
var imagesRouter = require('./routes/images');
var levelRouter = require('./routes/level');
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//设置跨域访问（设置在所有的请求前面即可）
app.all("*", function(req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname));
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const tokenObj = require('./util/jwt.js');
let myToken = new tokenObj();
// 验证token
app.use('/tank', function(req, res, next) {
    next();
});
app.use('/tank', indexRouter);
app.use('/tank/users', usersRouter);
app.use('/tank/login', loginRouter);
app.use('/tank/product', productRouter);
app.use('/tank/images', imagesRouter);
app.use('/tank/level', levelRouter);
app.use(function(req, res, next) {
    next(createError(404));
});
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;