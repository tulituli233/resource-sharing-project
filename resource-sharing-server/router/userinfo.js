const express=require('express');
const res = require('express/lib/response');
const router=express.Router();
const userinfoHander=require('../router_handler/userinfo');
const expressJoi=require('@escook/express-joi');
const {reg_login_schema}=require('../schema/user');

router.post('/follow',userinfoHander.addFollow);

router.get('/unfollow',userinfoHander.unfollow);

router.get('/followlist',userinfoHander.followlist);

router.post('/updata',userinfoHander.updata);

router.get('/footmark',userinfoHander.footmark);

router.post('/addnote',userinfoHander.addnote);

router.get('/isfollow',userinfoHander.isfollow);

router.post('/getmpd',userinfoHander.getMainPage);

module.exports=router;