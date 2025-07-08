import React, { useEffect, useState, useContext } from 'react';
import VendorProfileForm from '../components/vendor/VendorProfileForm';
import VendorProfileCard from '../components/vendor/VendorProfileCard';
import ProductUploadForm from '../components/vendor/ProductUploadForm';
import ProductList from '../components/vendor/ProductList';
import DeliveryStatusTable from '../components/vendor/DeliveryStatusTable';
import VendorSidebar from '../components/vendor/VendorSidebar';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function VendorDashboard() {
  const { user } = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();

  const fetchVendorProfile = async () => {
    try {
      const res = await fetch(`http://localhost:5000/vendor-profiles/${user.id}`);
      if (res.status === 404) {
        setProfile(null);
      } else {
        const data = await res.json();
        if (res.ok) setProfile(data);
      }
    } catch (err) {
      console.error('Failed to load vendor profile:', err);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchVendorProfile();
    }
  }, [user]);

  useEffect(() => {
    if (!loading && (!user || !user.is_vendor)) {
      navigate('/register');
    }
  }, [loading, user, navigate]);

  const handleProfileUpdated = () => {
    toast.success('Vendor profile created successfully!');
    fetchVendorProfile();
  };

  const handleProductUpload = () => {
    toast.success('Product uploaded!');
    setRefreshKey((prev) => prev + 1);
    setActiveTab('products');
  };

  if (loading) return <div className="text-center my-5">Loading dashboard...</div>;

  const isProfileComplete = profile && profile.store_name;

  return (
    <div className="min-h-screen bg-gray-100 grid grid-cols-1 md:grid-cols-4 gap-4 px-4 py-6">
      {/* Sidebar */}
      {isProfileComplete && (
        <div className="md:col-span-1">
          <VendorSidebar setActiveTab={setActiveTab} />
        </div>
      )}

      {/* Main Content */}
      <div className={`col-span-3 bg-white rounded-lg shadow p-6`}>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Vendor Dashboard</h2>

        {!isProfileComplete ? (
          <VendorProfileForm userId={user.id} onProfileUpdated={handleProfileUpdated} />
        ) : (
          <>
            {activeTab === 'profile' && (
              <VendorProfileCard userId={user.id} />
            )}
            {activeTab === 'upload' && (
              <ProductUploadForm userId={user.id} onUpload={handleProductUpload} />
            )}
            {activeTab === 'products' && (
              <ProductList userId={user.id} refreshTrigger={refreshKey} />
            )}
            {activeTab === 'deliveries' && (
              <DeliveryStatusTable vendorId={user.id} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
