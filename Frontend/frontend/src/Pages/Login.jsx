import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { toast } from 'react-toastify';

export default function Login() {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      toast.success("✅ Successfully logged in");
    
      const user = JSON.parse(localStorage.getItem('user'));
      if (user?.role === 'vendor') {
        navigate('/vendor-dashboard');
      } else {
        navigate('/');
      }
    }
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 sm:p-8 w-full max-w-md"
      >
        <h3 className="text-2xl font-bold text-center text-secondary mb-6 uppercase">
          Welcome Back
        </h3>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
            Email
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/80"
            placeholder="Enter Email"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/80"
            placeholder="Enter Password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-secondary text-white py-2 rounded-md font-semibold hover:bg-secondary/90 transition duration-200"
        >
          Sign In
        </button>

        <p className="mt-4 text-center text-sm text-gray-500">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-secondary font-semibold hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
