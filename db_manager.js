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
        .then(message => {
            mongoose.disconnect()
            return message;
        })
    }
    editUser(userID, updateObj) {
        // returns a promise with either a success or error
        return this._connect()
        .then(() => {
            // check if the userID is the correct length, and cast it to ObjectId
            if (userID.length !== 24) throw new Error('User ID isn\'t the right length');
            const uid = mongoose.Types.ObjectId(userID);
            // search for user by id
            return this.User.findById(uid);
        })
        .then((user) => {
            if (!user) throw new Error('user not found');
            // reference to old user json for comparison
            const oldUser = JSON.stringify(user.toObject());
            user.set(updateObj)
            // reference to new user json for comparison
            const userJSON = JSON.stringify(user.toObject());
            // compare if the old user and new user are the same
            if (userJSON == oldUser) throw new Error('No change was made');
            // asynchronously save the new user.
            return user.save();
        })
        // log error on server so I can see it.
        .catch((err) => {
            console.log('an error occurred: ', err);
            mongoose.disconnect();
            throw err;
        })
        // handle error by sending it to the function consumer
        .then((user) => {
            mongoose.disconnect();
            return user;
        })
    }
    deleteUser(userID) {
        // returns a promise with either a success or error
    }
    parse(sortObj) {
        // returns a promise with all of the users or error
        return this._connect()
            .then(() => this.User.find({}).sort(sortObj))
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
dbManager.editUser('5ae4d8272b0e69d0dbee62e7', {userName: 'jtjlehi'});