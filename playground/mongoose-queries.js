const {ObjectId} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo}     = require('./../server/models/todo');
const {Users}    = require('./../server/models/user');

 // "_id" : ObjectId("5be9cca190842eec46fa4728"),

 // var id = "5be9ce46d8f784764a4f2deb"
  var id = "5bea0d5db225c52e1b463465";

 if(!ObjectId.isValid(id)){
    console.log("id not valid");
 }

 Todo.find({
    _id:id
 }).then((todos) => {
    console.log('todos', todos);
 });


 Todo.findOne({
    _id:id
 }).then((todos) => {
    console.log('todos', todos);
 });


Todo.findById(id).then((todo)=>{
    if(!todo)
    {
        return console.log('id not found');
    }
    console.log("find by Id", todo);
}).catch((e)=>console.log(e));

Users.findById(id).then((user)=>{
    if(!user)
    {
        Users.find({}).then((user)=>{console.log("Users:", user);});
        return console.log('User: id not found');

    }
    console.log("find by Id", user);
}).catch((e)=>console.log(e));