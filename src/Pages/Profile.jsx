import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Button, Grid, Card, CardContent, Avatar } from '@mui/material';
import { getUserProfile } from '../Service/api';
import { Link } from 'react-router-dom';

const Profile = () => {
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            try {
                const profileData = await getUserProfile();
                if (profileData) {
                    setProfile(profileData.users);
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

    return (
        <Container component="main" maxWidth="sm">
            <Paper elevation={3} style={{ padding: '20px', marginTop: '50px', borderRadius: '16px' }}>
                <Typography component="h1" variant="h5" align="center" gutterBottom>
                    User Profile
                </Typography>
                {loading && <Typography align="center">Loading...</Typography>}
                {error && <Typography color="error" align="center">{error}</Typography>}
                {!loading && !error && (
                    <Card variant="outlined" sx={{ marginTop: 2 }}>
                        <CardContent>
                            <Grid container spacing={2} alignItems="center" justifyContent="center">
                                <Grid item>
                                    <Avatar
                                        sx={{ width: 80, height: 80 }}
                                        alt={profile.username}
                                        src="/static/images/avatar/1.jpg"
                                    >
                                        {profile.username && profile.username.charAt(0).toUpperCase()}
                                    </Avatar>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6" style={{ fontSize: '1.5rem' }}>{profile.username}</Typography>
                                    <Typography variant="body1" style={{ fontSize: '1.2rem', color: 'text.secondary' }}>City: {profile.city}</Typography>
                                    {profile.role && <Typography variant="body1" style={{ fontSize: '1.2rem', color: 'text.secondary' }}>Role: {profile.role}</Typography>}
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                )}
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, display: 'block', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center', padding: '10px 20px' }}
                    component={Link}
                    to={`/update-user/${profile.id}`}
                    style={{ textDecoration: 'none', color: 'white' }}
                >
                    Update Profile
                </Button>
            </Paper>
        </Container>
    );
};

export default Profile;
