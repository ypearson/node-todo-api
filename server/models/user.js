const mongoose  = require('mongoose');
const validator = require('validator');
const jwt       = require('jsonwebtoken');
const _         = require('lodash');

let UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message:'{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function () {
    let user   = this;
    let access = 'auth';
    let token  =  jwt.sign({_id: user._id.toHexString(), access},'abc123').toString();
    // user.tokens.push({access, token});
    user.tokens = user.tokens.concat([{access,token}]);
    console.log(user);
    user.save().then(() => {
        return token; // pass it back to user
    }).catch((e) => {
       console.log(e);
    });
};

let Users = mongoose.model('users', UserSchema);

// Users.create(
//     { name: 'Star Wars',
//       email: "bob@gmail.com"})
// .then( (user) =>
//  {

//     console.log("Added:" , user);
//  });

Users.find().then( (user) =>
 {
    console.log("Found:" , user);
 });

module.exports={Users};