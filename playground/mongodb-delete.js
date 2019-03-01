/* --------------------------------------------------------------------------------------------- */        
/*
    when we run this script, with 'node playground/mongodb-delete.js', we get...
    ... CommandResult object 
        .result.n = 3, showing 3 deletions
        .result.ok = 1, showing ok

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

/* --------------------------------------------------------------------------------------------- */        

// Create dummy data - three new tasks
        for(var i=0; i<=3; i++){
            Todos.insertOne({
                'text':'Have life',
                'completed': false
            }, (err, result) => {
                if(err) { return console.log('Unable to insert Todo',err); }
                // console.log(JSON.stringify(result, undefined, 2));
                console.log(`Inserted new Todo: ${result.ops[0].text} - ${result.ops[0].completed}`);
            });
        }

/* --------------------------------------------------------------------------------------------- */        

// deleteOne

        Todos.deleteOne({ 'text':'Have life' }).then((result) => {
            // console.log(JSON.stringify(result, undefined, 2));
            if(result.result.ok === 1){
                console.log(`${result.result.n} Todos deleted with 'deleteOne', having text = 'Have Life'.`);    
            } else {
                console.log('All gone a bit Pete Tong', result);
            }
        });


// findOneAndDelete - By value

        Todos.findOneAndDelete({ 'text':'Have life' }).then((result) => {
            // console.log(JSON.stringify(result, undefined, 2));
            console.log(`${result.lastErrorObject.n} Todos deleted with 'findOneAndDelete', having text = 'Have Life'.`);
            console.log(`... id:${result.value._id} text:${result.value.text} status:${result.value.completed}`);
        });

// deleteMany

        Todos.deleteMany({ 'text':'Have life' }).then((result) => {
            // console.log(JSON.stringify(result, undefined, 2));
            if(result.result.ok === 1){
                console.log(`${result.result.n} Todos deleted with 'deleteMany', having text = 'Have Life'.`);    
            } else {
                console.log('All gone a bit Pete Tong', result);
            }
        });

// findOneAndDelete - By id, with re-instate

        Todos.findOneAndDelete({ '_id': new ObjectId("5c790d6159ed78379cb12715") }).then((err, result) => {
            // console.log(JSON.stringify(result, undefined, 2));
            if(err){ 
                // console.log(err);
                console.log(`${err.lastErrorObject.n} Todos deleted with 'findOneAndDelete', having _id = 'ObjectId("5c78fff0f2bd270d412422ac")'.`);
            } else {
                console.log(`${result.lastErrorObject.n} Todos deleted with 'findOneAndDelete', having _id = 'ObjectId("5c78fff0f2bd270d412422ac")'.`);
                console.log(`... id:${result.value._id} text:${result.value.text} status:${result.value.completed}`);
            }
        });

/*        
        Todos.insertOne({
            'text':'Take Claudia to School',
            'completed': false
        }, (err, result) => {
            if(err) { return console.log('Unable to insert Todo',err); }
            // console.log(JSON.stringify(result, undefined, 2));
            console.log(`Inserted new Todo: ${result.ops[0].text} - ${result.ops[0].completed}`);
        });
*/

/* --------------------------------------------------------------------------------------------- */        

// find - all Todos that are incomplete

        Todos
        .find({ 'completed' : false })
        .sort( {'completed': -1} ) // true first
        .toArray()
        .then((docs) => {
            console.log('Remaining Todos');
            // console.log(JSON.stringify(docs, undefined, 2));
            docs.forEach((element) => {
                console.log(`... ${element.text} - ${element.completed}`);
            })
        }, (err) => {
            console.log('Unable to find Users', err);
        });

/* --------------------------------------------------------------------------------------------- */        
        client.close();
    });