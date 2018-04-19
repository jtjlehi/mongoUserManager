const fs = require('fs');

class DataManager {
    parse() {
        return new Promise((resolve, reject) => {
            fs.readFile('users-data.txt', {encoding: 'utf8'}, (err, data) => {
                if (err) throw err;
                let location = 0;
                const users = data.split('\n')
                    .filter(userString => userString !== "")
                    .map((userString, index) => {
                        let start = location;
                        let end = location + userString.length;
                        location = end;
                        return {
                            userData: JSON.parse(userString),
                            index: {
                                start: start,
                                end: end
                            }
                        }
                    });
                resolve(users);
            });
        })
    }
    addUser(user) {
        return this.parse()
        .then((users) => {
            if (users.filter(existingUser => existingUser.userData.id === user.id).length !== 0) {
                return new Error('Whoops! That user already exists.');
            }
            fs.appendFile('./users-data.txt', `${JSON.stringify(user)}\n`, (err) => {
                if (err) return new Error('Sorry, Problem occurred while saving data, we will do everything we can to fix it.');
                return 'User added';
            });
        })
    }
    generateUser(name, email, age) {
        const id = this.idGenerator(name + email + age);
        return {
            id: id,
            name: name,
            email: email,
            age: age
        }
    }
    idGenerator(string) {
        const length = string.length;
        let hash = 0;
        if (length === 0) return hash;
        for (let i = 0; i < length; i ++) {
            let char = string.charCodeAt(i);
            hash = ((hash<<5)-hash)+char;
            hash = hash & hash;
        }
        return hash;
    }
    replaceUser(userId, newUser) {
        const filePath = './users-data.txt';
        return this.parse()
        .then(users => {
            const user = users.find(user => user.userData.id == userId);
            if (user === undefined) throw new Error('User undefined');
            return {start: user.index.start, end: user.index.end};
        })
        .then((indexes) => {
            return new Promise((resolve, reject) => {
                fs.readFile(filePath, {encoding: 'utf8'}, (err, data) => {
                    if (err) reject(err);
                    console.log('indexes: ', indexes);
                    resolve({
                        beforeUser: data.substring(0, indexes.start),
                        afterUser: data.substring(indexes.end + 1)
                    });
                });
            })
        })
        .then((file) => {
            const newFile = file.beforeUser + newUser + file.afterUser;
            return new Promise((resolve, reject) => {
                fs.truncate(filePath, (err) => {
                    if (err) reject(err);
                    resolve(newFile);
                });
            });
        })
        .then(newFile => {
            return new Promise((resolve, reject) => {
                fs.writeFile(filePath, newFile, (err) => {
                    if (err) reject(err);
                    resolve();
                });
            });
        });
    }
}

module.exports = new DataManager();