const dbManager = require('./db_manager');

function clearDb() {
    return dbManager.parse()
    .then(users => {
        console.log('users: ', users.length)
        return users;
    })
    .then(users => {
        if (users.length === 0) {
            return dbManager.parse()
            .then(users => {console.log('clear complete')});
        }
        console.log('user to be deleted: ', users[0].id);
        console.log(typeof users[0].id);
        return dbManager.deleteUser(users[0]._id)
        .then(user => clearDb());
    })
}

clearDb();