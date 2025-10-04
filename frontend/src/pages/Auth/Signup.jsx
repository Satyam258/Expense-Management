import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Receipt } from 'lucide-react';

export const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('admin'); // Only admin can sign up
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('');

  const { signup } = useAuth();
  const navigate = useNavigate();

  // Fetch countries and their currencies
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch('https://restcountries.com/v3.1/all?fields=name,currencies');
        const data = await res.json();
        // Sort countries alphabetically
        const sortedCountries = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedCountries);
      } catch (err) {
        console.error('Failed to fetch countries:', err);
      }
    };
    fetchCountries();
  }, []);

  // Update currency dropdown when country changes
  useEffect(() => {
    if (!selectedCountry) return;
    const country = countries.find(c => c.name.common === selectedCountry);
    if (country && country.currencies) {
      setCurrencies(Object.keys(country.currencies));
      setSelectedCurrency(Object.keys(country.currencies)[0]); // Default select first currency
    }
  }, [selectedCountry, countries]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!selectedCountry || !selectedCurrency) {
      setError('Please select country and currency');
      return;
    }

    setLoading(true);
    try {
      await signup(email, password, fullName, role, selectedCountry, selectedCurrency);

      // Navigate admin to dashboard after signup
      navigate('/admin/dashboard');
    } catch {
      setError('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-600 p-4 rounded-full mb-4 shadow-md">
            <Receipt className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Create Admin Account</h1>
          <p className="text-gray-500 mt-2 text-center">
            Only admins can sign up manually
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          {/* Country Select */}
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-white"
          >
            <option value="">Select Country</option>
            {countries.map((c) => (
              <option key={c.name.common} value={c.name.common}>
                {c.name.common}
              </option>
            ))}
          </select>

          {/* Currency Select */}
<select
  value={selectedCurrency}
  onChange={(e) => setSelectedCurrency(e.target.value)}
  required
  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-white appearance-none"
  disabled={!selectedCountry}
>
  <option value="" disabled>
    {selectedCountry ? 'Select currency' : 'Select country first'}
  </option>
  {currencies.map((cur) => (
    <option key={cur} value={cur}>
      {cur}
    </option>
  ))}
</select>


          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-gray-500 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
