//require modules for our user model
let mongoose = require('mongoose');
let Schema = mongoose.Schema; //alias for mongoose schemea
let passportLocalMongoose = require('passport-local-mongoose');

let UserSchema = new Schema({
    username: {
        type: String,
        default: '',
        trim: true,
        required: 'Username is required'
    },
   /* password: {
        type: String,
        default: '',
        trim: true,
        required: 'Password is required'
    }, */
    email:{
        type: String,
        default: '',
        trim: true,
        required: 'Email is required'
    },
    displayName:{
        type: String,
        default: '',
        trim: true,
        required: 'Display Name is required'
    },
    created:{
        type: Date,
        default: Date.now
    },
    updated:{
        type: Date,
        default: Date.now
    }
},
{
    collection: "users"
});

let options = ({missingPasswordError: "Wrong Password"});

UserSchema.plugin(passportLocalMongoose, options);

exports.User = mongoose.model('User', UserSchema);