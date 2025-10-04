import React from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardContent } from '@mui/material';
import {
  DollarSign,
  FileText,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
} from 'lucide-react';

export const Dashboard = () => {
  const { expenses } = useApp();

  const totalExpenses = expenses.length;
  const pendingExpenses = expenses.filter(e => e.status === 'pending').length;
  const approvedExpenses = expenses.filter(e => e.status === 'approved').length;
  const rejectedExpenses = expenses.filter(e => e.status === 'rejected').length;

  const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const approvedAmount = expenses
    .filter(e => e.status === 'approved')
    .reduce((sum, exp) => sum + exp.amount, 0);

  const formatAmount = (amount) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);

  const stats = [
    {
      title: 'Total Expenses',
      value: totalExpenses,
      icon: FileText,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Pending Review',
      value: pendingExpenses,
      icon: Clock,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
    },
    {
      title: 'Approved',
      value: approvedExpenses,
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Rejected',
      value: rejectedExpenses,
      icon: XCircle,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
    },
  ];

  const recentExpenses = expenses.slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Overview of expense management system
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <TrendingUp className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-gray-600">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Amount cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatAmount(totalAmount)}
                </p>
              </div>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600" style={{ width: '75%' }}></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Approved Amount</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatAmount(approvedAmount)}
                </p>
              </div>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-600" style={{ width: '60%' }}></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent expenses */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Recent Expenses
          </h2>
          <div className="space-y-4">
            {recentExpenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{expense.title}</p>
                  <p className="text-sm text-gray-600">{expense.employeeName}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    {formatAmount(expense.amount)}
                  </p>
                  <p
                    className={`text-sm capitalize ${
                      expense.status === 'approved'
                        ? 'text-green-600'
                        : expense.status === 'rejected'
                        ? 'text-red-600'
                        : 'text-yellow-600'
                    }`}
                  >
                    {expense.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
