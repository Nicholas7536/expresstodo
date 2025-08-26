import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function TaskForm({ onSave, initial = {} }) {
  const [form, setForm] = useState({ title: initial.title || '', description: initial.description || '' });

  useEffect(() => {
    setForm({ title: initial.title || '', description: initial.description || '' });
  }, [initial]);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <Box component="form" onSubmit={submit} sx={{ mb: 2 }}>
      <TextField
        name="title"
        label="Title"
        value={form.title}
        onChange={handle}
        fullWidth
        margin="normal"
        size="small"
      />
      <TextField
        name="description"
        label="Description"
        value={form.description}
        onChange={handle}
        fullWidth
        margin="normal"
        size="small"
      />
      <Button type="submit" variant="contained" color="success" sx={{ mt: 1 }}>
        Save
      </Button>
    </Box>
  );
}
