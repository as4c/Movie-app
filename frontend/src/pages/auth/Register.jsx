import React, { useState } from 'react';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        if (formData.password !== formData.password2) {
            setError(true);
            setErrorMsg('Passwords do not match!');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/auth/register/`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                navigate('/login');
            }
            if(response.status === 400){
                setError(true);
                setErrorMsg(error);
            }
        } catch (error) {
            console.error('Error:', error);
            setError(true);
            setErrorMsg(error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className='user-register'>
            <div>
                <h1>Register</h1>
                <p className='error'>{error && errorMsg !== '' ? errorMsg : " "}</p>
                <form onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="email">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={onChange}
                            required
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
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            name="password2"
                            id="password2"
                            value={formData.password2}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div>
                        <button type="submit">
                            {loading ? 'Loading...' : 'Register'}
                        </button>
                    </div>
                </form>
                <div>
                    <p>Already have an account? <Link to="/login">Login</Link> instead.</p>
                </div>
            </div>
        </div>
    );
};

export default Register;