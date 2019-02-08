const {SHA256} = require('crypto-js');
const jwt      = require('jsonwebtoken');
const bcrypt   = require('bcryptjs');

var data = {
    id: 10,
    lala:123
};

// https://jwt.io/

var token = jwt.sign(data, '123abc');
console.log(token);

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTU0OTU3MDQwMX0.KYJsHFdjaUk8sGXkVtB2mOiNytmK9kqb4gl8-aU2kYQ

token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTksImlhdCI6MTU0OTU3MDQwMX0.6tKWXPtRxsmznq1xMC-33BZRSqLAaW2rusBhxF4VQAM'

var decoded = jwt.verify(token, '123abc');
console.log('decoded', decoded);


// var message = 'I am user number 3';

// var hash = SHA256(message).toString()

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var secretSalt = 'somesecret';

// var data = {
//     id: 4
// };

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + secretSalt).toString()
// };


// // // Hacker
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();



// var resultHash = SHA256(JSON.stringify(token.data) + secretSalt).toString();
// if(resultHash === token.hash) {
//     console.log('Data was not changed');
// } else {
//     // Hack does not have the Salt string
//     console.log('Data was changed, Do not Trust');
// }



var password = '123abc!'

bcrypt.genSalt(12, (err,salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log('bcrypt hash', hash);
    });
});

var hashedPassword = '$2a$10$cLdDt8rPYrp2IkjdOsnXRO9Y3aYfzDVEz0dpA1ib9vDLeIm/xquei';

bcrypt.compare(password, hashedPassword, (err, res) => {

    if(res) {
        console.log('Password is correct.');
    } else {
        console.log('Password is NOT correct.');
    }
});

