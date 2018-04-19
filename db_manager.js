const mongoose = require('mongoose');
const Schema = mongoose.Schema;

class dbManager {
    // public methods
    addUser(userObj) {
        // returns a promise with the either a success message or an error message
    }
    editUser(userID, property, value) {
        // returns a promise with either a success or error
    }
    deleteUser(userID) {
        // returns a promise with either a success or error
    }
    parse() {
        // returns a promise with all of the users or error
    }
}