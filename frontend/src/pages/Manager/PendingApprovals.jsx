import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Card,
  CardContent,
  Button,
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
  TextField
} from '@mui/material';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export const PendingApprovals = () => {
  const { expenses, updateExpenseStatus } = useApp();
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [notes, setNotes] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [actionType, setActionType] = useState('approve');

  const pendingExpenses = expenses.filter((exp) => exp.status === 'pending');

  const handleAction = (expense, type) => {
    setSelectedExpense(expense);
    setActionType(type);
    setDialogOpen(true);
  };

  const handleConfirm = () => {
    if (selectedExpense) {
      updateExpenseStatus(
        selectedExpense.id,
        actionType === 'approve' ? 'approved' : 'rejected',
        notes
      );
      setDialogOpen(false);
      setSelectedExpense(null);
      setNotes('');
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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Pending Approvals</h1>
        <p className="text-gray-600 mt-2">Review and approve team expense submissions</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-yellow-50 shadow rounded-lg">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="bg-yellow-100 p-3 rounded-full">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{pendingExpenses.length}</p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 shadow rounded-lg">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {expenses.filter((e) => e.status === 'approved').length}
              </p>
              <p className="text-sm text-gray-600">Approved</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50 shadow rounded-lg">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="bg-red-100 p-3 rounded-full">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {expenses.filter((e) => e.status === 'rejected').length}
              </p>
              <p className="text-sm text-gray-600">Rejected</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card className="shadow-lg rounded-lg">
        <CardContent className="p-0">
          {pendingExpenses.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No pending approvals</p>
            </div>
          ) : (
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead>
                  <TableRow className="bg-gray-100">
                    <TableCell className="font-semibold">Employee</TableCell>
                    <TableCell className="font-semibold">Expense</TableCell>
                    <TableCell className="font-semibold">Category</TableCell>
                    <TableCell className="font-semibold">Amount</TableCell>
                    <TableCell className="font-semibold">Submitted</TableCell>
                    <TableCell className="font-semibold" align="right">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pendingExpenses.map((expense) => (
                    <TableRow key={expense.id} hover>
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
                      <TableCell className="text-gray-600">{formatDate(expense.submittedAt)}</TableCell>
                      <TableCell align="right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            size="small"
                            variant="contained"
                            color="success"
                            onClick={() => handleAction(expense, 'approve')}
                            sx={{ textTransform: 'none' }}
                          >
                            Approve
                          </Button>
                          <Button
                            size="small"
                            variant="contained"
                            color="error"
                            onClick={() => handleAction(expense, 'reject')}
                            sx={{ textTransform: 'none' }}
                          >
                            Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* Approval Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{actionType === 'approve' ? 'Approve Expense' : 'Reject Expense'}</DialogTitle>
        <DialogContent>
          <div className="pt-4 space-y-4">
            <p className="text-gray-700">
              {selectedExpense?.title} -{' '}
              {selectedExpense ? formatAmount(selectedExpense.amount) : ''}
            </p>
            <TextField
              fullWidth
              label="Notes (optional)"
              multiline
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes or comments..."
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} sx={{ textTransform: 'none' }}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            variant="contained"
            color={actionType === 'approve' ? 'success' : 'error'}
            sx={{ textTransform: 'none' }}
          >
            Confirm {actionType === 'approve' ? 'Approval' : 'Rejection'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
