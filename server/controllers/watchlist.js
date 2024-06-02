const WatchList = require("../models/watchlist")


const handleAddToWatchList = async(req, res) =>{

    try {
        const { id, backdrop_path, poster_path, media_type, adult, title, genre_ids, popularity, release_date, vote_average, vote_count} = req.body;
        const user = req.user._id;
        const newMovie = new WatchList({
            user,
            id,
            backdrop_path,
            poster_path,
            media_type,
            adult,
            title,
            genre_ids,
            popularity,
            release_date,
            vote_average,
            vote_count
        });
        await newMovie.save();
        res.status(201).json({ message: 'Movie added to watchlist', movie: newMovie });
    } catch (error) {
        res.status(500).json({ message: 'Error adding movie to watchlist', error });
    }
} 

const handleGetWatchList = async(req, res) => {
    try {
        const userId = req.user._id;
        const movies = await WatchList.find({ user: userId });
        console.log("movies...", movies);
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving movies', error });
    }
}

module.exports = {
    handleAddToWatchList,
    handleGetWatchList
}