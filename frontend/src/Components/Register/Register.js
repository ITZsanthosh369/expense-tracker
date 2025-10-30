import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();
        
        // Validate password match
        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            return;
        }
        
        // Validate password strength
        if (password.length < 6) {
            setError('Password must be at least 6 characters long!');
            return;
        }
        
        try {
            const response = await axios.post('https://expensetracker-production-4cc5.up.railway.app/api/v1/auth/register', { 
                username: name, 
                email, 
                password 
            });
            setSuccess('Registration successful! Redirecting to login...');
            setError(null);
            
            // Clear form
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            
            // Redirect to login after 2 seconds
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (err) {
            console.error('Registration error:', err.response ? err.response.data : err.message);
            if (err.response?.data?.error) {
                setError(err.response.data.error);
            } else {
                setError('Registration failed. Please try again.');
            }
            setSuccess(null);
        }
    };

    return (
        <RegisterStyled>
            <h2>Register</h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <form onSubmit={handleRegister}>
                <input 
                    type="text" 
                    placeholder="Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                />
                <input 
                    type="password" 
                    placeholder="Password (min 6 characters)" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                    minLength={6}
                />
                <input 
                    type="password" 
                    placeholder="Confirm Password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    required
                />
                <button type="submit">Register</button>
            </form>
            <p>
                Already have an account?<Link to="/login">Login to your Account</Link>
            </p> {}
        </RegisterStyled>
    );
}

const RegisterStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;

    h2 {
        color: rgba(34, 34, 96, 1);
    }

    .error {
        color: red;
        margin-bottom: 1rem;
    }

    .success {
        color: green;
        margin-bottom: 1rem;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;

        input {
            padding: 1rem;
            border-radius: 5px;
            border: 1px solid rgba(34, 34, 96, 0.3);
            width: 300px;
        }

        button {
            padding: 1rem;
            background-color: rgba(34, 34, 96, 1);
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            width: 300px;

            &:hover {
                background-color: rgba(34, 34, 96, 0.8);
            }
        }
    }
`;

export default Register;
