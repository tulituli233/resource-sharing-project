const db = require('../db/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
exports.getorderlist = (req, res) => {
    const orderInfo = req.query;
    const sqlStr = 'select * from order where BuyerId=?';
    db.query(sqlStr, orderInfo.BuyerId, (err, results) => {
        if (err) {
            return res.cc(err);
        }
        if (results.length !== 1) return res.cc('没有数据', 301);
        res.cc('我的订单查找成功！', 200, { MyOrder: results,total:results.length })
    })
}

exports.addorder = (req, res) => {
    const order = req.body;
    order.ReTime = order.CreateTime;
    console.log(order);
    const sqladd = 'insert into order set ?';
    db.query(sqladd, order, (err, results) => {
        if (err) {
            return res.cc(err);
        }
        if (results.affectedRows !== 1) {
            return res.cc('购买失败!', 301);
        }
        res.cc('购买成功!', 200);
    })
}

exports.mycomment = (req, res) => {
    const comment = req.query;
    // console.log(comment);
    let sqlSelectO = 'select * from comment where FromId=? and CommentType!=2';
    db.query(sqlSelectO, [comment.UserId], (err, results) => {
        if (err) return res.cc(err);
        if (results.length !== 1) return res.cc('没有数据', 301);
        res.cc('我的评论查找成功！', 200, { MyComment: results,total:results.length })
    })
}

exports.deleteC = (req, res) => {
    const comment = req.query;
    let sqlDel = 'update comment set CommentType=2 where CommentId=? and FromId=?';
    db.query(sqlDel, [comment.CommentId,comment.UserId], (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc('评论删除失败！', 301);
        res.cc('评论删除成功！', 200)
    })
}