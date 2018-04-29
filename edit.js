const dbManager = require('./db_manager');

module.exports = function(app) {
    app.get('/edit/:user_id', (req, res) => {
        dbManager.findUser(req.params.user_id)
        .then(user => {
            res.render('edit', user);
        })
        .catch(err => {
            res.render('message', {message: err});
        })
    });
}
