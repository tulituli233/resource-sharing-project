const db = require('../db/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
exports.Article_Views_ADD = (ArticleId) => {
    // console.log('ArticleId===',ArticleId);
    const Vadd = 'UPDATE article SET Views=Views+1 WHERE ArticleId=?';
    // console.log(footmark);
    db.query(Vadd, ArticleId, (err, results) => {
        if (err) return console.log(err);
        // console.log(results);
        if (results.affectedRows == 0) return console.log('浏览量+1失败！');
        return console.log('浏览量+1成功！');
    })
}
// 增加评论数量
exports.Article_Comments_ADD = (ArticleId) => {
    // console.log('ArticleId===', ArticleId);
    const Vadd = 'UPDATE article SET Comments=Comments+1 WHERE ArticleId=?';
    // console.log(footmark);
    db.query(Vadd, ArticleId, (err, results) => {
        if (err) return console.log(err);
        // console.log(results);
        if (results.affectedRows == 0) return console.log('评论量+1失败！');
        return console.log('评论量+1成功！');
    })
}
// 修改购买人数
exports.Article_BuyNum_ADD = (ArticleId) => {
    // console.log('ArticleId===', ArticleId);
    const Vadd = 'UPDATE article SET BuyNum=BuyNum+1 WHERE ArticleId=?';
    // console.log(footmark);
    db.query(Vadd, ArticleId, (err, results) => {
        if (err) return console.log(err);
        // console.log(results);
        if (results.affectedRows == 0) return console.log('购买人数+1失败！');
        return console.log('购买人数+1成功！');
    })
}
// 修改评分
exports.Article_Grade_ADD = (ArticleId, AbsGrade, VOrBNum, oldGrade) => {
    // console.log('ArticleId===', ArticleId);
    let newGrade = (VOrBNum * oldGrade + AbsGrade) / VOrBNum;
    const Vadd = 'UPDATE article SET Grade=? WHERE ArticleId=?';
    // console.log(footmark);
    db.query(Vadd, [newGrade, ArticleId], (err, results) => {
        if (err) return console.log(err);
        // console.log(results);
        if (results.affectedRows == 0) return console.log('评分修改失败！');
        return console.log('评分修改成功！');
    })
}

exports.Article_LikedOrStar = (UserId, ArticleId, type, isPush) => {
    // console.log('ArticleId===', ArticleId);
    let sql = ''
    if (type == 1 && !isPush == true) {
        sql = 'UPDATE article SET Likes=Likes+1 WHERE ArticleId=?'
        this.User_Likes(UserId, isPush)
    }
    else if (type == 1 && !isPush != true) {
        sql = 'UPDATE article SET Likes=Likes-1 WHERE ArticleId=?'
        this.User_Likes(UserId, isPush)
    }
    else if (type != 1 && !isPush == true) {
        sql = 'UPDATE article SET Stars=Stars+1 WHERE ArticleId=?'
    }
    else if (type != 1 && !isPush != true) {
        sql = 'UPDATE article SET Stars=Stars-1 WHERE ArticleId=?'
    }
    db.query(sql, ArticleId, (err, results) => {
        if (err) return console.log(err);
        // console.log(results);
        if (results.affectedRows == 0) return console.log('修改失败！');
        return console.log('修改成功！');
    })
}

exports.User_Likes = (UserId, isPush) => {
    console.log('UserId===', UserId);
    let sql = !isPush == true ? 'UPDATE user SET Likes=Likes+1 WHERE UserId=?' : 'UPDATE user SET Likes=Likes-1 WHERE UserId=?'
    db.query(sql, UserId, (err, results) => {
        if (err) return console.log(err);
        // console.log(results);
        if (results.affectedRows == 0) return console.log('点赞量修改失败！');
        return console.log('点赞量修改成功！');
    })
}
// 粉丝数量
exports.User_Followers = (UserId, isPush) => {
    // console.log('ArticleId===', ArticleId);
    let sql = !isPush == true ? 'UPDATE user SET Followers=Followers+1 WHERE UserId=?' : 'UPDATE user SET Followers=Followers-1 WHERE UserId=?'
    db.query(sql, UserId, (err, results) => {
        if (err) return console.log(err);
        // console.log(results);
        if (results.affectedRows == 0) return console.log('粉丝数量修改失败！');
        return console.log('粉丝数量修改成功！');
    })
}
// 自己的关注量
exports.User_Sharers = (UserId, isPush) => {
    // console.log('ArticleId===', ArticleId);
    let sql = !isPush == true ? 'UPDATE user SET Sharers=Sharers+1 WHERE UserId=?' : 'UPDATE user SET Sharers=Sharers-1 WHERE UserId=?'
    db.query(sql, UserId, (err, results) => {
        if (err) return console.log(err);
        // console.log(results);
        if (results.affectedRows == 0) return console.log('关注数量修改失败！');
        return console.log('关注数量修改成功！');
    })
}