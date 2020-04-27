const sql = require("../sql/sqlConfig");

function pagination(countSql, page, optionSql, callback) {
    /**
     * 1.先查总条数，算出总页数
     * 2.再分页查询
     *  countSql:查总页数的sql语句
     *  page:当前分页
     *  optionSql:根据分页查询
     *  **/
    let num = 10; //一页条数
    let totalPage = null; //总页数
    sql.query(countSql, function(err, rows) {
        if (err) {
            callback({ errCode: -9999, message: '查询失败' + err });
            return
        } else {
            totalPage = Math.ceil(rows[0].total / num);
            let current_page = 1; //默认为1
            if (page) {
                current_page = parseInt(page);
            }
            let last_page = current_page - 1;
            if (current_page <= 1) {
                last_page = 1;
            }
            let next_page = current_page + 1;
            let option = optionSql + num + " offset " + num * (current_page - 1);
            sql.query(option, function(err, rows) {
                if (err) {
                    callback({ errCode: -9999, message: '查询失败' + err });
                    return
                } else {
                    if (!rows[0]) {
                        callback({ errCode: 9, message: '已是最后一页了喔' });
                        return
                    }
                    let data = {
                        total_page: totalPage,
                        last_page: last_page,
                        next_page: next_page,
                        current_page: current_page,
                        result: rows
                    };
                    callback({ errCode: 0, message: '查询成功', data: data });
                    return
                }
            })
        }
    });
}
module.exports = pagination;