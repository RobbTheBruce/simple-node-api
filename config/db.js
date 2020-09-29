var mysql = require('mysql');
var dbConfig = require('./default.json');
const mongoClient = require("mongodb").MongoClient;

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

    db.mongo = async () => {
        return new Promise((resolve, reject) => {
            mongoClient.connect("mongodb://127.0.0.1:27017", { useUnifiedTopology: true })
                .then(conn => {
                    console.log("Connected successfully to server");
                    resolve(conn.db("workshoptdc"));
                })
                .catch(err => reject(err));
        });
    }

    return db;
};