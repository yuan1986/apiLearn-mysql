var multer = require('multer');
var express = require('express');
var router = express.Router();
var User = require('../controllers/UserController');

// let upload = multer({ dest: './public/uploads/' }).single('file');
// let moreUpload = multer({ dest: './public/uploads/' }).array('file', 100);

var storage = multer.diskStorage({
  // 上传文件的目录
  destination: function (req, file, cb) {
    cb(null, './public/uploads');
  },
  // 上传文件的名称
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({
  storage,
  dest: './public/uploads/',
}).single('file');

var moreUpload = multer({ storage, dest: './public/uploads/' }).array(
  'file',
  100
);

router.post('/sendCode', User.sendCode);
router.post('/codePhoneLogin', User.codePhoneLogin);
router.post('/login', User.login);
router.post('/editUserInfo', User.editUserInfo);
router.post('/setPassword', User.setPassword);
router.post('/bindEmail', User.bindEmail);
router.post('/logout', User.logout);
router.post('/uploadImg', upload, User.uploadImg);
router.post('/uploadMoreImg', moreUpload, User.uploadMoreImg);
router.post('/publish', User.publish);

module.exports = router;
