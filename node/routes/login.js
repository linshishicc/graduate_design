const sql = require("../sql/sqlConfig");
const tokenObj = require('../util/jwt.js');
const express = require('express');
const crypto = require("crypto");
const moment = require("moment")
let router = express.Router();
router.post('/adminLogin', function(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    let md5 = crypto.createHash("md5");
    let newPas = md5.update(password).digest("hex");
    let option = "select * from admin where username='" + username + "' and password='" + newPas + "'";
    sql.query(option, function(err, rows) {
        if (err) {
            return res.send({ errCode: -9999, message: '查询失败:' + err, status: 0 })
        } else {
            if (rows.length == 0) return res.send({ errCode: 9, message: '用户名或者密码错误', status: 0 });
            let userInfo = {
                id: rows[0].id,
                username: rows[0].username
            };
            let result = {
                id: rows[0].id,
                username: rows[0].username,
                group: rows[0].begroup
            };
            let myToken = new tokenObj();
            let tokenv = myToken.createToken(userInfo, 60 * 20); //20分钟
            let time = moment(new Date()).format('YYYYMMDDHHmm')
                // console.log(time)
            let updateTime = "UPDATE admin SET logintime ='" + time + "' WHERE id = '" + rows[0].id + "'"
            sql.query(updateTime, (err, rows) => {})
            res.send({ errCode: 0, message: '登陆成功', status: 1, result: { token: tokenv, userInfo: result } });
        }
    })
});
router.post('/userLogin', function(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    let md5 = crypto.createHash("md5");
    let newPas = md5.update(password).digest("hex");
    let option = "select * from user where username='" + username + "' and password='" + newPas + "'";
    sql.query(option, function(err, rows) {
        if (err) {
            return res.send({ errCode: -9999, message: '查询失败:' + err, status: 0 })
        } else {
            if (rows.length == 0) return res.send({ errCode: 9, message: '用户名或者密码错误!', status: 0 });
            let result = {
                id: rows[0].id,
                username: rows[0].username,
                maxLevel: rows[0].maxLevel
            };
            // let myToken = new tokenObj();
            // let tokenv = myToken.createToken(userInfo, 60 * 20);
            res.send({ errCode: 0, message: '登陆成功', status: 1, result: { userInfo: result } });
        }
    })
});
module.exports = router;