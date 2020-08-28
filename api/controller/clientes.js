module.exports = app => {
    const controller = {};

    controller.get = async (req, res) => {
        // executa o get
        await app.model.clientes.get(req.params).then(data => {
            res.status(200).json(data);
        }).catch(error => {
            res.status(400).json(error);
        });
    };

    controller.post = async (req, res) => {
        // executa o post
        await app.model.clientes.post(req.body).then(data => {
            res.status(200).json(data);
        }).catch(error => {
            res.status(400).json(error);
        });
    };

    controller.put = async (req, res) => {
        // executa o put
        await app.model.clientes.put(req.body).then(data => {
            res.status(200).json(data);
        }).catch(error => {
            res.status(400).json(error);
        });
    };

    controller.delete = async (req, res) => {
        // executa o delete
        await app.model.clientes.delete(req.params).then(data => {
            res.status(200).json(data);
        }).catch(error => {
            res.status(400).json(error);
        });
    };

    return controller;
};