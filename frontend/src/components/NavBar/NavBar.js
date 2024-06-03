import React from "react";
import "./NavBar.css";
import Typography from "../../commons/Typography";
import { SearchBox } from "../Search/SearchInput";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";

const NavBar = ({ searchValue, setSearchValue }) => {
  const dispatch = useDispatch();
  const {isAuthenticated} = useSelector(state=> state.auth);
  const Logout = () => {
    dispatch(logout())
}
  return (
    <header>
      <div className="navbar">
        <div className="metflix-container">
          <Typography className="navbar-title" title="Metflix" />
        </div>
          <div className="nav-auth-link">
            {
              isAuthenticated ? (
                <>
                <Link to={`/favourites`} className="nav-link">Favourites</Link>
                <li className="nav-link" onClick={Logout}>Logout</li>
                </>
              ) :
              (
                <>
                <Link to={`/login`} className="nav-link">Login</Link>
                <Link to={`/register`} className="nav-link">Register</Link>
                </>
              )
            }
            
            
          </div>
      </div>

      <div className="navigation-image-container">
        <div className="watch-something">
          <Typography className="movie-text" title="Watch something" />
          <Typography className="movie-text" title="incredible." />
        </div>
      </div>

      {/* <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} /> */}
    </header>
  );
};

export default NavBar;
