const db = require('../db/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { wss, clients } = require('../wss.js')
exports.sendmsg = (req, res) => {
    //前端传过来的数据
    // console.log('1', 1);
    let { Pimg, Dimg, FromId, ToId, yuyin, face, content, imgs, CreateTime } = req.body
    const datalist = {
        Pimg, Dimg, FromId, ToId, yuyin, face, content, imgs, CreateTime
    }
    console.log(content);
    let chat = {
        FromId, ToId, ChatContent: content, CreateTime, ReTime: CreateTime
    }
    //发送给自己客户端的数据
    // res.send(datalist)
    //循环遍历     找到你要发送的人  他的id  就发送
    clients.forEach((client) => {
        if (ToId == client.id) {
            // console.log('3', client);
            client.send(JSON.stringify(chat));
            // console.log('3', 3);
        }
        // client.send(JSON.stringify(datalist));
    });
    // 保存消息
    const sqladd = 'insert into chat set ?';
    db.query(sqladd, chat, (err, results) => {
        if (err) {
            return res.cc(err);
        }
        if (results.affectedRows !== 1) {
            return res.cc('发送失败!', 301);
        }
        res.cc('发送成功！', 200, { chat });
    })
}

exports.getChatList = (req, res) => {
    const userinfo = req.query;
    let sqlChatList = 'select * from chatList where FromId=?';
    db.query(sqlChatList, userinfo.UserId, (err, results) => {
        if (err) return res.cc(err);
        if (results.length == 0) return res.cc('没有私聊对象！', 301);
        let ChatList = results;
        let sqlChat = 'select * from chat where FromId=? or ToId=?';
        db.query(sqlChat, [userinfo.UserId, userinfo.UserId], (err, results1) => {
            if (err) return res.cc(err);
            if (results.length == 0) return res.cc('没有私聊数据！', 301);
            // 处理数据
            results1.forEach(item => {
                ChatList.forEach(item1 => {
                    if (item.FromId == item1.ToId || item.ToId == item1.ToId) {
                        item1.msgList = item1.msgList == undefined ? [] : item1.msgList
                        item1.msgList.push(item)
                    }
                })
            })
            res.cc('私聊数据获取成功！', 200, { ChatList });
        })
    })
}

exports.addchatlist = (req, res) => {
    const chatItem = req.body;
    chatItem.ReTime = chatItem.CreateTime;
    console.log(chatItem);
    const sqlStr = 'select * from chatlist where FromId=? and ToId=?';
    db.query(sqlStr, [chatItem.FromId, chatItem.ToId], (err, results) => {
        if (err) return res.cc(err);
        if (results.length == 0) {
            let sqladd = 'insert into chatlist set ?';
            db.query(sqladd, chatItem, (err, results) => {
                if (err) {
                    return res.cc(err);
                }
                if (results.affectedRows !== 1) {
                    return res.cc('聊天室1创建失败!', 301);
                }
                let chatItem2 = chatItem;
                let tempFromId = chatItem.FromId;
                chatItem2.FromId = chatItem.ToId;
                chatItem2.ToId = tempFromId;
                let sqladd2 = 'insert into chatlist set ?';
                db.query(sqladd2, chatItem2, (err, results) => {
                    if (err) {
                        return res.cc(err);
                    }
                    if (results.affectedRows !== 1) {
                        return res.cc('聊天室2创建失败!', 301);
                    }
                    return res.cc('聊天室1、2创建成功!', 200);
                })
            })
        } else {
            return res.cc('聊天室已创建!', 200);
        }
    })
}