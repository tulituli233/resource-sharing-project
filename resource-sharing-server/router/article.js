const express=require('express');
const res = require('express/lib/response');
const router=express.Router();
const articleHander=require('../router_handler/article');
const expressJoi=require('@escook/express-joi');
const {reg_login_schema}=require('../schema/user');

// router.get('/reguser',expressJoi(reg_login_schema),userHander.regUser);

router.post('/add',articleHander.add);

router.post('/alist',articleHander.alist);

router.get('/geta',articleHander.geta);

router.get('/delete',articleHander.delete);

router.post('/updata',articleHander.updata);

router.get('/getmyshare',articleHander.getMyShare);

router.post('/getfalist',articleHander.getFAList);

router.get('/RecommendList',articleHander.RecommendList);

router.get('/IndexData',articleHander.IndexData);


//
const multer  = require('multer')
const path = require("path");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    // 上传的文件目录（文件上传以后放在哪里）
        cb(null, './uploads/avatar')   
    },
    filename: function (req, file, cb) {
        //上传的文件名字 （文件名+‘-’+时间戳+源文件的后缀名【例如：jpg/png......】）
        // 可以使用图片原来的名称，但是如果名称重复了，会被覆盖
        cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname)) 
    }
})
const upload = multer({ storage: storage })

// let multer = require('multer')
// 配置静态文件夹，图片存放
// const upload = multer({dest: './uploads/avatar'})
router.post('/setAvatar',upload.single('file'),articleHander.setAvatar);

module.exports=router;