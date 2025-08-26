import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import TaskForm from '../components/TaskForm';
import { AuthContext } from '../context/AuthContext';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TodoListPage() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);
  const { token, logout, user } = useContext(AuthContext);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('/api/tasks');
      if (Array.isArray(res.data)) {
        setTasks(res.data);
      } else {
        setTasks([]);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching');
      if (err.response?.status === 401) logout();
    }
  };


  const remove = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      setTasks((t) => t.filter((x) => x._id !== id));
    } catch (err) {
      setError('Error deleting');
    }
  };

  // Add missing addTask and editTask functions
  const addTask = async (data) => {
    try {
      const res = await axios.post('/api/tasks', data);
      setTasks((t) => [res.data, ...t]);
    } catch (err) {
      setError(err.response?.data?.message || 'Error');
    }
  };

  const editTask = async (id, data) => {
    try {
      const res = await axios.put(`/api/tasks/${id}`, data);
      setTasks((t) => t.map((x) => (x._id === res.data._id ? res.data : x)));
      setEditing(null);
    } catch (err) {
      setError('Error updating');
    }
  };

  // Fix toggle function for checkbox
  const toggle = async (task) => {
    try {
      const res = await axios.put(`/api/tasks/${task._id}`, { ...task, completed: !task.completed });
      setTasks((t) => t.map((x) => (x._id === res.data._id ? res.data : x)));
    } catch (err) {
      setError('Error updating');
    }
  };

  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);

  return (
  <Box sx={{ mt: { xs: 2, sm: 4 }, bgcolor: '#fff', p: { xs: 1, sm: 2 }, borderRadius: 2, boxShadow: 2, minHeight: '70vh', width: '100%', maxWidth: 600, mx: 'auto', mb: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, mb: 2 }}>
        <Typography variant="h5" sx={{ color: '#464242ff', fontWeight: 700, wordBreak: 'break-word', fontSize: { xs: '1.2rem', sm: '2rem' } }}>
          {user?.username ? `${user.username}'s Tasks` : 'My Tasks'}
        </Typography>
        <Button variant="outlined" color="error" onClick={logout} sx={{ mt: { xs: 1, sm: 0 }, alignSelf: { xs: 'flex-end', sm: 'center' } }}>Logout</Button>
      </Box>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {!editing && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Box sx={{ width: { xs: '100%', sm: '70%' }}}>
            <TaskForm onSave={addTask} />
          </Box>
        </Box>
      )}
      {editing && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Box sx={{ width: { xs: '100%', sm: '100%' } }}>
            <TaskForm
              initial={editing}
              onSave={(data) => editTask(editing._id, data)}
            />
          </Box>
        </Box>
      )}
      <List sx={{ bgcolor: '#fff', borderRadius: 2 }}>
        {Array.isArray(tasks) && tasks.length > 0 ? tasks.map((task) => (
          <ListItem key={task._id} sx={{ bgcolor: '#fff', mb: 1, borderRadius: 1, boxShadow: 1 }}>
            <Checkbox checked={task.completed} onChange={() => toggle(task)} />
            <ListItemText
              primary={<Typography variant="subtitle1" sx={{ textDecoration: task.completed ? 'line-through' : 'none', color: '#222' }}>{task.title}</Typography>}
              secondary={<Typography variant="body2" sx={{ color: '#555' }}>{task.description}</Typography>}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" color="primary" onClick={() => setEditing(task)}><EditIcon /></IconButton>
              <IconButton edge="end" color="error" onClick={() => remove(task._id)}><DeleteIcon /></IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )) : <ListItem><ListItemText primary="No tasks found." /></ListItem>}
      </List>
    </Box>
  );
}
