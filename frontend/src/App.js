import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home/Home'
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import './App.css';

const App = () => {
  return (
    <div className='app'>
       <BrowserRouter>
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
           
        </BrowserRouter>
    </div>
  )
}

export default App
