const db = require('../db/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { wss, clients } = require('../wss.js')
exports.sendmsg = (req, res) => {
    //前端传过来的数据
    console.log('1', 1);
    let { Pimg, Dimg, FormId, ToId, yuyin, face, content, imgs, nickName } = req.body
    const datalist = {
        Pimg, Dimg, FormId, ToId, yuyin, face, content, imgs, nickName
    }
    console.log(content);
    //发送给自己客户端的数据
    // res.send(datalist)
    console.log('clients.l', clients.length);
    //循环遍历     找到你要发送的人  他的id  就发送
    clients.forEach(function each(client) {
        if (ToId == client.id) {
            // console.log('3', client);
            client.send(JSON.stringify(datalist));
            console.log('3', 3);
        }
    });
    res.cc('成功', 200, datalist);
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
        res.cc('登录成功！', 200, {
            userInfo: { id, username: results[0].Username },
            token: 'Bearer ' + tokenStr
        })
    })
}
