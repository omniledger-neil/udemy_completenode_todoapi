/*
    Mongoose
    npm i mongoose@5.4.16 --save
    // npm i bluebird@3.5.3 --save

    https://mongoosejs.com/docs/validation.html
    https://mongoosejs.com/docs/guide.html
*/
const mongoose = require('mongoose');
const mSchema = mongoose.schema;
// mongoose.Promise = require('bluebird');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/todos', {useNewUrlParser: true});

// schema
/*
const schTodo = mSchema({
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean
    },
    completedAt: {
        type: Number
    }
});
const mdlTodo = mongoose.model('Todo',schTodo,'todos');
*/

// models
var User = mongoose.model('User',
    {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
        },
    password: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
        },
    firstname: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
        },
    lastname: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
        }
    }
);

var Todo = mongoose.model('Todo',
    {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
        },
    completed: {
        type: Boolean,
        default: false
        },
    completedAt: {
        type: Number,
        default: null
        }
    }
);

// new Todo from model
/*
var oTodo = new Todo(
    { 
        'text': '   whitespace guff   ' 
    }
    );
oTodo.save().then(
    (newTodo) => {
        console.log('created new Todo',JSON.stringify(newTodo,undefined,2));
        }, 
    (err) => {
        console.log('unable to create new Todo',err);
        }
);
*/

// new User from model
var oUser = new User({ 
    'email': 'neil@omniledger.co.uk    ',
    'password': 'password',
    'firstname': 'Neil',
    'lastname': 'Stackman'
});
oUser.save().then(
    (newUser) => {
        console.log('created new User',JSON.stringify(newUser,undefined,2));
        }, 
    (err) => {
        var arrMessage = err.message.split(',');
        console.log(err.name, JSON.stringify(arrMessage,undefined,2))
        // console.log('unable to create new User',err.errors[0]);
        }
);


// object
/*
const User = mongoose.model('User', {
    'name': {'type': String}
    ,'age': {'type': Number}
    ,'location': {'type': String}
})
*/

/*
const schUsers = mongoose.model('users',
    new mongoose.Schema({
    'name': String
    ,'age': Number
    ,'location': String
    })
);
*/