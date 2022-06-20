// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectId;

const { MongoClient, ObjectId } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const id = new ObjectId()
console.log(id);
console.log(id.getTimestamp());

MongoClient.connect(
  connectionURL,
  {
    useNewUrlParser: true,
  },
  (error, client) => {
    if (error) {
      return console.log('Unable to connect to database!');
    }

    const db = client.db(databaseName);
    // db.collection('users').insertOne({
    //   _id: id, // not necessary to put, but it's possible
    //   name: 'Vikram',
    //   age: 28,
    // }, (error, result) => {
    //   if (error) {
    //     return console.log('Unable to insert user!');
    //   }

    //   console.log(result.ops);
    // })

    // db.collection('users').insertMany([
    //   {
    //     name: 'Jen',
    //     age: 28
    //   },
    //   {
    //     name: 'Gunther',
    //     age: 27
    //   }
    // ], (error, result) => {
    //   if (error) {
    //     return console.log('Unable to insert documents!');
    //   }

    //   console.log(result.ops);
    // })

    // db.collection('tasks').insertMany(
    //   [
    //     {
    //       description: 'Insert in tasks collection',
    //       completed: true,
    //     },
    //     {
    //       description: 'Get the food',
    //       completed: false,
    //     },
    //     {
    //       description: 'Complete nodejs training',
    //       completed: false,
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log('Unable to insert tasks!');
    //     }

    //     console.log(result.ops);
    //   }
    // );
  }
);
