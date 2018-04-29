const dbManager = require('./db_manager');

module.exports = function(app) {
    app.post('/add', (req, res) => {
        dbManager.addUser({userName: req.body.name, email: req.body.email, age: req.body.age})
        .then((message) => {
            res.render('message',  {message: 'Added new user. Return home to view them.'});
        })
        .catch(err => {
            res.render('message', err);
        })
    });
}