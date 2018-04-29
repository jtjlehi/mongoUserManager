const mongoose = require('mongoose');
const Schema = mongoose.Schema;

class DbManager {
    constructor() {
        this.userSchema = new Schema({
            firstName: {
                type: String,
                required: true,
                index: true
            },
            lastName: {
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
            return newUser;
        })
        .then(newUser => {
            mongoose.disconnect()
            return newUser;
        })
    }
    editUser(userID, updateObj) {
        // returns a promise with either a success or error
        return this._getObjectId(userID)
        // find the user using the userId cast to objectId
        .then(uid => this.User.findById(uid))
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
        return this._getObjectId(userID)
        .then(uid => new Promise((resolve, reject) => {
            // find the user by the uid and remove, then do the callback.
            this.User.findByIdAndRemove(uid, (err, user) => {
                // disconnect first
                mongoose.disconnect();
                // check if the user was found
                if (!user) reject(new Error('User not found'));
                // check if any other errors occurred
                if (err) reject(err);
                // send user
                resolve(user);
            })
        }))
        .catch(err => {
            // log error on backend
            console.log(err);
            // send error for user feedback.
            throw err;
        })
            
    }
    findUser(userId) {
        return this._getObjectId(userId)
        .then((uid) => this.User.findById(uid))
        .catch(err => {
            console.log(err);
            throw err;
        }) 
        .then(user => {
            mongoose.disconnect();
            return user;
        });
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
    _getObjectId(userId) {
        // connects to the database
        // returns a promise with the userId cast to an ObjectId, or throws an error
        return this._connect()
        .then(() => {
            userId = typeof userId === 'string' ? userId 
                : typeof userId.toHexString() == 'string' ? userId.toHexString() : undefined;
            // check if the userID is the correct length, and cast it to ObjectId
            if (!userId) throw new Error('User ID must be a string or a ObjectId');
            if (userId.length !== 24) throw new Error('User ID isn\'t the right length');
            return mongoose.Types.ObjectId(userId);
        })
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
// dbManager.editUser('5ae4d8272b0e69d0dbee62e7', {userName: 'jtjlehi'});
// dbManager.deleteUser('5ae4f00ae5bdead779d8625b');

module.exports = dbManager;