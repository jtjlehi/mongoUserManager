const dbManager = require('./db_manager');

module.exports = function(app) {
    app.post('/edit/:user_id', (req, res) => {
        const updatedUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            age: req.body.age
        }
        dbManager.editUser(req.params.user_id, updatedUser)
        .then(user => {
            if (user) res.render('message', {message: `Edited ${user.firstName} ${user.lastName}. Return home to view.`})
        })
        .catch(err => {
            res.render('message', {message: err});
        })
    });
}