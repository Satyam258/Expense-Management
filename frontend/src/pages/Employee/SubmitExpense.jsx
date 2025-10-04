import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import {
  Card,
  CardContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert
} from '@mui/material';
import { Upload, DollarSign } from 'lucide-react';

export const SubmitExpense = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('meals');
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const { addExpense } = useApp();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    addExpense({
      title,
      description,
      amount: parseFloat(amount),
      category,
      status: 'pending',
      employeeName: user?.fullName || 'Unknown',
      employeeId: user?.id || '1'
    });

    setSuccess(true);
    setTimeout(() => {
      navigate('/employee/expenses');
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Submit New Expense</h1>
        <p className="text-gray-600 mt-2">Fill out the form to submit an expense for approval</p>
      </div>

      {success && (
        <Alert severity="success" className="mb-6">
          Expense submitted successfully! Redirecting...
        </Alert>
      )}

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <TextField
              fullWidth
              label="Expense Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="e.g., Client Lunch Meeting"
            />

            <TextField
              fullWidth
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={4}
              placeholder="Provide details about this expense..."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField
                fullWidth
                label="Amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                InputProps={{
                  startAdornment: <DollarSign className="w-5 h-5 text-gray-400 mr-2" />
                }}
                inputProps={{ step: '0.01', min: '0' }}
              />

              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={category}
                  label="Category"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <MenuItem value="meals">Meals</MenuItem>
                  <MenuItem value="travel">Travel</MenuItem>
                  <MenuItem value="office">Office Supplies</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                id="receipt"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                accept="image/*,.pdf"
              />
              <label htmlFor="receipt" className="cursor-pointer">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  {file ? file.name : 'Click to upload receipt'}
                </p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG, PDF up to 10MB</p>
              </label>
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  bgcolor: 'rgb(37, 99, 235)',
                  '&:hover': { bgcolor: 'rgb(29, 78, 216)' },
                  flex: 1,
                  textTransform: 'none'
                }}
              >
                Submit Expense
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/employee/expenses')}
                sx={{ textTransform: 'none' }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};