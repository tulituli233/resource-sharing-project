const mysql=require('mysql');

const db=mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'tuli233',
    database:'resourceSharing',
})
// const db=mysql.createPool({
//     host:'43.139.225.120',
//     user:'resourceSharing',
//     password:'mysql20011201',
//     database:'resourcesharing',
// })

module.exports=db;