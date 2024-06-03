import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import Typography from "../../commons/Typography";
import MovieCard from "../../components/Movies/MovieCard";
import NavBar from "../../components/NavBar/NavBar";
import { RemoveFavorite } from "../../components/MovieButton/MovieButton";
import { useDispatch, useSelector } from "react-redux";

import {fetchListFailure, fetchListSuccess } from "../../store/favouriteSlice";
import {  serializeData } from "../../utils";


const Favorites = () => {
    const {favourite_data} = useSelector(state=> state.favourite);
    const {isAuthenticated} = useSelector(state => state.auth);
    const [f, setF]= useState(1);
    const [favorites, setFavorites] = useState([]);
    const dispatch = useDispatch();

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


    return (
        <div>
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
        </div>
    )
}

export default Favorites;
