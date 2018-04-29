const dbManager = require('./db_manager');

module.exports = function(app) {
    app.get('/users', (req, res) => {
        res.redirect('/')
    });
    app.get('/', (req, res) => {
        dbManager.parse()
        .then((users) => {
            res.render('users', {users: users});
        })
        .catch((err) => {
            throw err;
        });
    });
}