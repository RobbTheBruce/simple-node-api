module.exports = app => {
    const controllers = app.controller;

    app.route('/api/v1/clientes/:clienteId')
        .get(controllers.clientes.get)
        .delete(controllers.clientes.delete);

    app.route('/api/v1/clientes')
        .get(controllers.clientes.get)
        .post(controllers.clientes.post)
        .put(controllers.clientes.put);
};