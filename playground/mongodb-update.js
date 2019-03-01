/* --------------------------------------------------------------------------------------------- */        
/*
    $set, $inc          ... https://docs.mongodb.com/manual/reference/operator/update/
    findOneAndUpdate    ... https://docs.mongodb.com/manual/reference/method/db.collection.findOneAndUpdate/
*/
/* --------------------------------------------------------------------------------------------- */        
const {MongoClient, ObjectId} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp'
    ,{ useNewUrlParser: true }
    , (err,client) => {
        if(err) {
            return console.log('Unable to connect to MongoDb');
        }

        console.log('Connected to MongoDb');
        const db = client.db('TodoApp');
        
        const Todos = db.collection('Todos');
        const Users = db.collection('Users');

/* --------------------------------------------------------------------------------------------- */        
// findOneAndUpdate - By value

        Todos
        .findOneAndUpdate( 
            { '_id': new ObjectId("5c78ffdbf2bd270d412422a9") }
            , { $set: {'completed' : true } }
            , { 'returnOriginal' : false} // get updated document, not the original
        ).then((err,result) => {
            if(err){
                console.log(`${err.lastErrorObject.n} Todos updated with 'findOneAndUpdate', having _id = '5c78ffdbf2bd270d412422a9'.`);
            } else {
                // console.log(JSON.stringify(result, undefined, 2));
                console.log(`${result.lastErrorObject.n} Todos updated with 'findOneAndUpdate', having _id = '5c78ffdbf2bd270d412422a9'.`);
                console.log(`... id:${result.value._id} text:${result.value.text} status:${result.value.completed}`);
            }
        });

/* --------------------------------------------------------------------------------------------- */        

// find - all Todos that are incomplete

        Todos
        .find({ 'completed' : false })
        .sort( {'text': 1} ) // ascending
        .toArray()
        .then((docs) => {
            console.log('Remaining Todos');
            // console.log(JSON.stringify(docs, undefined, 2));
            docs.forEach((element) => {
                console.log(`... ${element.text} - ${element.completed}`);
            })
        }, (err) => {
            console.log('Unable to find Todos', err);
        });

/* --------------------------------------------------------------------------------------------- */        

// find - all Todos that are complete

        Todos
        .find({ 'completed' : true })
        .sort( {'text': 1} ) // ascending
        .toArray()
        .then((docs) => {
            console.log('Completed Todos');
            // console.log(JSON.stringify(docs, undefined, 2));
            docs.forEach((element) => {
                console.log(`... ${element.text} - ${element.completed}`);
            })
        }, (err) => {
            console.log('Unable to find Todos', err);
        });

/* --------------------------------------------------------------------------------------------- */        
// findOneAndUpdate - By id, 'Carlos Fandango' getting older by ten years

        Users
        .findOneAndUpdate( 
            { '_id': new ObjectId('5c7804ab36f06834fc842f6a') }
            , { $set: {'name' : 'Carlos Fandango Old' }, $inc: {'age' : 10 } }
            , { 'returnOriginal' : false} // get updated document, not the original
        ).then((err,result) => {
            if(err){
                console.log(`${err.lastErrorObject.n} Users updated with 'findOneAndUpdate', having _id = '5c7804ab36f06834fc842f6a'.`);
            } else {
                // console.log(JSON.stringify(result, undefined, 2));
                console.log(`${result.lastErrorObject.n} Users updated with 'findOneAndUpdate', having _id = '5c7804ab36f06834fc842f6a'.`);
                console.log(`... id:${result.value._id} name:${result.value.name} age:${result.value.age} location:${result.value.location}`);
            }
        });

/* --------------------------------------------------------------------------------------------- */        

// find - all Users

        Users
        .find({ 'location' : 'Omniledger' })
        .sort( {'age': -1} ) // descending
        .toArray()
        .then((docs) => {
            console.log('Oldest Users');
            // console.log(JSON.stringify(docs, undefined, 2));
            docs.forEach((element) => {
                console.log(`... ${element.age} - ${element.name} - ${element.location}`);
            })
        }, (err) => {
            console.log('Unable to find Users', err);
        });

/* --------------------------------------------------------------------------------------------- */        
        client.close();
    });