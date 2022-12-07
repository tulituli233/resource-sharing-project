const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const chatHander = require('../router_handler/chat');
const expressJoi = require('@escook/express-joi');
// const {reg_login_schema}=require('../schema/user');

// router.get('/reguser',expressJoi(reg_login_schema),userHander.regUser);

router.post('/sendmsg', chatHander.sendmsg);

router.get('/chatList', chatHander.getChatList);

router.post('/addchatlist', chatHander.addchatlist);

router.get('/UpChat', chatHander.UpChat);

router.get('/replyList', chatHander.replyList);

router.get('/LikesList', chatHander.LikesList);

router.get('/SellList', chatHander.SellList);

module.exports = router;