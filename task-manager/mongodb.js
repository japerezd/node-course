const { MongoClient, ObjectId } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

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

    // TODO: 2. update in Mac
    // db.collection('users').updateOne(
    //   { _id: ObjectId('62afa1304a24cab46f200110') },
    //   {
    //     $set: {
    //       name: 'Gice',
    //     },
    //   }
    // ).then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    db.collection('tasks').updateMany({ completed: false }, { $set: { completed: true } })
    .then(result => { console.log(result) })
    .catch(error => console.log(error))

    // db.collection('users').findOne({ _id: ObjectId('62afcb96e76ed2d32f8762c2') }, (error, user) => {
    //   if (error) {
    //     return console.log('Unable to fetch');
    //   }

    //   console.log(user);
    // });

    // returns a cursor
    // db.collection('users').find({ age: 28 }).toArray((error, users) => {
    //   console.log(users);
    // });

    // db.collection('tasks').findOne({ _id: ObjectId('62afa61557a05cc4f31f9143')}, (error, task) => {
    //   if (error) {
    //     return console.log('Unable to find task!');
    //   }
    //   console.log(task);
    // })

    // db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
    //   console.log(tasks);
    // })

    // TODO: 1. to execute the following in Mac
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
