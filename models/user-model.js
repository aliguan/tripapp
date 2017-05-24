const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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

const User = mongoose.model('User', userSchema);

module.exports = User;
