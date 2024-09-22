// UpdateProfile.jsx
import React, { useState, useEffect } from 'react';
import { Box, Button, Container, TextField, Typography, Paper, CircularProgress } from '@mui/material';
import { getUserProfile, updateUserProfile } from '../Service/api';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
    const [formData, setFormData] = useState({
        username: '',
        city: '',
        password: '',
        role: ''
    });
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            try {
                const response = await getUserProfile();
                if (response.statusCode === 200) {
                    const { username, city, role } = response.users;
                    setFormData({ username, city, password: '', role }); // not setting password from the response
                } else {
                    setError('Failed to load profile.');
                }
            } catch (err) {
                setError('Error loading profile.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage('');
        setError('');

        try {
            const response = await updateUserProfile(id, formData);
            if (response && response.statusCode === 200) {
                setSuccessMessage('Profile updated successfully!');
                navigate("/profile")
            } else {
                setError('Failed to update profile.');
            }
        } catch (err) {
            setError('An error occurred while updating profile.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} style={{ padding: '20px', marginTop: '50px' }}>
                <Typography component="h1" variant="h5" align="center">
                    Update Profile
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="city"
                        label="City"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter new password"
                    />

                    {successMessage && (
                        <Typography color="success" variant="body2" align="center">
                            {successMessage}
                        </Typography>
                    )}
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
                        {loading ? <CircularProgress size={24} /> : 'Update Profile'}
                    </Button>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="error"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                        onClick={() => navigate("/profile")}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Cancel'}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default UpdateProfile;
