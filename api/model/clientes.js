var db = require('../../config/db')();

module.exports = app => {
    const model = {};

    model.getMysql = async (params) => {
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

    model.getMongo = async (params) => {
        // executa o get
        return new Promise((resolve, reject) => {
            db.mongo().then(conn => {
                conn.collection("customers").find({}).toArray((e, docs) => {
                    if (e) { reject(e); }
                    resolve(docs);
                });
            }).catch(error => reject(error))
        });
    };

    model.postMysql = async (data) => {
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

    model.postMongo = async (data) => {
        return new Promise((resolve, reject) => {
            db.mongo().then(conn => {
                conn.collection('customers').insertOne(data, (err, result) => {
                    if (err)
                        reject(err);

                    resolve(result);
                });
            }).catch(error => reject(error));
        });
    };

    model.putMysql = async (data) => {
        // executa o put
        let keys = Object.keys(data);
        let id = data['id'];
        delete data['id'];

        return new Promise((resolve, reject) => {
            if (!id)
                reject({ error: "Id não informado." });

            db.query('update clientes set ' + Object.keys(data).map(key => { return key + "='" + data[key] + "'" }).toString() + ' where id=' + id, [], (resp) => {
                resolve(resp);
            }, error => {
                reject(error);
            });
        });
    };

    model.putMongo = async (data) => {
        // executa o put
        let id = data['id'];
        delete data['id'];

        return new Promise((resolve, reject) => {
            if (!id)
                reject({ error: "Id não informado." });

            db.mongo().then(conn => {
                conn.collection('customers').updateOne({ _id: id }, { $set: data }, { upsert: true }, (err, result) => {
                    if (err)
                        reject(err);

                    resolve(result);
                });
            }).catch(error => reject(error));
        });
    };

    model.deleteMysql = (params) => {
        // executa o delete
        return new Promise((resolve, reject) => {
            if (!params['clienteId'])
                reject({ error: "Id não informado." });

            let query = "delete from clientes where id=? ";

            db.query(query, [params['clienteId']], (resp) => {
                resolve(resp);
            }, error => {
                reject(error);
            });
        });
    };

    model.deleteMongo = (params) => {
        // executa o delete
        return new Promise((resolve, reject) => {
            if (!params['clienteId'])
                reject({ error: "Id não informado." });

            let query = "delete from clientes where id=? ";

            db.mongo().then(conn => {
                conn.collection('customers').deleteOne({ _id: params['clienteId'] }, (err, result) => {
                    if (err)
                        reject(err);

                    resolve(result);
                });
            }).catch(error => reject(error));
        });
    };

    return model;
};