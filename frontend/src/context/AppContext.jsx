import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext(undefined);

const mockExpenses = [
  {
    id: '1',
    title: 'Client Meeting Lunch',
    description: 'Lunch with ABC Corp client',
    amount: 85.5,
    category: 'meals',
    status: 'pending',
    submittedAt: new Date().toISOString(),
    employeeName: 'John Doe',
    employeeId: '1',
  },
  {
    id: '2',
    title: 'Conference Travel',
    description: 'Flight tickets to TechConf 2024',
    amount: 450.0,
    category: 'travel',
    status: 'approved',
    submittedAt: new Date(Date.now() - 86400000).toISOString(),
    employeeName: 'Jane Smith',
    employeeId: '2',
  },
];

export const AppProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(mockExpenses);

  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
    };
    setExpenses((prev) => [newExpense, ...prev]);
  };

  const updateExpenseStatus = (id, status, notes) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === id ? { ...expense, status } : expense
      )
    );
  };

  return (
    <AppContext.Provider value={{ expenses, addExpense, updateExpenseStatus }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};