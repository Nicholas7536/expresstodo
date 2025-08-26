import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function TaskForm({ onSave, initial = {} }) {
  const [form, setForm] = useState({ title: initial.title || '', description: initial.description || '' });

  useEffect(() => {
    // Only update form state if initial values actually change
    setForm((prev) => {
      if (prev.title !== (initial.title || '') || prev.description !== (initial.description || '')) {
        return { title: initial.title || '', description: initial.description || '' };
      }
      return prev;
    });
  }, [initial.title, initial.description]);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    onSave(form);
    setForm({ title: '', description: '' });
  };


  return (
    <Box
      component="form"
      onSubmit={submit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        bgcolor: 'background.paper',
        p: 2,
        borderRadius: 2,
        boxShadow: 1,
        mb: 2,
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        overflowX: 'hidden',
      }}
    >
      <TextField
        name="title"
        label="Title"
        value={form.title}
        onChange={handle}
        fullWidth
        margin="normal"
        size="medium"
        required
        InputLabelProps={{ shrink: true }}
        sx={{ width: '100%' }}
      />
      <TextField
        name="description"
        label="Description"
        value={form.description}
        onChange={handle}
        fullWidth
        margin="normal"
        size="medium"
        multiline
        minRows={2}
        InputLabelProps={{ shrink: true }}
        sx={{ width: '100%' }}
      />
      <Button type="submit" variant="contained" color="success" sx={{ width: '30%', alignSelf: 'center' }}>
        Save
      </Button>
    </Box>
  );
}
