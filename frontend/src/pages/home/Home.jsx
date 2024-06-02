import { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import Typography from "../../commons/Typography";
import MovieCard from "../../components/Movies/MovieCard";
import NavBar from "../../components/NavBar/NavBar";
import { AddFavorite, RemoveFavorite } from "../../components/MovieButton/MovieButton";
import { useDispatch, useSelector } from "react-redux";
import { getFavoourite } from "../../utils/api";
import { addToFavouriteFailure, addToFavouriteSuccess, fetchListFailure, fetchListSuccess } from "../../store/favouriteSlice";
import { convert, prepareData, serializeData } from "../../utils";



const Home = () => {
    const [movies, setMovies] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [favorites, setFavorites] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchMovies = async () => {
            const { data } = await axios.get(
                `http://www.omdbapi.com/?s=${searchValue}&apikey=${process.env.REACT_APP_API_KEY}`
            );
            if (data.Search) {
                setMovies(data.Search);
            }
        };

        fetchMovies(searchValue);
    }, [searchValue]);

    const {favourite_data} = useSelector(state=> state.favourite);
    const {isAuthenticated} = useSelector(state => state.auth);
    const [f, setF]= useState(1);


    const getFavourite = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/favourites/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
           
            const data = serializeData(response.data);
            dispatch(fetchListSuccess(data));
        } catch (error) {
            console.error('Error:', error);
            fetchListFailure(error);
        } 
    
    }
    useEffect(() => {
        getFavourite();
        setFavorites(favourite_data);
    }, [dispatch, f, setF]);

    const removeFavoriteMovie = async(movie) => {
        // remove movie if already in favorites
        try {
            const token = localStorage.getItem("token");
            const response = await axios.delete(`${process.env.REACT_APP_BACKEND_BASE_URL}/favourites/${movie.imdbID}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log("Res...", response);
            setF(f=>f+1);
        } catch (error) {
            console.error('Error:', error);
            setF(f=>f+1);
        } 
    };


    const addFavoriteMovie = async(movie) => {
        try {
            const movieData = prepareData(movie);
            const token = localStorage.getItem("token");
            
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/favourites/`, movieData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = convert(response.data.movie)
            dispatch(addToFavouriteSuccess(data));
            setF(f=>f+1);
        } catch (error) {
            console.error('Error:', error);
            dispatch(addToFavouriteFailure(error.message));
            setF(f=>f+1);
        } 
    };

    return (
        <div className="App">
            <div className="movie-container">
                <NavBar searchValue={searchValue} setSearchValue={setSearchValue} />
                {
                    searchValue !== "" && 
                    <div className="movie-set">
                        <div id="movie-category-container">
                            <Typography className="movie-category" title="Search Results ..." />
                        </div>

                        <MovieCard
                            movies={movies}
                            favouriteMovie={AddFavorite}
                            handleFavourite={addFavoriteMovie}
                        />
                    </div>
                }
                
                {isAuthenticated && favourite_data.length > 0 && (
                <div className="favorite-movie-set">
                    <div id="movie-category-container">
                        <Typography className="movie-category" title="My Favorites" />
                    </div>

                    <MovieCard
                        movies={favourite_data}
                        favouriteMovie={RemoveFavorite}
                        handleFavourite={removeFavoriteMovie}
                    />
                </div>
                )}
            </div>
        </div>
    );
};

export default Home;
