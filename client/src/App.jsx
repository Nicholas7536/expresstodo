import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import TodoListPage from './pages/TodoListPage';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function AppRoutes() {
  const { token } = useContext(AuthContext);
  return (
    <>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
            ToDo
          </Typography>
          {token && (
            <Button component={Link} to="/" color="inherit">Tasks</Button>
          )}
          {!token && <Button component={Link} to="/login" color="inherit">Login</Button>}
          <Button component={Link} to="/signup" color="inherit">Sign Up</Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
        <Routes>
          <Route path="/" element={token ? <TodoListPage /> : <Navigate to="/login" replace />} />
          <Route path="/login" element={!token ? <LoginPage /> : <Navigate to="/" replace />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </Box>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
