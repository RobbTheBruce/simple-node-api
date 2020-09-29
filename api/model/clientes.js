const mongoose = require('mongoose');

module.exports = app => {
    const model = {};

    const clienteSchema = new mongoose.Schema(
        {
            nome: {
                type: String,
                required: true
            },
            idade: {
                type: Number,
                required: true
            }
        }
    );

    const clientes = mongoose.model('clientes', clienteSchema);


    model.get = async (params) => {
        // executa o get
        return new Promise(async (resolve, reject) => {
            await clientes.find({}).then(result => {
                resolve(result);
            }).catch(error => reject(error));
        });
    };

    model.post = async (data) => {
        // executa o post
        delete data['id'];
        return new Promise(async (resolve, reject) => {
            await clientes.create(data).then(result => {
                resolve(result);
            }).catch(error => reject(error));
        });
    };

    model.put = async (data) => {
        // executa o put
        let id = data['_id'];
        delete data['id'];

        return new Promise(async (resolve, reject) => {
            if (!id) reject({ error: "Id não informado." });

            await clientes.updateOne({ _id: id }, data).then(result => {
                resolve(result);
            }).catch(error => reject(error));
        });
    };

    model.delete = (params) => {
        // executa o delete
        return new Promise(async (resolve, reject) => {
            if (!params['clienteId']) reject({ error: "Id não informado." });

            await clientes.deleteOne(params['clienteId']).then(result => {
                resolve(result);
            }).catch(error => reject(error));
        });
    };

    return model;
};