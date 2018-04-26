const mongoose = require('mongoose');
const Schema = mongoose.Schema;

class DbManager {
    constructor() {
        this.userSchema = new Schema({
            userName: {
                type: String,
                required: true,
                index: true
            },
            email: {
                type: String,
                required: true,
                index: true
            },
            age: {
                type: Number,
                required: true
            }
        });
        this.User = mongoose.model('User', this.userSchema);
    }
    // public methods
    addUser(userObj) {
        // returns a promise with the either a success message or an error message
        return this._connect()
        .then(mongoose => this.User.create(userObj))
        .then((newUser, err) => {
            if (err) throw err;
            return `added new user: ${newUser}`;
        })
    }
    editUser(userID, property, value) {
        // returns a promise with either a success or error
    }
    deleteUser(userID) {
        // returns a promise with either a success or error
    }
    parse(sortObj) {
        // returns a promise with all of the users or error
        return this._connect()
            .then(() => this.User.find({})
                .sort(sortObj)
            )
            .then((users) => {
                mongoose.disconnect();
                return users;
            })
    }
    // private
    _connect() {
        // returns a promise for when the server connects
        return mongoose.connect('mongodb://localhost/users');
    }
}

const dbManager = new DbManager();
// dbManager._connect().then(() => {}, (err) => {
//     throw 'did not connect to db';
// })
// .then(() => {
//     mongoose.disconnect();
// })
// .catch((err) => {
//     console.log(err)
// });
// dbManager.addUser({userName: 'jtjlehi', email: 'jtjlehi@gmail.com', age: 6})
// .then(success => {
//     console.log(success);
// })
// .catch(err => {
//     console.log('error has occurred');
//     console.log(err);
// })
// .then(() => dbManager.parse({age: 1}))
// .then((users) => {console.log(users)});