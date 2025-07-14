import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function VendorProfileForm({ userId, onProfileUpdated }) {
  const [storeName, setStoreName] = useState('');
  const [bio, setBio] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreed) {
      toast.error("You must agree to the Terms and Conditions.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://refurbished-3.onrender.com/vendor-profiles/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ store_name: storeName, bio }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Vendor profile updated successfully!');
        onProfileUpdated();
      } else {
        toast.error(data.error || 'Update failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Complete Your Vendor Profile</h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your store name"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Short Bio</label>
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tell us about your store"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
          />
        </div>

        <div className="flex items-start gap-2">
          <input
            id="agreeTerms"
            type="checkbox"
            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
          />
          <label htmlFor="agreeTerms" className="text-sm text-gray-600">
            I agree to the{' '}
            <a href="/terms" target="_blank" rel="noreferrer" className="text-blue-600 underline">
              Terms and Conditions
            </a>
          </label>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}
