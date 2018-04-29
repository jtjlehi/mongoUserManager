const dbManager = require('./db_manager');

module.exports = function() {
    return dbManager.parse()
    .then(users => {
        console.log('users: ', users.length)
        return users;
    })
    .then(users => {
        if (users.length === 0) {
            console.log('clear complete');
            return 'clear complete';
        } else {
            return dbManager.deleteUser(users[0]._id)
            .then(user => module.exports());
        }
    })
}

module.exports()

