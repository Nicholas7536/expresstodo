import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';

export default function SignUpPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/register', form);
      login(res.data.token, res.data.user, () => {
        navigate('/');
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Error');
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Sign Up</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Box component="form" onSubmit={submit}>
        <TextField
          name="username"
          label="Username"
          value={form.username}
          onChange={handle}
          fullWidth
          margin="normal"
          size="small"
        />
        <TextField
          name="email"
          label="Email"
          value={form.email}
          onChange={handle}
          fullWidth
          margin="normal"
          size="small"
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          value={form.password}
          onChange={handle}
          fullWidth
          margin="normal"
          size="small"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 1 }}>
          Sign Up
        </Button>
      </Box>
    </Box>
  );
}
