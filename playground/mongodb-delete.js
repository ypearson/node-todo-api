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

        //deleteMany

        // db.collection('Todos').deleteMany({text:'eat lunch'}).then( (result) =>
        // {
        //     console.log(result);
        // });

        // db.collection('Todos').deleteOne({text:'eat lunch'}).then( (result) =>
        // {
        //     console.log(result);
        // });

        // db.collection('Todos').findOneAndDelete({completed:false}).then((result) =>
        // {
        //     console.log(result);
        // });

        // db.collection('Users').findOneAndDelete(
        // {
        //     "_id" : new ObjectID("5be5b640ba2ba31c8b1239c3")
        // }).then((res)=>
        // {
        //     console.log(res);
        // });

        db.collection('Users').deleteMany({name:'Bob'}).then((res)=>{console.log(res);});


        // db.close()
    });
