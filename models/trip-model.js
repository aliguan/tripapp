const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const TripsSchema =  new Schema ({
    name: String,
    authorId: { type: Schema.Types.ObjectId },
    location: String,
    content: String,
    tripThumbnail: String,
});


const Trip = mongoose.model('trips', TripsSchema);

module.exports = Trip;
