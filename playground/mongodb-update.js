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
    // https://docs.mongodb.com/manual/reference/method/db.collection.findOneAndUpdate/

    // https://docs.mongodb.com/manual/reference/operator/update/
    db.collection('Todos').findOneAndUpdate({
        _id:new ObjectID("5be5c04f1b5f500ab0091749")
    },
    {
        $set:{
            completed:true
        }
    },{
        returnOriginal:false
    }).then(res=>{
        console.log(res);
    });

    db.collection('Users').findOneAndUpdate({
        name:'Jen'
    },
    {
        $set:{name:'Jenny'},
        $inc:{age:10}
    },{
        returnOriginal:false
    }).then(res=>{
        console.log(res);
    });
        // db.close()
});
