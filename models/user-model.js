const mongoose     = require('mongoose');

const Schema       = mongoose.Schema;
const Trip         = require('./trip-model.js');


const userSchema = new Schema (
    {
        name: { type: String },
        profilePic: { type: String },

        username: { type: String },
        encryptedPass: { type: String },

        facebookID: { type: String },
    },
    {
        timestamps: true
    }

);

const User = mongoose.model('users', userSchema);

module.exports = User;
