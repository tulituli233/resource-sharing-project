const db = require('../db/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const articleUpdate = require('./articleUpdate');
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
        value: "F",
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
    const sqlStr = 'select * from note where UserId=? and ArticleId=?';
    db.query(sqlStr, [note.UserId, note.ArticleId], (err, results) => {
        if (err) return res.cc(err);
        let sqladd = ''
        let data = ''
        // console.log(results);
        if (results.length !== 1) {
            sqladd = 'insert into note set ?';
            data = note;
            // 增加浏览量
            console.log('ArticleId2===', note.ArticleId);
            articleUpdate.Article_Views_ADD(note.ArticleId);

        } else {
            sqladd = 'update note set ReTime=? where UserId=? and ArticleId=?';
            data = [note.ReTime, note.UserId, note.ArticleId]
        }
        let iORu = results.length;
        // console.log(sqladd);
        db.query(sqladd, data, (err, results) => {
            if (err) {
                return res.cc(err);
            }
            if (results.affectedRows !== 1) {
                return res.cc(iORu == 1 ? '足迹修改失败!' : '足迹添加失败!', 301);
            }
            res.cc(iORu == 1 ? '足迹修改成功!' : '足迹添加成功!', 200);
        })
    })

}

exports.UpNote = (req, res) => {
    const note = req.body;
    const sqlStr = 'update note set ? where UserId=? and ArticleId=?';
    // console.log(footmark);
    db.query(sqlStr, [note.reProp, note.UserId, note.ArticleId], (err, results) => {
        if (err) return res.cc(err);
        // console.log(results);
        if (results.affectedRows == 0) return res.cc('记录修改失败！', 301);
        // 刷新文章数据
        
        return res.cc('记录修改成功！', 200)
    })
}

exports.footmark = (req, res) => {
    const footmark = req.query;
    const sqlStr = 'select * from note where userId=? and NoteType=?';
    // console.log(footmark);
    db.query(sqlStr, [footmark.UserId, footmark.NoteType], (err, results) => {
        if (err) return res.cc(err);
        // console.log(results);
        if (results.length == 0) return res.cc('没有数据！', 301);
        return res.cc('足迹列表获取成功！', 200, { footmarkList: results, total: results.length })
    })
}

exports.getNote = (req, res) => {
    const noteQ = req.query;
    const sqlStr = 'select * from note where userId=? and ArticleId=?';
    // console.log('noteQ==',noteQ);
    db.query(sqlStr, [noteQ.UserId, noteQ.ArticleId], (err, results) => {
        if (err) return res.cc(err);
        // console.log('sqlnote==',results);
        if (results.length == 0) return res.cc('没有对应Note数据！', 301);
        return res.cc('获取Note成功！', 200, { Note: results[0] })
    })
}

exports.addFollow = (req, res) => {
    const follow = req.body;
    follow.ReTime = follow.CreateTime;
    console.log(follow);
    let sqlSelectF = 'select * from follow where FollowerId=? and WriterId=?';
    db.query(sqlSelectF, [follow.FollowerId, follow.WriterId], (err, results) => {
        if (err) return res.cc(err);
        let sqladd = '';
        let Data = '';
        if (results.length !== 1) {
            sqladd = 'insert into follow set ?';
            Data = follow;
        } else {
            sqladd = 'update follow set FollowState=?,ReTime=? where FollowerId=? and WriterId=?';
            Data = [follow.FollowState, follow.ReTime, follow.FollowerId, follow.WriterId]
        }
        console.log(sqladd);
        db.query(sqladd, Data, (err, results) => {
            if (err) {
                return res.cc(err);
            }
            if (results.affectedRows !== 1) {
                return res.cc(follow.FollowState == 0 ? '取关失败!' : '关注失败!', 301);
            }
            return res.cc(follow.FollowState == 0 ? '取关成功!' : '关注成功!', 200);
        })
    })
}

exports.followlist = (req, res) => {
    const follow = req.query;
    // console.log(follow);
    let sqlSelectF = 'select * from follow where FollowerId=? and FollowState!=0';
    db.query(sqlSelectF, [follow.FollowerId], (err, results) => {
        if (err) return res.cc(err);
        if (results.length == 0) return res.cc('没有数据！', 301);
        return res.cc('关注列表获取成功！', 200, { followlist: results, total: results.length })
    })
}

exports.unfollow = (req, res) => {
    const follow = req.query;
    let sqlDel = 'update follow set FollowState=0 where FollowerId=? and WriterId=?';
    db.query(sqlDel, [follow.FollowerId, follow.WriterId], (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc('取消关注失败！', 301);
        return res.cc('取消关注成功！', 200)
    })
}

exports.updata = (req, res) => {
    const userInfo = req.body;
    console.log(userInfo);
    const sqlUpdata = 'update user set Email=?,Phone=?,Brief=? where UserId=?';
    db.query(sqlUpdata, [userInfo.Email, userInfo.Phone, userInfo.Brief, userInfo.UserId], (err, results) => {
        if (err) {
            return res.cc(err);
        }
        if (results.affectedRows !== 1) {
            return res.cc('资料修改失败!', 301);
        }
        return res.cc('资料修改成功!', 200);
    })
}

exports.isfollow = (req, res) => {
    const follow = req.query;
    // console.log(follow);
    let sqlSelectF = 'select * from follow where FollowerId=? and WriterId=? and FollowState!=0';
    db.query(sqlSelectF, [follow.FollowerId, follow.WriterId], (err, results) => {
        if (err) return res.cc(err);
        if (results.length == 0) return res.cc('没有关注！', 301);
        return res.cc('已关注！', 200)
    })
}

exports.getMainPage = (req, res) => {
    const userinfo = req.body;
    let sqlMP = '';
    sqlMP = 'select * from user where UserId=?';
    db.query(sqlMP, userinfo.UserId, (err, results) => {
        if (err) return res.cc(err);
        if (results.length == 0) return res.cc('查无此人！');
        res.cc('主页数据获取成功！', 200, {
            userInfo: {
                id: results[0].UserId,
                username: results[0].Username,
                Likes: results[0].Likes,
                Followers: results[0].Followers,
                Sharers: results[0].Sharers,
                HeadImgUrl: results[0].HeadImgUrl,
                Brief: results[0].Brief,
                Integral: results[0].Integral,
            },
        })
    })
}