import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import {
  Card,
  CardContent,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { PlusCircle } from 'lucide-react';

export const MyExpenses = () => {
  const { expenses } = useApp();
  const { user } = useAuth();
  const navigate = useNavigate();

  const myExpenses = expenses.filter(exp => exp.employeeId === user?.id);

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'warning';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Expenses</h1>
          <p className="text-gray-600 mt-2">Track and manage your submitted expenses</p>
        </div>
        <Button
          variant="contained"
          startIcon={<PlusCircle className="w-5 h-5" />}
          onClick={() => navigate('/employee/submit')}
          sx={{
            bgcolor: 'rgb(37, 99, 235)',
            '&:hover': { bgcolor: 'rgb(29, 78, 216)' },
            textTransform: 'none'
          }}
        >
          Submit New
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {myExpenses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No expenses submitted yet</p>
              <Button
                variant="outlined"
                onClick={() => navigate('/employee/submit')}
                sx={{ textTransform: 'none' }}
              >
                Submit Your First Expense
              </Button>
            </div>
          ) : (
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'rgb(249, 250, 251)' }}>
                    <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Submitted</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {myExpenses.map((expense) => (
                    <TableRow key={expense.id} hover>
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900">{expense.title}</p>
                          {expense.description && (
                            <p className="text-sm text-gray-500">{expense.description}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="capitalize text-gray-700">{expense.category}</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-gray-900">
                          {formatAmount(expense.amount)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={expense.status.toUpperCase()}
                          color={getStatusColor(expense.status)}
                          size="small"
                          sx={{ fontWeight: 600 }}
                        />
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {formatDate(expense.submittedAt)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
};