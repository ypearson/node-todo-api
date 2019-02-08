const mongoose  = require('mongoose');
const validator = require('validator');
const jwt       = require('jsonwebtoken');
const bcrypt    = require('bcryptjs');
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
    return user.save().then(() => {
        return token; // pass it back to user
    }).catch((e) => {
       console.log(e);
    });
};

UserSchema.statics.findByToken = function(token) {

    let User = this;
    let decode;

    try {
        decoded = jwt.verify(token, 'abc123');
        console.log('Found token in user collection.');
    } catch (e) {
        // return new Promise((resolve, reject) => {
        //     reject();
        // });
        return Promise.reject('Token not found!');
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

UserSchema.pre('save', function (next) {
    var user = this;

    console.log('user.isModified("password")', user.isModified('password'));

    if(user.isModified('password')) {
        bcrypt.genSalt(12, (err,salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                console.log('bcrypt hash', hash);
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

let User = mongoose.model('users', UserSchema);

// Users.create(
//     { name: 'Star Wars',
//       email: "bob@gmail.com"})
// .then( (user) =>
//  {

//     console.log("Added:" , user);
//  });

User.find().then( (user) =>
 {
    console.log("Found:" , user);
 });

module.exports={User};