const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const DestinationSchema =  new Schema ({
    name: String,
    location: { type: { type: String }, coordinates: [Number] },
    review: String,
    tripId: { type: Schema.Types.ObjectId },
});
DestinationSchema.index({ location: '2dsphere' });


const Destinations =  mongoose.model('destinations', DestinationSchema);

module.exports = Destinations;
