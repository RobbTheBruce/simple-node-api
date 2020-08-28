var db = require('../../config/db')();

module.exports = app => {
    const model = {};

    model.get = async (params) => {
        // executa o get
        return new Promise((resolve, reject) => {
            let query = "select * from clientes";
            query += (params['clienteId']) ? " where id=? " : "";

            db.query(query, [Object.values(params)], (resp) => {
                resolve(resp);
            }, error => {
                reject(error);
            });
        });
    };

    model.post = async (data) => {
        // executa o post
        delete data['id'];
        let keys = Object.keys(data);
        return new Promise((resolve, reject) => {
            db.query('insert into clientes(' + keys.join(',') + ') values ("' + Object.values(data).join('","') + '")', [], (resp) => {
                resolve(resp);
            }, error => {
                reject(error);
            });
        });
    };

    model.put = async (data) => {
        // executa o put
        let keys = Object.keys(data);
        let id = data['id'];
        delete data['id'];

        return new Promise((resolve, reject) => {
            if (!id) {
                reject({ error: "Id não informado." });
            }
            db.query('update clientes set ' + Object.keys(data).map(key => { return key + "='" + data[key] + "'" }).toString() + ' where id=' + id, [], (resp) => {
                resolve(resp);
            }, error => {
                reject(error);
            });
        });
    };

    model.delete = (params) => {
        // executa o delete
        return new Promise((resolve, reject) => {
            if (!params['clienteId']) {
                reject({ error: "Id não informado." });
            }

            let query = "delete from clientes where id=? ";

            db.query(query, [params['clienteId']], (resp) => {
                resolve(resp);
            }, error => {
                reject(error);
            });
        });
    };

    return model;
};