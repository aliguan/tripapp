const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TripsSchema =  new Schema ({
    name: String,
    authorId: { type: Schema.Types.ObjectId },
    location: String,
    content: String,
});

const userSchema = new Schema (
    {
        name: { type: String },
        profilePic: { type: String },

        username: { type: String },
        encryptedPass: { type: String },

        facebookID: { type: String },

        trips: [ TripsSchema ]

    },
    {
        timestamps: true
    }

);

const User = mongoose.model('User', userSchema);

module.exports = User;
