const sql = require('../sql/sqlConfig');
const express = require('express');
let router = express.Router();
const pagination = require('../util/page');

//查商品类型
router.get('/type', function(req, res, next) {
    let option = "select * from product_type";
    sql.query(option, function(err, rows) {
        if (err) {
            return res.send({ errCode: -9999, message: '查询失败' + err })
        } else {
            res.send({ errCode: 0, message: '查询产品类型成功', result: rows });
        }
    })
});
//增商品类型
router.post('/typeAdd', function(req, res) {
    let name = req.body.name;
    let pic = req.body.pic;
    let option = "insert into product_type(name,pic) values('" + name + "','" + pic + "')";
    sql.query(option, function(err, rows) {
        if (err) {
            return res.send({ errCode: -9999, message: '新增商品类型失败' + err });
        } else {
            res.send({ errCode: 0, message: '新增商品类型成功' });
        }
    })
});
//改商品类型
router.post('/typeAlter', function(req, res) {
    let id = req.body.id;
    let name = req.body.name;
    let pic = req.body.pic;
    let option = "update product_type set name='" + name + "',pic='" + pic + "' where id=" + id;
    sql.query(option, function(err, rows) {
        if (err) {
            return res.send({ errCode: -9999, message: '修改商品类型失败' + err });
        } else {
            res.send({ errCode: 0, message: '修改商品类型成功' });
        }
    })
});
//删商品类型
router.post('/typeRemove', function(req, res) {
    let id = req.body.id;
    let option = "select id from product where type_id=" + id;
    let option1 = "delete from product_type where id=" + id;
    sql.query(option, function(err, rows) {
        if (err) {
            return res.send({ errCode: -9999, message: '删除商品类型失败' + err });
        } else {
            if (rows.length > 0) {
                return res.send({ errCode: 9, message: "该类型下有商品表，请将商品删除之后再删除商品类型" });
            } else {
                sql.query(option1, function(err, rows) {
                    if (err) {
                        return res.send({ errCode: -9999, message: '删除商品类型失败' + err });
                    } else {
                        res.send({ errCode: 0, message: '删除商品类型成功' });
                    }
                })
            }
        }
    })
});

//查商品列表
router.get('/list', function(req, res) {
    let countPageSql = "select count(id) as total from product";
    let page = req.query.page;
    let option = "select p.*,t.`name` as `type_name` from `product` as p join `product_type` as t on p.`type_id`=t.`id` limit ";
    pagination(countPageSql, page, option, function(result) {
        return res.send(result)
    });
});
//增商品
router.post('/add', function(req, res) {
    let pic = req.body.bannerPic;
    let name = req.body.name;
    let disc = req.body.disc;
    let principal = req.body.principal;
    let price = req.body.price;
    let detail = req.body.detailPic;
    let type_id = req.body.type;
    let option = "insert into product(pic,name,disc,principal,price,detail,type_id) values('" + pic + "','" + name + "','" + disc + "','" + principal + "','" + price + "','" + detail + "','" + type_id + "')";
    sql.query(option, function(err, rows) {
        if (err) {
            return res.send({ errCode: -9999, message: '新增商品失败' + err });
        } else {
            res.send({ errCode: 0, message: '新增商品成功' });
        }
    })
});
// 改商品属性
router.post('/alter', function(req, res) {
    let id = req.body.id;
    let pic = req.body.bannerPic;
    let name = req.body.name;
    let disc = req.body.disc;
    let principal = req.body.principal;
    let price = req.body.price;
    let detail = req.body.detailPic;
    let type_id = req.body.type;
    let option = "update product set pic='" + pic + "',name='" + name + "',disc='" + disc + "',principal='" + principal + "',price='" + price + "',detail='" + detail + "',type_id='" + type_id + "' where id=" + id;
    sql.query(option, function(err, rows) {
        if (err) {
            return res.send({ errCode: -9999, message: '修改商品失败' + err });
        } else {
            res.send({ errCode: 0, message: '修改商品类型成功' });
        }
    })
});
//删商品
router.post('/remove', function(req, res) {
    let id = req.body.id;
    let option = "delete from product where id=" + id;
    sql.query(option, function(err, rows) {
        if (err) {
            return res.send({ errCode: -9999, message: '删除商品失败' + err });
        } else {
            res.send({ errCode: 0, message: "该商品已删除" });
        }
    })
});
//删商品多条记录
router.post('/removeMore', function(req, res) {
    let idList = req.body;
    let str = "";
    idList.forEach((val, index, arr) => {
        str += val + ","
    });
    str = str.substring(0, str.length - 1);
    console.log(str);
    let option = "delete from product where id in (" + str + ")";
    sql.query(option, function(err, rows) {
        if (err) {
            return res.send({ errCode: -9999, message: '删除多条商品记录失败' + err });
        } else {
            res.send({ errCode: 0, message: "商品已批量删除" });
        }
    })
});
//根据商品名称搜索
router.get('/search', function(req, res, next) {
    let key = req.query.key;
    let countPageSql = "select count(id) as total from `product` where `name` like '%" + key + "%'";
    let page = req.query.page;
    let option = "select p.*,t.`name` as `type_name` from `product` as p join `product_type` as t on p.`type_id`=t.`id` where p.`name` like '%" + key + "%' limit ";
    pagination(countPageSql, page, option, function(result) {
        return res.send(result)
    });
});

//商品排行榜
router.get('/popular', function(req, res, next) {
    // select p.`name`,p.`price`,t.`name` as `type_name`,o.`product_id`,count(0) as quantity from `product` as p join `product_type` as t on p.`type_id`=t.`id` limit
    let option = "select `product_id`,count(0) as quantity from `order` group by `product_id` having count(product_id) > 0 order by quantity";
    sql.query(option, function(err, rows) {
        if (err) {
            return res.send({ errCode: -9999, message: '操作数据库失败' + err });
        } else {
            console.log(rows);
            res.send(rows);
        }
    })
});

module.exports = router;