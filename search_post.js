const dbManager = require('./db_manager');

module.exports = function(app) {
    app.post('/search', (req, res) => {
        const searchObj = {};
        searchObj[req.body.searchProperty] = {
            $regex: req.body.search,
            $options: 'i'
        }
        dbManager.parse({}, searchObj)
        .then((users) => {
            res.render('users', {
                users: users
            });
        })
        .catch((err) => {
            throw err;
        });
    });
}