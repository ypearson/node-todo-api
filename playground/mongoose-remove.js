const {ObjectId} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo}     = require('./../server/models/todo');
const {Users}    = require('./../server/models/user');


// remove all
// Todo.remove({}).then((todo) => {
//     console.log(todo);
//  });

// Returns the deleted record
// Todo.findOneAndRemove

// Todo.findbyIdAndRemove('5beaf5695c88738d56a5a645').then((todo) =>
// {
//     console.log(todo);
// });

Todo.findOneAndRemove({_id:'5beaf5695c88738d56a5a645'}).then((todo) =>
{
    console.log(todo);
});
