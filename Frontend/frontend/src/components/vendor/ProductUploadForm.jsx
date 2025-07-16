import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductUploadForm({ userId, onUpload }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    vendor_name: '',
    vendor_whatsapp: '',
    price: '',
    condition: '',
    category: '',
    image: null,
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [showForm, setShowForm] = useState(true);

  // Auto-generate slug on title change (optional)
  useEffect(() => {
    if (formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      // Optionally: setFormData((prev) => ({ ...prev, slug }));
    }
  }, [formData.title]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image') {
      const file = files[0];
      if (!file) return;

      setFormData((prev) => ({ ...prev, image: file }));

      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append('title', formData.title);
    payload.append('description', formData.description);
    payload.append('price', formData.price);
    payload.append('condition', formData.condition);
    payload.append('category', formData.category);
    payload.append('vendor_name', formData.vendor_name);
    payload.append('vendor_whatsapp', formData.vendor_whatsapp);
    payload.append('user_id', userId);
    payload.append('image', formData.image); // Ensure this is a File object

    console.log([...payload.entries()]);

    try {
      const res = await fetch('https://refurbished-3.onrender.com/listings', {
        method: 'POST',
        body: payload,
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Product uploaded successfully!');
        setFormData({
          title: '',
          description: '',
          vendor_name: '',
          vendor_whatsapp: '',
          price: '',
          condition: '',
          category: '',
          image: null,
        });
        setPreviewUrl(null);
        if (onUpload) onUpload();
      } else {
        toast.error(data.error || 'Upload failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Server error occurred');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-primary">Upload New Product</h3>
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="text-sm text-white bg-primary px-4 py-1.5 rounded hover:bg-opacity-90"
        >
          {showForm ? 'Hide' : 'Show'} Form
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4 bg-white shadow-lg p-6 rounded-xl"
          >
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Product Title"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <input
              type="text"
              name="vendor_name"
              value={formData.vendor_name}
              onChange={handleChange}
              placeholder="Vendor Name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <input
              type="text"
              name="vendor_whatsapp"
              value={formData.vendor_whatsapp}
              onChange={handleChange}
              placeholder="WhatsApp Number"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Product Description"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price in Ksh"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select Condition</option>
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothes">Clothes</option>
              <option value="Books">Books</option>
              <option value="Shoes">Shoes</option>
              <option value="Accessories">Accessories</option>
            </select>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                accept="image/*"
                required
                className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded file:bg-primary file:text-white hover:file:bg-opacity-90"
              />
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="mt-4 rounded-md border border-gray-200 h-40 object-cover w-full"
                />
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-md font-semibold hover:bg-opacity-90 transition"
            >
              Upload Product
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
