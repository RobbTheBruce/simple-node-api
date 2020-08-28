var mysql = require('mysql');
var dbConfig = require('./default.json');

module.exports = () => {
    var db = {};
    db.query = function (sql, data, callback, error) {
        var _err;
        var _rows;
        var conn = mysql.createConnection(dbConfig.bd);
        conn.connect();
        conn.query(sql, data, function (err, rows) {
            _err = err;
            _rows = rows;
        });
        conn.end(function () {
            (_rows) ? callback(_rows) : error(_err);
        });
    };

    return db;
};