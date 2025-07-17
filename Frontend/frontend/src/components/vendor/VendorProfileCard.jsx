import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

export default function VendorProfileCard({ userId }) {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [storeName, setStoreName] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`https://refurbished-1.onrender.com/vendor-profiles/${userId}`);
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
      let image_url = profile.image_url;

      // Upload to Cloudinary if a new image is selected
      if (image) {
        const imageData = new FormData();
        imageData.append('file', image);
        imageData.append('upload_preset', 'unsigned_preset'); // Replace with your Cloudinary unsigned preset

        const res = await fetch('https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload', {
          method: 'POST',
          body: imageData,
        });
        const data = await res.json();
        image_url = data.secure_url;
      }

      const response = await fetch(`https://refurbished-1.onrender.com/vendor-profiles/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ store_name: storeName, bio, image_url }),
      });

      if (response.ok) {
        toast.success('Profile updated successfully!');
        setEditing(false);
        fetchProfile();
        setImage(null);
        setPreviewUrl(null);
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
      const response = await fetch(`https://refurbished-1.onrender.com/vendor-profiles/${userId}`, {
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Update Profile Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded file:bg-primary file:text-white hover:file:bg-opacity-90"
                  />
                  {previewUrl && (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="mt-4 h-24 w-24 rounded-full object-cover border border-gray-300"
                    />
                  )}
                </div>

                <div className="flex flex-wrap gap-3 mt-4">
                  <button
                    onClick={handleUpdate}
                    className="bg-primary hover:bg-primary/90 text-white font-semibold px-5 py-2 rounded-md transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditing(false);
                      setPreviewUrl(null);
                      setImage(null);
                    }}
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
