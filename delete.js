const dbManager = require('./db_manager');

module.exports = function(app) {
    app.get('/delete/:user_id', (req, res) => {
        dbManager.deleteUser(req.params.user_id)
        .then(user => {
            res.render('message', {message: `deleted ${user.userName}. Return home to see.`});
        })
        .catch(err => {
            res.render('message', {message: err});
        })
    })
}