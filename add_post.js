const DataManager = require('./data_manager');

module.exports = function(app) {
    app.post('/add', (req, res) => {
        const user = DataManager.generateUser(req.body.name, req.body.email, req.body.age);
        DataManager.addUser(user)
        .then((err) => {
            if (err) res.render('message', {message: err.message});
            res.render('message', {message: 'added User'})
        })
    });
}