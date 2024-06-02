import axios from "axios";
import "./MovieCard.css";

const MovieCard = ({
  movies,
  favouriteMovie: FavouriteMovie,
  handleFavourite,
}) => {
  return (
    <div className="movie-row-container">
      {movies && movies?.map(
        (movie) =>
          movie.Poster.match(/\.(jpeg|jpg|gif|png)$/) != null && (
            <div className="movie-frame" key={movie.imdbID}>
              <img className="movie-image" src={movie.Poster} alt="movie" />
              <p className="movie-header">{movie.Type}</p>
              <div
                className="overlay-container"
                onClick={() => handleFavourite(movie)}
                >
                <FavouriteMovie />
              </div>
              <h1>{movie.title}</h1>
            </div>
          )
      )}
    </div>
  );
};

export default MovieCard;
