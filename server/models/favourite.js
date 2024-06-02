const mongoose = require('mongoose');
const { Schema } = mongoose;

const favouriteSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    id: { type: String, required: true, unique: true },
    poster: { type: String, required: true },
    title: { type: String, required: true },
    type: { type: String, required: true },
    year: { type: String, required: true },
});

// Create the Movie model
const Favourite = mongoose.model('favourites', favouriteSchema);

module.exports = Favourite;