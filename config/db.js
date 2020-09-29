var dbConfig = require('./default.json');

module.exports = () => {
    var db = {};

    return mongoose.connect(dbConfig.bd.host, { useNewUrlParser: true, useUnifiedTopology: true });
};