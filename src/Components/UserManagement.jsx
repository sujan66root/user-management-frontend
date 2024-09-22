import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, CircularProgress, Snackbar } from '@mui/material';
import { getAllUsers, deleteUser } from '../Service/api';
import { useNavigate } from 'react-router-dom';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const response = await getAllUsers();
            if (response.statusCode === 200) {
                setUsers(response.userslist);
            } else {
                setError('Failed to load users.');
            }
        } catch (err) {
            setError('Error loading users.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            const response = await deleteUser(id);
            if (response && response.statusCode === 200) {
                setSuccessMessage('User deleted successfully!');
                setUsers(users.filter(user => user.id !== id));
            } else {
                setError('Failed to delete user.');
            }
        } catch (err) {
            setError('An error occurred while deleting the user.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="lg" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px' }}>
                <Typography
                    component="h1"
                    variant="h4"
                    align="center"
                    sx={{
                        backgroundColor: '#1976d2',
                        color: 'white',
                        padding: '10px',
                        borderRadius: '5px',
                        boxShadow: 2,
                    }}
                >
                    User Management
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/register')}
                    sx={{ mb: 2, mt: 2 }}
                >
                    Add User
                </Button>
                {loading ? (
                    <CircularProgress />
                ) : error ? (
                    <Typography color="error" align="center">{error}</Typography>
                ) : (
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 'bold' }}>
                                        <TableSortLabel>
                                            Username
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }}>City</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }}>Role</TableCell>
                                    <TableCell align="right" style={{ fontWeight: 'bold' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.username}</TableCell>
                                        <TableCell>{user.city}</TableCell>
                                        <TableCell>{user.role}</TableCell>
                                        <TableCell align="right">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => navigate(`/update-user/${user.id}`)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => handleDelete(user.id)}
                                                sx={{ ml: 2 }}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                <Snackbar
                    open={!!successMessage}
                    autoHideDuration={6000}
                    onClose={() => setSuccessMessage('')}
                    message={successMessage}
                />
            </Paper>
        </Container>
    );
};

export default UserManagement;
