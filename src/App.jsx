import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import UpdateProfile from './Pages/UpdateProfile';
import UserManagement from './Components/UserManagement';
import { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

function App() {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    if (token) {
      setAuth(true);
      setRole(storedRole);
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setAuth(false);
    setRole('');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Navbar isAdmin={role === 'ADMIN'} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<Login setAuth={setAuth} setRole={setRole} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={auth ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/update-user/:id" element={auth ? <UpdateProfile /> : <Navigate to="/login" />} />
        <Route path="/user-management" element={auth && role === 'ADMIN' ? <UserManagement /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
