const WebSocket = require('ws'); //模块引入
// //开一个4000端口来存
let clients = [];	//存所有连接上的用户
const wss = new WebSocket.Server({
    port: 8008
});
// wss.clients=[]
// //连接上就会多一个client
// wss.on('connection', function connection(client, req) {
//     //有数据就会触发client.on     'message'    data是传上来的数据
//     client.on('message', function incoming(data) {
//         //这是连接上发送过来的数据  唯一标识的phone
//         let dt = JSON.parse(data)
//         // console.log(dt)
//         //每个客户端都存上自己发来的phone做为唯一的id
//         client.id = dt.uid
//         console.log(client.id);
//         //连接上后就压进数组
//         clients.push(client)
//     });

//     client.on("close", (msg) => {
//         console.log("与前端断开连接")
//     })
// });

module.exports = {
    wss,
    clients
}