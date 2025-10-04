import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Layout } from '../components/Layout';
import { Login } from '../pages/Auth/Login';
import { Signup } from '../pages/Auth/Signup';
import { SubmitExpense } from '../pages/Employee/SubmitExpense';
import { MyExpenses } from '../pages/Employee/MyExpenses';
import { PendingApprovals } from '../pages/Manager/PendingApprovals';
import { TeamExpenses } from '../pages/Manager/TeamExpenses';
import { Dashboard } from '../pages/Admin/Dashboard';
import { ManageUsers } from '../pages/Admin/ManageUsers';
import { ApprovalFlows } from '../pages/Admin/ApprovalFlows';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // ✅ Fixed interpolation
    return <Navigate to={`/${user.role}`} replace />;
  }

  return <>{children}</>;
};

const RoleBasedRedirect = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  switch (user.role) {
    case 'admin':
      return <Navigate to="/admin/dashboard" replace />;
    case 'manager':
      return <Navigate to="/manager/approvals" replace />;
    case 'employee':
      return <Navigate to="/employee/submit" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
};

export const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" replace /> : <Signup />}
        />

        {/* Root redirect */}
        <Route
          path="/"
          element={
            user ? <RoleBasedRedirect /> : <Navigate to="/login" replace />
          }
        />

        {/* Employee routes */}
        <Route
          path="/employee"
          element={
            <ProtectedRoute allowedRoles={['employee']}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/employee/submit" replace />} />
          <Route path="submit" element={<SubmitExpense />} />
          <Route path="expenses" element={<MyExpenses />} />
        </Route>

        {/* Manager routes */}
        <Route
          path="/manager"
          element={
            <ProtectedRoute allowedRoles={['manager']}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/manager/approvals" replace />} />
          <Route path="approvals" element={<PendingApprovals />} />
          <Route path="team-expenses" element={<TeamExpenses />} />
        </Route>

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="flows" element={<ApprovalFlows />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
