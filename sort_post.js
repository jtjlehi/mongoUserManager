const dbManager = require('./db_manager');

module.exports = function(app) {
    app.post('/sort', (req, res) => {
        const sortObj = {}
        sortObj[req.body.sortProperty] = req.body.direction;
        dbManager.parse(sortObj)
        .then((users) => {
            console.log({
                users: users,
                sortProperty: req.body.sortProperty,
                direction: req.body.direction
            })
            res.render('users', {
                users: users
            });
        })
        .catch((err) => {
            throw err;
        });
    });
}