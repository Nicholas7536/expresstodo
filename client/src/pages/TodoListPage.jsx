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
  const { token, logout } = useContext(AuthContext);

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

  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);

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

  const toggle = async (task) => {
    try {
      const res = await axios.put(`/api/tasks/${task._id}`, { completed: !task.completed });
      setTasks((t) => t.map((x) => (x._id === res.data._id ? res.data : x)));
    } catch (err) {
      setError('Error updating');
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

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">My Tasks</Typography>
        <Button variant="outlined" color="error" onClick={logout}>Logout</Button>
      </Box>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {!editing && <TaskForm onSave={addTask} />}
      {editing && (
        <TaskForm
          initial={editing}
          onSave={(data) => editTask(editing._id, data)}
        />
      )}
      <List>
        {Array.isArray(tasks) && tasks.length > 0 ? tasks.map((task) => (
          <ListItem key={task._id} sx={{ bgcolor: task.completed ? 'action.selected' : 'background.paper', mb: 1, borderRadius: 1 }}>
            <Checkbox checked={task.completed} onChange={() => toggle(task)} />
            <ListItemText
              primary={<Typography variant="subtitle1" sx={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</Typography>}
              secondary={<Typography variant="body2" color="text.secondary">{task.description}</Typography>}
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
