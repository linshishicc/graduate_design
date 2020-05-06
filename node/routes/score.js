var express = require('express');
var router = express.Router();
const sql = require("../sql/sqlConfig");
const tokenObj = require('../util/jwt.js');
router.post('/updateScore', function(req, res, next) {
    let score = req.body.score;
    let username = req.body.username;
    let level = req.body.level;
    let option = `select score from user where username = "${username}"`
        // console.log(option)
    sql.query(option, function(err, rows) {
        if (err) return res.send({ errCode: -9999, message: '查询失败' + err })
        if (rows.length > 0 && rows[0].score < req.body.score) {
            let update = `UPDATE user SET score = "${score}",maxLevel = "${level}" WHERE username = "${username}"`
            sql.query(update, (err, rows) => {
                if (err) {
                    return res.send({ errCode: -9999, message: '修改失败' + err })
                } else {
                    res.send({ errCode: 0, message: '恭喜您打破记录！', status: 1 });
                }
            })
        } else {
            res.send({ errCode: 0, message: '分数低于最高记录！', status: 0 });
        }
        // res.send({ errCode: 0, message: '查询成功', data: rows });
    })
});
// 
router.post('/ranking', function(req, res, next) {
    let username = req.body.username;
    let select = `select username,score,maxLevel from user order by score desc`
        // console.log(select);
    sql.query(select, function(err, rows) {
        if (err) {
            return res.send({ errCode: -9999, message: '添加失败' + err })
        } else {
            let result = [];
            let userMessage = null;
            if (rows.length > 0) {
                rows.forEach((item, i) => {
                    if (i < 5) {
                        item.rank = i + 1
                        result.push(item)
                    }
                    if (item.username == username) {
                        item.rank = i + 1;
                        userMessage = item
                    }
                })
                console.log(userMessage)
                res.send({ errCode: 0, message: '查询成功', data: { result, userMessage }, status: 1 });
            }
        }
    })
});
router.post('/levelDel', function(req, res, next) {
    let id = req.body.id;
    let option = "delete from round where id=" + id;
    // console.log(option)
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
router.get('/allRanking', function(req, res, next) {
    let select = `select username,score,maxLevel from user order by score desc`
    sql.query(select, function(err, rows) {
        if (err) {
            return res.send({ errCode: -9999, message: '添加失败' + err })
        } else {
            let result = [];
            // let userMessage = null;
            console.log(rows)
            if (rows.length > 0) {
                res.send({ errCode: 0, message: '查询成功', data: { rows }, status: 1 });
            }
        }
    })
});
module.exports = router;