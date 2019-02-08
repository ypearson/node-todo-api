// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

// var user = {name:'bob', age:'11'}
// var {name} = user;
// console.log(name);

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

        db.collection('Todos').insertOne(
        {
            text:"something to do",
            completed: false,
        },
        (err, res) =>
        {
            if(err)
            {
                console.log(err);
            }
            else
            {
                console.log(JSON.stringify(res.ops, undefined,2));
            }
        });

        db.collection("Users").insertOne(
        {
            name:'Bob',
            age:'11',
            location:'Japan'
        },
        (err,res)=>
        {
            if(err)
            {
                console(err);
            }
            else
            {
                console.log(JSON.stringify(res.ops[0]._id,undefined,2));
                console.log(JSON.stringify(res.ops[0]._id.getTimestamp(),undefined,2));
            }
        });

        db.close()
    });
