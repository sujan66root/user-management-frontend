import { login } from '../Service/api';
import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Paper, CircularProgress } from '@mui/material';
import { useNavigate } from "react-router-dom";

const Login = ({ setAuth, setRole }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true); // Show loader when starting login

        try {
            const response = await login({ username, password });
            if (response.statusCode == 200) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('role', response.role)
                navigate('/profile')
                setAuth(true);
                setRole(response.role)
            } else {
                setError('Invalid username or password');
            }
        } catch (err) {
            setError('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} style={{ padding: '20px', marginTop: '50px' }}>
                <Typography component="h1" variant="h5" align="center">
                    Login
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && (
                        <Typography color="error" variant="body2" align="center">
                            {error}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Sign In'}  {/* Show loader if loading */}
                    </Button>
                    <p className="footer-text">Don't have an account? <a href="/register">Register</a></p>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;
