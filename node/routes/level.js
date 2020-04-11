var express = require('express');
var router = express.Router();
const sql = require("../sql/sqlConfig");
const tokenObj = require('../util/jwt.js');
// 获取关卡列表
router.get('/levelList', function(req, res, next) {
    let option = "select * from round";
    sql.query(option, function(err, rows) {
        if (err) {
            return res.send({ errCode: -9999, message: '查询失败' + err })
        } else {
            res.send({ errCode: 0, message: '查询成功', data: rows });
        }
    })
});
// 
router.post('/levelAdd', function(req, res, next) {
    let level = req.body.level;
    let theme = req.body.theme;
    let purple = req.body.purple;
    let yellow = req.body.yellow;
    let blue = req.body.blue;
    let live = req.body.live;
    let select = `select * from round where level = ${req.body.level}`
    sql.query(select, function(err, rows) {
        if (err) {
            return res.send({ errCode: -9999, message: '添加失败' + err })
        } else {
            if (rows.length > 0) {
                return res.send({ errCode: -9999, message: '该关卡已存在' })
            } else {
                let option = `insert into round (level, theme,purple,yellow,blue,live) VALUES ("${level}", "${theme}","${purple}", "${yellow}","${blue}","${live}")`
                sql.query(option, function(err, rows) {
                    if (err) {
                        return res.send({ errCode: -9999, message: '添加失败' + err })
                    } else {
                        res.send({ errCode: 0, message: '添加成功', data: rows, status: 1 });
                    }
                })
            }
        }
    })
});
router.post('/levelDel', function(req, res, next) {
    let id = req.body.id;
    let option = "delete from round where id=" + id;
    console.log(option)
    sql.query(option, function(err, rows) {
        if (err) {
            return res.send({ errCode: -9999, message: '删除失败' + err, status: 0 })
        } else {
            res.send({ errCode: 0, message: '删除成功', status: 1 });
        }
    })
});
router.post('/levelUpdate', function(req, res, next) {
    let id = req.body.id;
    let theme = req.body.theme;
    let purple = req.body.purple;
    let yellow = req.body.yellow;
    let blue = req.body.blue;
    let live = req.body.live;
    let option = `UPDATE round SET theme = "${theme}",purple = "${purple}",yellow = "${yellow}",blue="${blue}",live="${live}" WHERE id = ${id}`
    sql.query(option, function(err, rows) {
        if (err) {
            return res.send({ errCode: -9999, message: '修改失败' + err })
        } else {
            res.send({ errCode: 0, message: '修改成功', status: 1 });
        }
    })
});
module.exports = router;