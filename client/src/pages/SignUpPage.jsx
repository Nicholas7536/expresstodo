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
  <Box sx={{ mt: 2, p: 2, bgcolor: '#fff', borderRadius: 2, boxShadow: 2, maxWidth: 400, mx: 'auto', width: '100%' }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, textAlign: 'center' }}>Sign Up</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
  <Box component="form" onSubmit={submit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
        <TextField
          name="username"
          label="Username"
          value={form.username}
          onChange={handle}
          fullWidth
          margin="normal"
          size="medium"
          required
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          name="email"
          label="Email"
          value={form.email}
          onChange={handle}
          fullWidth
          margin="normal"
          size="medium"
          required
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          value={form.password}
          onChange={handle}
          fullWidth
          margin="normal"
          size="medium"
          required
          InputLabelProps={{ shrink: true }}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ minWidth: 100, alignSelf: 'center', mt: 2 }}>
          Sign Up
        </Button>
      </Box>
    </Box>
  );
}
