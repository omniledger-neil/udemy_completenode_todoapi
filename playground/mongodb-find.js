const {MongoClient, ObjectID} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true }, (err,client) => {
    if(err) {
        return console.log('Unable to connect to MongoDb');
    }

console.log('Connected to MongoDb');
const db = client.db('TodoApp');

// Cursor documentation : http://mongodb.github.io/node-mongodb-native/3.1/api/Cursor.html

/* --------------------------------------------------------------------------------------------- */        
// find users with a specific name

db.collection('Users')
.find({'name': /.*Carlos.*/})
/*
// possible cursor methods
.find({ 'completed' : false })
.find({ '_id' : new ObjectID('5c7803072cd88133dccd4dc1') })
*/    

// output count of records
/*
.count()
.then((count) => {
    console.log(`Todos count:${count}`);
}, (err) => {
    console.log('Unable to find Todos', err);
})
*/

// output data in an array
.sort( {'completed': -1} ) // true first
.toArray()
.then((docs) => {
    console.log('Users');
    console.log(JSON.stringify(docs, undefined, 2));
}, (err) => {
    console.log('Unable to find Users', err);
})

;

/* --------------------------------------------------------------------------------------------- */        
// find Todos that are 'complete'

db.collection('Todos')
.find({ 'completed' : true })
/*
// possible cursor methods
.find({})
.find({ 'completed' : false })
.find({ '_id' : new ObjectID('5c7803072cd88133dccd4dc1') })
*/    

// output count of records
/*
.count()
.then((count) => {
    console.log(`Todos count:${count}`);
}, (err) => {
    console.log('Unable to find Todos', err);
})
*/

// output data in an array
.sort( {'completed': -1} ) // true first
.toArray()
.then((docs) => {
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));
}, (err) => {
    console.log('Unable to find Todos', err);
})

;

/* --------------------------------------------------------------------------------------------- */        
    client.close();
});