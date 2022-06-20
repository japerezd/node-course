const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

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
    // db.collection('users').insertOne({
    //   name: 'Beto',
    //   age: 24,
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

    db.collection('tasks').insertMany(
      [
        {
          description: 'Insert in tasks collection',
          completed: true,
        },
        {
          description: 'Get the food',
          completed: false,
        },
        {
          description: 'Complete nodejs training',
          completed: false,
        },
      ],
      (error, result) => {
        if (error) {
          return console.log('Unable to insert tasks!');
        }

        console.log(result.ops);
      }
    );
  }
);
