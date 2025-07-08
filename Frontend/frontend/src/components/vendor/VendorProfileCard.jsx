import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

export default function VendorProfileCard({ userId }) {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [storeName, setStoreName] = useState('');
  const [bio, setBio] = useState('');

  const fetchProfile = async () => {
    try {
      const response = await fetch(`http://localhost:5000/vendor-profiles/${userId}`);
      const data = await response.json();
      if (response.ok) {
        setProfile(data);
        setStoreName(data.store_name);
        setBio(data.bio || '');
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error fetching vendor profile:', error);
    }
  };

  useEffect(() => {
    if (userId) fetchProfile();
  }, [userId]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/vendor-profiles/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ store_name: storeName, bio })
      });

      if (response.ok) {
        setEditing(false);
        toast.success('Profile updated successfully!');
        fetchProfile();
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Update failed');
      }
    } catch (error) {
      toast.error('Server error during update');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your vendor profile?")) return;

    try {
      const response = await fetch(`http://localhost:5000/vendor-profiles/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProfile(null);
        toast.success('Profile deleted');
      } else {
        toast.error('Failed to delete profile');
      }
    } catch (error) {
      toast.error('Server error during deletion');
    }
  };

  const statusColors = {
    Active: 'bg-green-100 text-green-800',
    Pending: 'bg-yellow-100 text-yellow-800',
    Suspended: 'bg-red-100 text-red-800'
  };

  if (!profile) {
    return (
      <div className="text-center py-6 text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-2xl mx-auto"
    >
      {!editing ? (
        <>
          {profile.image_url && (
            <img
              src={profile.image_url}
              alt="Vendor Profile"
              className="w-24 h-24 rounded-full mb-4 object-cover"
            />
          )}
          <h3 className="text-2xl font-bold text-gray-800 mb-1">
            {profile.store_name}
          </h3>
          <div className="flex flex-wrap gap-2 mb-3">
            <p className="text-sm text-gray-500">
              {profile.verified ? '✅ Verified Vendor' : '⏳ Not Verified'}
            </p>
            <span className={`text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wide ${statusColors[profile.status || 'Pending']}`}>
              {profile.status || 'Pending'}
            </span>
            <span className="bg-secondary/20 text-secondary text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wide">
              {profile.subscription_status || 'Free'} Plan
            </span>
            <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
              ⭐ {profile.rating || 4.5} Rating
            </span>
          </div>
          <p className="text-gray-600 mb-4">
            {profile.bio || 'No bio provided.'}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => setEditing(true)}
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-5 py-2 rounded-md transition"
            >
              Edit Profile
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-md transition"
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <details open className="bg-gray-50 p-4 rounded-lg">
              <summary className="text-gray-800 font-semibold cursor-pointer">
                Editing Profile
              </summary>

              <div className="mt-4 space-y-4">
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  placeholder="Store Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Your store bio..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <div className="flex flex-wrap gap-3 mt-4">
                  <button
                    onClick={handleUpdate}
                    className="bg-primary hover:bg-primary/90 text-white font-semibold px-5 py-2 rounded-md transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-5 py-2 rounded-md transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </details>
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
}
