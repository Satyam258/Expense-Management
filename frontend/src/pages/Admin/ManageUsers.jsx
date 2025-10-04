import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  IconButton
} from '@mui/material';
import { PlusCircle, CreditCard as Edit, Trash2 } from 'lucide-react';

export const ManageUsers = () => {
  const [users, setUsers] = useState([
    { id: '1', name: 'John Doe', email: 'john@company.com', role: 'employee', department: 'Engineering', status: 'active' },
    { id: '2', name: 'Jane Smith', email: 'jane@company.com', role: 'manager', department: 'Sales', status: 'active' },
    { id: '3', name: 'Bob Johnson', email: 'bob@company.com', role: 'employee', department: 'Marketing', status: 'active' }
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'employee',
    department: '',
    status: 'active'
  });

  const handleAdd = () => {
    setEditMode(false);
    setFormData({ name: '', email: '', role: 'employee', department: '', status: 'active' });
    setDialogOpen(true);
  };

  const handleEdit = (user) => {
    setEditMode(true);
    setCurrentUser(user);
    setFormData(user);
    setDialogOpen(true);
  };

  const handleDelete = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const handleSave = () => {
    if (editMode && currentUser) {
      setUsers(users.map(u => (u.id === currentUser.id ? { ...u, ...formData } : u)));
    } else {
      const newUser = { id: Date.now().toString(), ...formData };
      setUsers([...users, newUser]);
    }
    setDialogOpen(false);
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'error';
      case 'manager': return 'primary';
      default: return 'default';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Users</h1>
          <p className="text-gray-600 mt-2">Add, edit, and manage system users</p>
        </div>
        <Button
          variant="contained"
          startIcon={<PlusCircle className="w-5 h-5" />}
          onClick={handleAdd}
          sx={{
            bgcolor: 'rgb(37, 99, 235)',
            '&:hover': { bgcolor: 'rgb(29, 78, 216)' },
            textTransform: 'none'
          }}
        >
          Add User
        </Button>
      </div>

      {/* Users Table */}
      <Card className="shadow-lg rounded-lg">
        <CardContent className="p-0">
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead className="bg-gray-100">
                <TableRow>
                  <TableCell className="font-semibold">Name</TableCell>
                  <TableCell className="font-semibold">Email</TableCell>
                  <TableCell className="font-semibold">Role</TableCell>
                  <TableCell className="font-semibold">Department</TableCell>
                  <TableCell className="font-semibold">Status</TableCell>
                  <TableCell className="font-semibold" align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map(user => (
                  <TableRow key={user.id} hover className="even:bg-gray-50">
                    <TableCell><p className="font-medium text-gray-900">{user.name}</p></TableCell>
                    <TableCell className="text-gray-700">{user.email}</TableCell>
                    <TableCell>
                      <Chip label={user.role.toUpperCase()} color={getRoleColor(user.role)} size="small" sx={{ fontWeight: 600 }} />
                    </TableCell>
                    <TableCell className="text-gray-700">{user.department}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.status.toUpperCase()}
                        color={user.status === 'active' ? 'success' : 'default'}
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <div className="flex gap-2 justify-end">
                        <IconButton size="small" onClick={() => handleEdit(user)} sx={{ color: 'rgb(37, 99, 235)' }}>
                          <Edit className="w-4 h-4" />
                        </IconButton>
                        <IconButton size="small" onClick={() => handleDelete(user.id)} sx={{ color: 'rgb(239, 68, 68)' }}>
                          <Trash2 className="w-4 h-4" />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editMode ? 'Edit User' : 'Add New User'}</DialogTitle>
        <DialogContent>
          <div className="pt-4">
            <TextField
              fullWidth
              label="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Role</InputLabel>
              <Select
                value={formData.role}
                label="Role"
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <MenuItem value="employee">Employee</MenuItem>
                <MenuItem value="manager">Manager</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Department"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                label="Status"
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} sx={{ textTransform: 'none' }}>Cancel</Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{
              bgcolor: 'rgb(37, 99, 235)',
              '&:hover': { bgcolor: 'rgb(29, 78, 216)' },
              textTransform: 'none'
            }}
          >
            {editMode ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
