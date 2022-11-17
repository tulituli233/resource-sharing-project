const db = require('../db/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
exports.regUser = (req, res) => {
    // console.log(1);
    const userinfo = req.body;
    const sqlStr = 'select * from user where Username=?';
    // console.log(sqlStr);
    db.query(sqlStr, userinfo.Username, (err, results) => {
        if (err) {
            return res.cc(err);
        }
        // //用户名已存在
        if (results.length > 0) {
            return res.cc('用户名已被占用，请更换其他用户名！', 301);
        }
        // console.log(2);
        //用户名可用
        userinfo.Password = bcrypt.hashSync(userinfo.Password, 10);
        const sqladd = 'insert into user set ?';
        db.query(sqladd, { Username: userinfo.Username, Password: userinfo.Password }, (err, results) => {
            if (err) {
                return res.cc(err);
            }
            if (results.affectedRows !== 1) {
                return res.cc('用户注册失败！请稍后再试！', 301);
            }
            res.cc('注册成功！', 200);
        })
    })
}

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
let FImg = '1';

const fs = require("fs");
function base64ToFile(imgD) {
    var base64 = imgD.replace(/\s/g, "+");//我的版本可能会将加号转为空格，使图片出错
    var base64Data = base64.replace(/^data:image\/\w+;base64,/, '')
    // console.log(base64Data);
    var dataBuffer = Buffer.from(base64Data, 'base64')//新的用法 Buffer.from
    let nowTime = Date.now();
    fs.writeFile(`./uploads/images/${nowTime}.png`, dataBuffer, function (err) {
        if (err) return
        console.log('图片保存成功')
    })
    return `../../../../uploads/images/${nowTime}.png`
}

function saveImg(imgData) {
    let regImg = /(data:image([a-zA-Z0-9+/=;,]+))/;
    // console.log(regImg.test(imgData))
    var ml = [];
    let newImgData = imgData;
    let n = 1;
    // console.log(ml)
    while (regImg.test(newImgData)) {
        ml = newImgData.match(regImg)
        // console.log('ml[0]=====', ml[0])
        let newUrl = base64ToFile(ml[0]);
        if (n == 1) {
            FImg = newUrl;
        }
        // console.log('newUrl=====', newUrl)
        newImgData = newImgData.replace(ml[0], newUrl)
        // console.log('newImgData=====', newImgData)
        n--;
    }
    // console.log('newImgData=====', newImgData)
    return newImgData
}

exports.add = (req, res) => {
    const article = req.body;
    let newContent = saveImg(article.Content);
    console.log(article);
    article.Content = newContent;
    // console.log('newContent=====',newContent);
    cateList.forEach(item => {
        if (item.value == article.CateNum) {
            article.CateName = item.label;
        }
    })
    article.FirstImgUrl = FImg;
    article.ReTime = article.CreateTime;
    console.log(article);
    const sqladd = 'insert into article set ?';
    db.query(sqladd, article, (err, results) => {
        if (err) {
            return res.cc(err);
        }
        if (results.affectedRows !== 1) {
            return res.cc('上传失败!', 301);
        }
        res.cc('上传成功!', 200, newContent);
    })
}

exports.login = (req, res) => {
    const userinfo = req.body;
    let sqllogin = '';
    sqllogin = 'select * from user where Username=?';
    db.query(sqllogin, userinfo.Username, (err, results) => {
        if (err) return res.cc(err);
        if (results.length !== 1) return res.cc('登陆失败,该用户不存在！');
        const compareResult = bcrypt.compareSync(userinfo.Password, results[0].Password);
        if (!compareResult) {
            return res.cc('登陆失败，密码错误！', 301);
        }
        const id = results[0].UserId;
        // console.log('id='+id);
        const user = { id, Username: userinfo.Username };
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: '24h',
        });
        res.cc('登录成功！', 200, 'Bearer ' + tokenStr)
    })
}
