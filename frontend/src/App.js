import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home/Home'
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Favorites from './pages/favourite';

const App = () => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className='app'>
       <BrowserRouter>
            <NavBar searchValue={searchValue} setSearchValue={setSearchValue} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/favourites" element={<Favorites />} />
            </Routes>
           
        </BrowserRouter>
    </div>
  )
}

export default App
