// VendorSidebar.jsx
import React from 'react';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function VendorSidebar({ setActiveTab }) {
  const { logout, user } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="bg-white border-r shadow h-screen flex flex-col justify-between p-4 w-64 sticky top-0">
      <div>
        <h2 className="text-xl font-bold text-primary mb-1">Vendor Panel</h2>
        <p className="text-gray-500 text-sm mb-4">{user?.full_name}</p>
        <nav className="flex flex-col gap-3">
          <button onClick={() => setActiveTab('profile')} className="py-2 px-4 text-left bg-gray-100 hover:bg-gray-200 rounded">
            🧑 Profile
          </button>
          <button onClick={() => setActiveTab('upload')} className="py-2 px-4 text-left bg-gray-100 hover:bg-gray-200 rounded">
            ⬆️ Upload Product
          </button>
          <button onClick={() => setActiveTab('products')} className="py-2 px-4 text-left bg-gray-100 hover:bg-gray-200 rounded">
            📦 My Products
          </button>
          <button onClick={() => setActiveTab('deliveries')} className="py-2 px-4 text-left bg-gray-100 hover:bg-gray-200 rounded">
            🚚 Deliveries
          </button>
        </nav>
      </div>
      <button onClick={handleLogout} className="bg-red-600 text-white py-2 rounded hover:bg-red-700">
        🔓 Logout
      </button>
    </aside>
  );
}
