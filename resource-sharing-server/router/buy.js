const express=require('express');
const res = require('express/lib/response');
const router=express.Router();
const buyHander=require('../router_handler/buy');
const expressJoi=require('@escook/express-joi');
const {reg_login_schema}=require('../schema/user');

router.get('/orderlist',buyHander.getorderlist);

router.post('/add',buyHander.addorder);

// router.get('/mycomment',commentHander.mycomment);

module.exports=router;