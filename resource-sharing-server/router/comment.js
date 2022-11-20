const express=require('express');
const res = require('express/lib/response');
const router=express.Router();
const commentHander=require('../router_handler/comment');
const expressJoi=require('@escook/express-joi');
const {reg_login_schema}=require('../schema/user');

router.get('/list',commentHander.getlist);

router.post('/add',commentHander.addComment);

router.get('/mycomment',commentHander.mycomment);

module.exports=router;