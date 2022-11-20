const db = require('../db/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const cateList = [
    {
        value: "A001",
        label: "电影",
    },
    {
        value: "A002",
        label: "电视剧",
    },
    {
        value: "A003",
        label: "纪录片",
    },
    {
        value: "A004",
        label: "动漫",
    },
    {
        value: "A005",
        label: "综艺",
    },
    {
        value: "A006",
        label: "短视频",
    },
    {
        value: "B001",
        label: "国漫",
    },
    {
        value: "A002",
        label: "日漫",
    },
    {
        value: "A003",
        label: "美漫",
    },
    {
        value: "C001",
        label: "教材",
    },
    {
        value: "C002",
        label: "名著",
    },
    {
        value: "C003",
        label: "小说",
    },
    {
        value: "D001",
        label: "单机",
    },
    {
        value: "D002",
        label: "RPG",
    },
    {
        value: "D003",
        label: "RogueLike",
    },
    {
        value: "E001",
        label: "古典",
    },
    {
        value: "E002",
        label: "摇滚",
    },
    {
        value: "E003",
        label: "流行",
    },
    {
        value: "F001",
        label: "其他",
    },
]
exports.addnote = (req, res) => {
    const note = req.body;
    note.ReTime = note.CreateTime;
    cateList.forEach(item => {
        if (item.value == note.CateNum) {
            note.CateName = item.label;
        }
    })
    console.log(note);
    const sqladd = 'insert into note set ?';
    db.query(sqladd, note, (err, results) => {
        if (err) {
            return res.cc(err);
        }
        if (results.affectedRows !== 1) {
            return res.cc('关注失败!', 301);
        }
        res.cc('关注成功!', 200);
    })
}

exports.footmark = (req, res) => {
    const footmark = req.query;
    const sqlStr = 'select * from note where UserId=? and NoteType!=3';
    db.query(sqlStr, footmark.UserId, (err, results) => {
        if (err) return res.cc(err);
        if (results.length !== 1) return res.cc('没有数据！', 301);
        res.cc('足迹列表获取成功！', 200, { footmarkList: results, total: results.length })
    })
}

exports.addFollow = (req, res) => {
    const follow = req.body;
    follow.ReTime = follow.CreateTime;
    console.log(follow);
    const sqladd = 'insert into follow set ?';
    db.query(sqladd, follow, (err, results) => {
        if (err) {
            return res.cc(err);
        }
        if (results.affectedRows !== 1) {
            return res.cc('关注失败!', 301);
        }
        res.cc('关注成功!', 200);
    })
}

exports.followlist = (req, res) => {
    const follow = req.query;
    // console.log(follow);
    let sqlSelectF = 'select * from follow where FollowerId=? and FollowState!=0';
    db.query(sqlSelectF, [follow.FollowerId], (err, results) => {
        if (err) return res.cc(err);
        if (results.length !== 1) return res.cc('没有数据！', 301);
        res.cc('关注列表获取成功！', 200, { followlist: results, total: results.length })
    })
}

exports.unfollow = (req, res) => {
    const follow = req.query;
    let sqlDel = 'update follow set FollowType=0 where FollowId=? and WriterId=?';
    db.query(sqlDel, [follow.FollowId, follow.WriterId], (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc('取消关注失败！', 301);
        res.cc('取消关注成功！', 200)
    })
}

exports.updata = (req, res) => {
    const userInfo = req.body;
    console.log(userInfo);
    const sqlUpdata = 'update user set Email=?,Phone=?,Brief=? where UserId=?';
    db.query(sqlUpdata, [userInfo.Email, userInfo.Phone, userInfo.Brief], (err, results) => {
        if (err) {
            return res.cc(err);
        }
        if (results.affectedRows !== 1) {
            return res.cc('资料修改失败!', 301);
        }
        res.cc('资料修改成功!', 200);
    })
}