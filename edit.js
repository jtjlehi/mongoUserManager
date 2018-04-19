const dataManager = require('./data_manager');

module.exports = function(app) {
    app.get('/edit/:user_id', (req, res) => {
        dataManager.parse()
        .then((users) => users.map((user) => user.userData))
        .then(users => {
            const user = users.find(user => {
                return user.id == req.params.user_id;
            });
            return user;
        })
        .then(user => {
            if (user === undefined) {
                res.end('User not found');
            }
            else {
                res.render('edit', user);
            }
        });
    });
}
