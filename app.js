var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var http = require('http');
var router = express.Router();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var followRouter = require('./routes/follow');


var app = express();
var server = http.createServer(app);
var port = 3000;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
  // 设置允许跨域的域名，*代表允许任意域名跨域
  res.setHeader('Access-Control-Allow-Origin', '*');
  //允许的header类型
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  // 跨域允许的请求方式
  res.setHeader('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS');
  // 设置Content-Type
  res.setHeader('content-Type', 'application/json; charset=utf8');
  if (req.method == 'OPTIONS') res.sendStatus(200); //让options尝试请求快速结束
  else next();
});

app.use('/', indexRouter);
app.use('/follow', followRouter);
app.use('/users', usersRouter);

server.listen(port, () => {
  console.log(`The background server is running at  http://localhost:${port}`);
});
