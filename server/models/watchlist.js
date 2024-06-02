const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = require("./user");

const watchListSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    id: { type: Number, required: true, unique: true },
    backdrop_path: { type: String, required: true },
    poster_path: { type: String, required: true },
    media_type: { type: String, required: true, enum: ['movie', 'tv', 'person'] },
    adult: { type: Boolean, required: true },
    title: { type: String, required: true },
    genre_ids: { type: [Number], required: true },
    popularity: { type: Number, required: true },
    release_date: { type: Date, required: true },
    vote_average: { type: Number, required: true },
    vote_count: { type: Number, required: true }
});

// Create the Movie model
const WatchList = mongoose.model('Movies', watchListSchema);

module.exports = WatchList;
