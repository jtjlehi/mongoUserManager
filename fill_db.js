const dbManager = require('./db_manager');

const localUsers = [
    {
        userName: 'jared',
        email: 'jtjlehi@gmail.com',
        age: 17
    },
    {
        userName: 'bob',
        email: 'bob.ross@painting.com',
        age: 50
    },
    {
        userName: 'sam, eater of world',
        email: 'editor@tomato.com',
        age: 18
    },
    {
        userName: 'thomas',
        email: 'thomas@gmail.com',
        age: 17
    },
    {
        userName: 'curtis',
        email: 'cdalton@gmail.com',
        age: 17
    },
    {
        userName: 'john',
        email: 'john.doe@unknown.com',
        age: 44
    },
    {
        userName: 'steve',
        email: 'steve@minecraft.com',
        age: 8
    },
    {
        userName: 'ryan',
        email: 'ryan@woke.com',
        age: 18
    },
    {
        userName: 'nolen',
        email: 'nolenjs@library.com',
        age: 18
    },
    {
        userName: 'zoe',
        email: 'valley.girl@af.com',
        age: 18
    },
]

async function addUser(userIndex) {
    const user = localUsers[userIndex];
    if (!user) {
        console.log('finished adding users');
    } else {
        console.log('adding user: ', user);
        const message = await dbManager.addUser(user)
        console.log(message);
        return addUser(userIndex + 1);
    }
}
addUser(0);