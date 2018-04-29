const dbManager = require('./db_manager');

module.exports = function(app) {
    app.post('/add', (req, res) => {
        dbManager.addUser({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            age: req.body.age
        })
        .then((user) => {
            res.render('message',  {message: `Added ${user.firstName} ${user.lastName}. Return home to view them.`});
        })
        .catch(err => {
            res.render('message', err);
        })
    });
}