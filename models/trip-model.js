const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const TripsSchema = Schema({
 authorId: { type: Schema.Types.ObjectId },
 location: String,
 content: String,
});

const Trip = mongoose.model('Trip', TripsSchema);

module.exports = Trip;
