const mysql = require('mysql');

let pool = mysql.createPool({
    host: "47.107.105.199",
    user: "root",
    password: "Lss971128@#",
    database: "tank_db"
});

function query(sql, callback) {
    pool.getConnection(function(err, connection) {
        connection.query(sql, function(err, rows) {
            callback(err, rows);
            connection.release(); //释放链接
        });
    });
}

exports.query = query;