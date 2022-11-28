const express=require('express');
const res = require('express/lib/response');
const router=express.Router();
const chatHander=require('../router_handler/chat');
const expressJoi=require('@escook/express-joi');
// const {reg_login_schema}=require('../schema/user');

// router.get('/reguser',expressJoi(reg_login_schema),userHander.regUser);

router.post('/sendmsg',chatHander.sendmsg);

router.post('/login',chatHander.login);

module.exports=router;