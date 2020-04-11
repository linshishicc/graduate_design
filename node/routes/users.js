const sql = require("../sql/sqlConfig");
const tokenObj = require('../util/jwt.js');
const express = require('express');
const crypto = require("crypto");
const moment = require("moment")
let router = express.Router();

router.get('/managerList', function(req, res, next) {
    let option = "select username,begroup,logintime,id from admin";
    sql.query(option, function(err, rows) {
        if (err) {
            return res.send({ errCode: -9999, message: '查询失败' + err })
        } else {
            res.send({ errCode: 0, message: '查询成功', data: rows });
        }
    })
});
router.post('/managerDel', function(req, res, next) {
    let id = req.body.id;
    let option = "delete from admin where id=" + id;
    console.log(option)
    sql.query(option, function(err, rows) {
        if (err) {
            return res.send({ errCode: -9999, message: '删除失败' + err, status: 0 })
        } else {
            res.send({ errCode: 0, message: '删除成功', status: 1 });
        }
    })
});
router.post('/managerAdd', function(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    let md5 = crypto.createHash("md5");
    let newPas = md5.update(password).digest("hex");
    let time = moment(new Date()).format('YYYYMMDDHHmm')
        // let option = "insert into admin  (username, password) VALUES (值1, 值2,....);
    let option = `insert into admin  (username, password,begroup,logintime) VALUES ("${username}", "${newPas}",2,"${time}")`
    let select = `select * from admin where username = "${username}"`
    sql.query(select, function(err, rows) {
        if (rows.length > 0) {
            return res.send({ errCode: 9, message: '该用户已注册', status: 0 })
        } else {
            sql.query(option, function(err, rows) {
                if (err) {
                    return res.send({ errCode: -9999, message: '添加失败' + err })
                } else {
                    res.send({ errCode: 0, message: '添加成功', data: rows, status: 1 });
                }
            })
        };
    })
});
router.post('/managerEdit', function(req, res, next) {
    let id = req.body.id;
    let password = req.body.password;
    let md5 = crypto.createHash("md5");
    let newPas = md5.update(password).digest("hex");
    let option = `UPDATE admin SET password = "${newPas}" WHERE id = ${id}`
    sql.query(option, function(err, rows) {
        if (err) {
            return res.send({ errCode: -9999, message: '修改失败' + err })
        } else {
            res.send({ errCode: 0, message: '修改成功', status: 1 });
        }
    })
});
module.exports = router;