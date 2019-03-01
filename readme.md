# udemy_completenode_todoapi
# Author: Neil Stackman
# Date: 2019.03.01

Start off by installing mongodb from ...
https://www.mongodb.com/dr/fastdl.mongodb.org/win32/mongodb-win32-x86_64-2008plus-ssl-4.0.6-signed.msi/download

Download a GUI tool like Robomongo (we'll skip mongodb compass for now)
https://robomongo.org/download

Create a data folder... C:\Users\neil\udemy-mongo

In command prompt, start the mongo server and point it at the data folder...
    cd C:\Program Files\MongoDB\Server\4.0\bin
    mongod.exe --dbpath C:\Users\neil\udemy-mongo
... you should get 'waiting for connections on port 27017' out of that command.

In a different command prompt, start a command shell to talk to mongoDb
    cd C:\Program Files\MongoDB\Server\4.0\bin
    mongo.exe
... you should get 'connecting to: mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb'

Check interaction with the database by creating a new collection 'Todos' with a single entry...
    db.Todos.insert({text:'Create new Node course'})
... read the entry we have created
    db.Todos.find()
... result is { "_id" : ObjectId("5c77f93c206389ebded890ca"), "text" : "Create new Node course" }

Check that robomongo is installed correctly by setting up a connection to localhost:27017
... the default connection to mongoDb

Remember SQL Table/Row/Column = NoSQL Collection/Document/Field

Git Repository
cd C:\Users\neil\Udemy\Complete_Node\node-todo-api>
git init
git status
... create a .gitignore file with contents 'node_modules/'
git add .
git commit -m 'Initial Commit'
... create a new repository in github
git remote add origin https://github.com/omniledger-neil/udemy_completenode_todoapi.git
git push -u origin master