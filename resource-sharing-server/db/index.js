const mysql=require('mysql');

const db=mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'tuli233',
    database:'resourceSharing',
})

module.exports=db;