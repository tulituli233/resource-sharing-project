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

exports.Article_Comments_ADD = (ArticleId) => {
    console.log('ArticleId===',ArticleId);
    const Vadd = 'UPDATE article SET Comments=Comments+1 WHERE ArticleId=?';
    // console.log(footmark);
    db.query(Vadd, ArticleId, (err, results) => {
        if (err) return console.log(err);
        // console.log(results);
        if (results.affectedRows == 0) return console.log('评论量+1失败！');
        return console.log('评论量+1成功！');
    })
}
