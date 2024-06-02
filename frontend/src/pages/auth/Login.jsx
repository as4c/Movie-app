import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../../store/authSlice';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // login
    const onSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        dispatch(loginStart());

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/auth/login/`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                const token = response.data.token;
                dispatch(loginSuccess(token));
                navigate('/');
            } else {
                // Handle other status codes, if needed
                setError(true);
                setErrorMsg(response.statusText);
                dispatch(loginFailure(response.statusText));
            }
        } catch (error) {
            console.error('Error:', error);
            setError(true);
            setErrorMsg('An error occurred. Please try again.');
            dispatch(loginFailure('An error occurred. Please try again.'));
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className='user-register'>
            <div>
                <h1>Welcome Back !</h1>
                <p className='error'>{error && errorMsg !== '' ? errorMsg : " "}</p>
                <form onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={onChange}
                        />
                    </div>

                    <div>
                        <button type="submit">
                            {loading ? 'Loading...' : 'Login'}
                        </button>
                    </div>
                </form>
                <div>
                    <p>Don't have an account? <Link to="/register">Register</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Login
