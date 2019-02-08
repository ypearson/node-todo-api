const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) =>
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log("ok");
        }

        // db.collection('Todos').find().toArray().then(
        // db.collection('Todos').find({completed:false}).toArray().then(
        db.collection('Todos').find
        (
            {
                _id: new ObjectID('5be5a1419b77db5325a7cf86')
            }
        )
        .toArray()
        .then(
        docs =>
        {
            console.log("fetching...");
            console.log(JSON.stringify(docs,undefined,2));
        },
        err =>
        {
            console.log("unable to fetch data",err);
        });


        db.collection('Todos')
        .find()
        .count()
        .then(
        count =>
        {
            console.log("count",count);
        },
        err =>
        {
            console.log("unable to fetch data",err);
        });

        db.collection('Users').find
        (
            {
                name:'Jen'
            }
        ) // Returns a cursor (pointer to result)
        .toArray() // returns a promise
        .then(
        docs =>
        {
            console.log("fetching...");
            console.log(JSON.stringify(docs,undefined,2));
        },
        err =>
        {
            console.log("unable to fetch data",err);
        });


        // db.close()
    });
