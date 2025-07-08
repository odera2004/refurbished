import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { toast } from 'react-toastify';

export default function Register() {
  const { register } = useContext(UserContext);
  const navigate = useNavigate();

  const [full_name, setFull_Name] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhone_Number] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [role, setRole] = useState('');
  const [campus, setCampus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      toast.error("❌ Passwords don't match");
      return;
    }

    try {
      const success = await register(full_name, email, phone_number, password, role, campus);
      if (success) {
        toast.success("🎉 Registration successful");
        navigate('/login');
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 mt-[80px] sm:mt-[100px] mb-[60px]">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-secondary mb-5 uppercase">
          Create an Account
        </h2>

        <div className="my-4 text-center text-gray-500 text-sm">— OR —</div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="Full_name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="Full_name"
              value={full_name}
              onChange={(e) => setFull_Name(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter full name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter password"
              required
            />
          </div>

          <div>
            <label htmlFor="repeatPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="repeatPassword"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Repeat password"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={phone_number}
              onChange={(e) => setPhone_Number(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter phone number"
              required
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Select Role</option>
              <option value="buyer">Buyer</option>
              <option value="vendor">Vendor</option>
            </select>
          </div>

          <div>
            <label htmlFor="campus" className="block text-sm font-medium text-gray-700 mb-1">
              Campus
            </label>
            <input
              type="text"
              id="campus"
              value={campus}
              onChange={(e) => setCampus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter campus"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-secondary text-white font-semibold py-2 rounded-md hover:bg-secondary/90 transition duration-200 mt-2"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-secondary font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
