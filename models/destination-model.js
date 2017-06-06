const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const DestinationSchema =  new Schema ({
    name: String,
    review: String,
    tripId: { type: Schema.Types.ObjectId },
    address: String,
});
DestinationSchema.index({ location: '2dsphere' });


const Destinations =  mongoose.model('destinations', DestinationSchema);

module.exports = Destinations;
