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

module.exports=router;