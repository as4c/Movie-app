const Favourite = require("../models/favourite")


const handleAddToFavourite = async(req, res) =>{
    // console.log("req...", req.body);
    try {
        const { id, poster, title, type, year} = req.body;
        const user = req.user._id;
        const movies = await Favourite.find({ id: id });
        if (Array.isArray(movies) && movies.length > 0){
            return res.status(400).json({ message: "Movie already added to favourite" });
        }
        const newMovie = new Favourite({
            user,
            id,
            poster,
            title,
            type,
            year
        });
        await newMovie.save();
        res.status(201).json({ message: 'Movie added to favourite', movie: newMovie });
    } catch (error) {
        res.status(500).json({ message: 'Error adding movie to favourite', error });
    }
} 

const handleGeFavourite = async(req, res) => {
    try {
        const userId = req.user._id;
        const movies = await Favourite.find({ user: userId });
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving movies', error });
    }
}

const handleRemoveFavourite = async(req, res) => {
    try {
        const Id = req.params.Id;
        console.log("id..", Id);
        const movies = await Favourite.findOneAndDelete({ id : Id });
        res.status(200).json({"message": "Removed Successfully!"});
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving movies', error });
    }
}

module.exports = {
    handleAddToFavourite,
    handleGeFavourite,
    handleRemoveFavourite
}