const db = require('../db/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
exports.alist = (req, res) => {
    // console.log(req.body);
    //判断使用哪条sql和数组select * from ev_artide_cate where name=?
    let sqlGetArt = '';
    let data = [];
    // if(req.body.__proto__===undefined)Object.setPrototypeOf(req.body, new Object());
    // console.log(req.body);
    if (req.body.cate === '' && req.body.mark === '') {
        sqlGetArt = 'select ArticleId,IssuerId,IssuerName,Title,Views,Likes,Comments,Grade,BuyNum,Price,CateNum,CateName,Tags,FirstImgUrl,Brief,ArticleState,CreateTime from article where ArticleState=1';
        // console.log(1);
    }
    if (req.body.cate === '' && req.body.mark !== '') {
        sqlGetArt = 'select ArticleId,IssuerId,IssuerName,Title,Views,Likes,Comments,Grade,BuyNum,Price,CateNum,CateName,Tags,FirstImgUrl,Brief,ArticleState,CreateTime from article where Title like ? and ArticleState=1';
        data = ['%' + req.body.mark + '%'];
        // console.log(1);
    }
    if (req.body.cate !== '' && req.body.mark === '') {
        sqlGetArt = 'select ArticleId,IssuerId,IssuerName,Title,Views,Likes,Comments,Grade,BuyNum,Price,CateNum,CateName,Tags,FirstImgUrl,Brief,ArticleState,CreateTime from article where CateNum=? and ArticleState=1';
        data = [req.body.cate];
    }
    if (req.body.cate !== '' && req.body.mark !== '') {
        sqlGetArt = 'select ArticleId,IssuerId,IssuerName,Title,Views,Likes,Comments,Grade,BuyNum,Price,CateNum,CateName,Tags,FirstImgUrl,Brief,ArticleState,CreateTime from article where CateNum=? and Title like ? and ArticleState=1';
        data = [req.body.cate, '%' + req.body.mark + '%'];
    }

    db.query(sqlGetArt, data, (err, results) => {
        // console.log(results);
        if (err) return res.cc(err);
        if (results.length < 1) return res.cc('没有所需文章数据！');
        //(i-1)*j:slice||j~i*j-1截取数组
        let i = req.body.pagenum;
        // console.log("i="+i);
        let j = req.body.pagesize;
        // console.log("j="+j);
        // let arts=results.slice((i-1)*j,i*j-1);
        // let arts = results.slice((i - 1) * j, i * j);//前开始，后结束，不包括结束
        // console.log(arts);
        let arts = [];
        let total = results.length;

        if (total == 0) {
            res.cc('没有相关数据!', 301, { alist: arts, total })
        } else {
            try {
                arts = results.slice((i - 1) * j, i * j);
            } catch (e) {
                if (articleList.size() < j) {
                    arts = results
                } else {
                    arts = results.slice((i - 1) * j, total);
                }
            }
        }
        res.cc('获取文章列表成功!', 200, { alist: arts, total })
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
    // console.log(article);
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

exports.geta = (req, res) => {
    const Article = req.query;
    console.log(Article);
    let sqlSelectO = 'select * from orders where BuyerId=? and ArticleId=?';
    db.query(sqlSelectO, [Article.BuyerId, Article.ArticleId], (err, results) => {
        if (err) return res.cc(err);
        let sqlSelectA = '';
        if (results.length !== 1) {
            sqlSelectA = 'select ArticleId,IssuerId,IssuerName,Title,Views,Likes,Comments,Grade,BuyNum,Price,CateNum,CateName,Tags,FirstImgUrl,Brief,ArticleState,CreateTime,Content from article where ArticleId=? and ArticleState=1';
        } else {
            sqlSelectA = 'select * from article where ArticleId=?';
        }
        db.query(sqlSelectA, Article.ArticleId, (err, results) => {
            if (err) return res.cc(err);
            if (results.length !== 1) return res.cc('没有找到该文章', 301);
            res.cc('查找成功！', 200, { Article: results[0] })
        })
        // res.cc('查找成功！', 200, { Article: results[0] })
    })
}

exports.delete = (req, res) => {
    const Article = req.query;
    let sqlDel = 'update article set ArticleState=0 where ArticleId=?';
    db.query(sqlDel, Article.ArticleId, (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc('删除失败！', 301);
        res.cc('删除成功！', 200)
    })
}

exports.updata = (req, res) => {
    const ArticleUpdata = req.body;
    let newContent = saveImg(ArticleUpdata.Content);
    // console.log(article);
    ArticleUpdata.Content = newContent;
    // console.log('newContent=====',newContent);
    cateList.forEach(item => {
        if (item.value == ArticleUpdata.CateNum) {
            ArticleUpdata.CateName = item.label;
        }
    })
    let sqlUpdata = 'update article set Title=?,Content=?,LianJie=?,Price=?,CateNum=?,CateName=?,Tags=?,Brief=? where ArticleId=?';
    db.query(sqlUpdata, ArticleUpdata, (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc('修改失败！', 301);
        res.cc('修改成功！', 200)
    })
}
