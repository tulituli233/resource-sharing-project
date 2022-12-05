const express = require('express');
const joi = require('joi');
const config = require('./config');
const expressJWT = require('express-jwt');
const path = require('path');

const app = express();
// 设置请求大小
app.use(express.json({
    limit: '50mb'
}))
app.use(express.urlencoded({
    limit: '50mb',
    extended: true
}))

//响应数据的中间件
app.use(function (req, res, next) {
    res.cc = function (err, status = 444, data = '') {
        res.send({
            meta: {
                status,
                message: err instanceof Error ? err.message : err
            },
            data
        })
    }
    next();
})
// 跨域
const cors = require('cors');
app.use(cors());

//只能解析这种格式application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// 托管静态资源文件
// app.use('/uploads', express.static('./uploads'));
// app.use(express.static('./uploads'));
app.use('/uploads',express.static(path.join(__dirname,'/uploads')));

//unless除了/ours路径，其余路径均需要进行token校验
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/ours/] }))

const { UnauthorizedError } = require('express-jwt/lib');
//导入自定义路由模块
const userRouter = require('./router/user');
app.use('/ours', userRouter);

const articleRouter = require('./router/article');
app.use('/my/article', articleRouter);

const commentRouter = require('./router/comment');
app.use('/my/comment', commentRouter);

const buyRouter = require('./router/buy');
app.use('/my/buy', buyRouter);

const userinfoRouter = require('./router/userinfo');
app.use('/my/userinfo', userinfoRouter);

const chatRouter = require('./router/chat');
app.use('/my/chat', chatRouter);

// app.use(function (err, req, res, next) {//错误级别中间件
//     if (err instanceof joi.ValidationError) return res.cc(err);
//     if (err.name === 'UnauthorizedError') return res.cc('身份认证失败1！')
//     res.cc(err);
// })

// 图片保存
const fs = require("fs");
app.post('/upload', (req, res) => {
    console.log('cg');
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
        return `./uploads/images/${nowTime}.png`
    }
    let imgData = req.body.load;
    // console.log('imgData=====',typeof imgData)
    let regImg = /(data:image([a-zA-Z0-9+/=;,]+))/;
    // console.log(regImg.test(imgData))
    var ml = [];
    let newImgData = imgData;
    // console.log(ml)
    while (regImg.test(newImgData)) {
        ml = newImgData.match(regImg)
        // console.log('ml[0]=====', ml[0])
        let newUrl = base64ToFile(ml[0]);
        // console.log('newUrl=====', newUrl)
        newImgData = newImgData.replace(ml[0], newUrl)
        // console.log('newImgData=====', newImgData)
    }

    console.log('newImgData=====', newImgData)
    res.end('ok')
})

// ------------------------
function gid() {
    var id = Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000
    var have = false;
    for (var i = 0; i < player.length; i++) {
        if (player[i] == id.toString()) {
            have = true;
            break;
        }
    }
    if (have) {
        gid();
    } else {
        return id;
    }
}

// const SocketServer = require('ws').Server
// const wss = new SocketServer({ server })  //搭建服务器
// var player = new Array()
// //当有人匹配到时
// wss.on("connection", (ws, req) => {
//     // 把自己的给搞好先
//     id = gid();
//     player.push(id)
//     wss.clients.forEach(s => {
//         if (s.socketIdxos == another && s.readyState == 1 && s.socketIdxos != id) {
//             //another是你要找对面的id号
//             //做你自己的事，此时s就是你要找的对象,发送信息用s.send()即可
//         }
//     })
// })


// const Ws=require('ws');
// // const userHander=require('./router_hander/user');
// ;((Ws)=>{
//     const server=new Ws.Server({port:8008});
//     const init=()=>{
//         bindEvent();
//     }
//     function bindEvent(){
//         server.on('open',handleOpen);
//         server.on('close',handleClose);
//         server.on('error',handleError);
//         server.on('connection',handleConnection);
//     }
//     function handleOpen(){
//         console.log("open");
//     }
//     function handleClose(){
//         console.log("close");
//     }
//     function handleError(){
//         console.log("error");
//     }
//     function handleConnection(ws){
//         console.log("connection");
//         ws.on('message',handleMessage)
//     }
//     function handleMessage(msg){
//         console.log(JSON.parse(msg));
//         cli
//         // console.log(server.clients);
//         // server.clients.forEach((c)=>{
//         //     // console.log(c);
//         //     c.chatId=1;
//         //     console.log(c.chatId);
//         //     // c.send(msg);
//         //     // userHander.test(c);
//         // })
//     }
//     init();
// })(Ws)

// let server = app.listen(8888)
// let io = require('socket.io').listen(server)
// let io = require('socket.io')(8888);
// io.on('connection', (socket) => {
//     // console.log('someone connected!');
//     console.log(1);
// });

// const WebSocket = require('ws'); //模块引入
// //开一个4000端口来存
// let clients = [];	//存所有连接上的用户
// const wss = new WebSocket.Server({
//     port: 8008
// });
const { wss, clients } = require('./wss.js');

//连接上就会多一个client
wss.on('connection', function connection(client, req) {
    //有数据就会触发client.on     'message'    data是传上来的数据
    client.on('message', function incoming(data) {
        //这是连接上发送过来的数据  唯一标识的phone
        let dt = JSON.parse(data)
        // console.log(dt)
        //每个客户端都存上自己发来的phone做为唯一的id
        client.id = dt.uid
        console.log(client.id);
        //连接上后就压进数组
        let oldIndex = -1;
        clients.forEach((item, i) => {
            if (item.id == dt.uid) {
                oldIndex = i
            }
            // item.send(JSON.stringify({datalist:'qwer'}));
        })
        if (oldIndex != -1) {
            // clients.splice(oldIndex, client)
            clients[oldIndex] = client;
            console.log('连接替换');
        } else {
            clients.push(client)
            console.log('连接增加');
        }
        console.log('clients.l', clients.length);
        // clients.forEach((item, i) => {
        //     item.send(JSON.stringify({datalist:'qqqq'}));
        // })
    });


    client.on("close", (msg) => {
        console.log("与前端断开连接")
        console.log('msg=', msg);
        // clients=clients.forEach(i=>{
        //     if(i=)
        // })
    })
});

// // 当有人发送消息的时候
// const router = express.Router();
// router.post('/sendmsg', (req, res) => {
//     //前端传过来的数据
//     let { Pimg, Dimg, FormId, ToId, yuyin, face, content, imgs, nickName } = req.body
//     const datalist = {
//         Pimg, Dimg, FormId, ToId, yuyin, face, content, imgs, nickName
//     }
//     console.log(content);
//     //发送给自己客户端的数据
//     res.send(datalist)
//     //循环遍历     找到你要发送的人  他的id  就发送
//     wss.clients.forEach(function each(client) {
//         if (ToId == client.id) {
//             client.send(JSON.stringify(datalist));
//         }
//     });
// })
// app.use(router)




app.listen(3838, () => {
    console.log('api 在3838上运行...');
})



