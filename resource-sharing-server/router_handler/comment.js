const db = require('../db/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
exports.getlist = (req, res) => {
    const commentInfo = req.query;
    const sqlStr = 'select * from comment where ArticleId=? and CommentType!=2';
    db.query(sqlStr, commentInfo.ArticleId, (err, results) => {
        if (err) {
            return res.cc(err);
        }
        let clist = [];
        let clist1 = [];
        let total = results.length;
        results.forEach(item => {
            if (item.CommentType == 0) {
                clist.push(item)
            } else {
                clist1.push(item)
            }
        })
        clist1.forEach(item => {
            try {
                clist.forEach((item1, i) => {//将回复插入评论
                    if (item.OnId == item1.CommentId) {
                        clist[i].clist = clist[i].clist == undefined ? [] : clist[i].clist
                        clist[i].clist.push(item);
                        throw new Error("zcTiao")//跳出循环
                    }
                })
            } catch (e) {
                if (e.message != "zcTiao") throw e
            }
        })
        res.cc('评论获取成功！', 200, { clist, total });
    })
}

exports.addComment = (req, res) => {
    const comment = req.body;
    comment.ReTime = comment.CreateTime;
    console.log(comment);
    const sqladd = 'insert into comment set ?';
    db.query(sqladd, comment, (err, results) => {
        if (err) {
            return res.cc(err);
        }
        if (results.affectedRows !== 1) {
            return res.cc('评论失败!', 301);
        }
        res.cc('评论成功!', 200);
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