const dbManager = require('./db_manager');

const localUsers = [
    {
        firstName: 'Jared',
        lastName: 'Writer of Code',
        email: 'jtjlehi@gmail.com',
        age: 17
    },
    {
        firstName: 'Bob',
        lastName: 'Painter of Paint',
        email: 'bob.ross@painting.com',
        age: 50
    },
    {
        firstName: 'Sam',
        lastName: 'Eater of world',
        email: 'editor@tomato.com',
        age: 18
    },
    {
        firstName: 'Thomas',
        lastName: 'Teacher of Code',
        email: 'thomas@gmail.com',
        age: 17
    },
    {
        firstName: 'Curtis',
        lastName: 'of Dalton',
        email: 'cdalton@gmail.com',
        age: 17
    },
    {
        firstName: 'John',
        lastName: 'Looser of Id',
        email: 'john.doe@unknown.com',
        age: 44
    },
    {
        firstName: 'Steve',
        lastName: 'Player of Minecraft',
        email: 'steve@minecraft.com',
        age: 8
    },
    {
        firstName: 'ryan',
        lastName: 'Gamer of games',
        email: 'ryan@woke.com',
        age: 18
    },
    {
        firstName: 'nolen',
        lastName: 'of JS',
        email: 'nolenjs@library.com',
        age: 18
    },
    {
        firstName: 'Hacker',
        lastName: 'Writer of Bugs',
        email: 'red.hat@hack.com',
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