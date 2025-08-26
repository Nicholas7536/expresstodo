
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
    <Box sx={{ minHeight: '100vh', bgcolor: '#fff', display: 'flex'}}>
      <AppBar position="fixed" color="default" elevation={1} sx={{ bgcolor: '#fff', left: 0, top: 0 }}>
        <Toolbar sx={{ mx: 'auto', width: '100%' }}>
          <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit', fontWeight: 700 }}>
            ToDo
          </Typography>
          {!token && <Button component={Link} to="/login" color="inherit">Login</Button>}
          {!token && <Button component={Link} to="/signup" color="inherit" sx={{ mr: { xs: 1, sm: 3 }, ml: { xs: 1, sm: 1 } }}>Sign Up</Button>}
        </Toolbar>
      </AppBar>
      <Box sx={{ flex: 1, bgcolor: '#fff', minHeight: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
        <Box sx={{ width: '100%', maxWidth: 2400, p: { xs: 1, sm: 2 }, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', minHeight: '80vh', mt: { xs: 8, sm: 10 } }}>
          <Routes>
            <Route path="/" element={token ? <TodoListPage /> : <Navigate to="/login" replace />} />
            <Route path="/login" element={!token ? <LoginPage /> : <Navigate to="/" replace />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
        </Box>
      </Box>
    </Box>
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
