import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Replace with your actual backend API call for login
      const mockUser = {
        id: '1',
        email,
        role: email.includes('admin') ? 'admin' : email.includes('manager') ? 'manager' : 'employee',
        fullName: email.split('@')[0],
        department: 'Engineering',
      };

      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email, password, fullName, role, country, currency) => {
    setLoading(true);
    try {
      // Here, call your backend API to create company and admin
      const response = await fetch('http://localhost:4000/api/company-admin/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: fullName + "'s Company", // you can adjust company name logic
          country,
          default_currency: currency,
          adminName: fullName,
          adminEmail: email,
          adminPassword: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to sign up');
      }

      // After successful signup, store user info (you can customize as needed)
      const newUser = {
        id: data.admin._id,
        email: data.admin.email,
        role: 'admin',
        fullName: data.admin.name,
        company: data.company.name,
      };

      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
