// const MongoClient = require('mongodb').MongoClient;
// the next line does exactly the same as the top line
// const {MongoClient} = require('mongodb');

// ... because of Object destructuring
/* e.g. 
var user = {'name':'neil', 'age':50}
var {name} = user;
console.log(name);
*/

const {MongoClient, ObjectID} = require('mongodb');
/*
The line above has 'deconstructed' ObjectID, a 'class', from the mongodb.MongoClient module
and we can now use it locally...
*/
// var obj = new ObjectID();
// console.log(obj);

// TodoApp will be created automatically ... no need to 'create'
MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true }, (err,client) => {
// Handle error
    if(err) {
        return console.log('Unable to connect to MongoDb');
    }
    console.log('Connected to MongoDb');

    const db = client.db('TodoApp');

// Insert initial Todo
/*
    db.collection('Todos').insertOne({
        // '_id' : 123,
        'text':'First Something to do',
        'completed': false
    }, (err, result) => {
        if(err) { return console.log('Unable to insert Todo',err); }
        console.log('Inserted new Todo');
        console.log(JSON.stringify(result.ops, undefined, 2));
        console.log(result.ops[0]._id.getTimestamp());
    });
*/

// Insert initial User
/*
    db.collection('Users').insertOne({
        // '_id' : 123,
        'name':'Neil Stackman',
        'age':50,
        'location': 'Omniledger'
    }, (err, result) => {
        if(err) { return console.log('Unable to insert User',err); }
        console.log('Inserted new User');
        console.log(JSON.stringify(result.ops, undefined, 2));
    });
*/
    client.close();
});