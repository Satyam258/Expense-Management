import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
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
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

export const TeamExpenses = () => {
  const { expenses } = useApp();
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredExpenses =
    statusFilter === 'all'
      ? expenses
      : expenses.filter(exp => exp.status === statusFilter);

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

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

  const formatAmount = (amount) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);

  const totalAmount = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Team Expenses</h1>
        <p className="text-gray-600 mt-2">View and track all team expense submissions</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-white shadow rounded-lg">
          <CardContent className="p-6">
            <p className="text-sm text-gray-600 mb-1">Total Expenses</p>
            <p className="text-3xl font-bold text-gray-900">{filteredExpenses.length}</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow rounded-lg">
          <CardContent className="p-6">
            <p className="text-sm text-gray-600 mb-1">Total Amount</p>
            <p className="text-3xl font-bold text-gray-900">{formatAmount(totalAmount)}</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow rounded-lg">
          <CardContent className="p-6">
            <FormControl fullWidth size="small">
              <InputLabel>Filter by Status</InputLabel>
              <Select
                value={statusFilter}
                label="Filter by Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="approved">Approved</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
          </CardContent>
        </Card>
      </div>

      {/* Expenses Table */}
      <Card className="shadow-lg rounded-lg">
        <CardContent className="p-0">
          {filteredExpenses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No expenses found</p>
            </div>
          ) : (
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead className="bg-gray-100">
                  <TableRow>
                    <TableCell className="font-semibold">Employee</TableCell>
                    <TableCell className="font-semibold">Title</TableCell>
                    <TableCell className="font-semibold">Category</TableCell>
                    <TableCell className="font-semibold">Amount</TableCell>
                    <TableCell className="font-semibold">Status</TableCell>
                    <TableCell className="font-semibold">Submitted</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredExpenses.map((expense) => (
                    <TableRow key={expense.id} hover className="even:bg-gray-50">
                      <TableCell>
                        <p className="font-medium text-gray-900">{expense.employeeName}</p>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
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
                        <span className="font-medium text-gray-900">{formatAmount(expense.amount)}</span>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={expense.status.toUpperCase()}
                          color={getStatusColor(expense.status)}
                          size="small"
                          sx={{ fontWeight: 600 }}
                        />
                      </TableCell>
                      <TableCell className="text-gray-600">{formatDate(expense.submittedAt)}</TableCell>
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
