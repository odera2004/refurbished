import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FiTrash2, FiEdit2, FiZoomIn } from 'react-icons/fi';

export default function ProductList({ userId }) {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [previewImage, setPreviewImage] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`https://refurbished-3.onrender.com/listings?vendor_id=${userId}`);
      const data = await response.json();
      if (response.ok) {
        setProducts(data);
      } else {
        console.error(data.error || 'Failed to fetch products');
      }
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`https://refurbished-3.onrender.com/listings/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        toast.success("Product deleted successfully");
        fetchProducts();
      } else {
        toast.error("Failed to delete product");
      }
    } catch (err) {
      toast.error("Server error during deletion");
    }
  };

  useEffect(() => {
    if (userId) fetchProducts();
  }, [userId]);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mt-6">
      <input
        type="text"
        placeholder="Search by product title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      />

      {!filteredProducts.length ? (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md">
          <p>No matching products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white shadow-md rounded-xl overflow-hidden flex flex-col relative">
              {product.image_url && (
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="h-48 w-full object-cover cursor-pointer"
                  onClick={() => setPreviewImage(product.image_url)}
                />
              )}
              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.title}</h3>
                  <p className="text-gray-500 text-sm mb-2 line-clamp-3">{product.description}</p>

                  {product.vendor_name && (
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Vendor:</span> {product.vendor_name}
                    </p>
                  )}

                  {product.vendor_whatsapp && (
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">WhatsApp:</span>{' '}
                      <a
                        href={`https://wa.me/${product.vendor_whatsapp}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary underline"
                      >
                        Chat Now
                      </a>
                    </p>
                  )}

                  {product.category && (
                    <p className="text-xs text-gray-500 mt-1">Category: {product.category}</p>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-secondary font-bold text-md">Ksh {product.price}</span>
                  <span className="bg-primary text-white text-xs px-3 py-1 rounded-full capitalize">
                    {product.condition}
                  </span>
                </div>

                <div className="mt-4 flex gap-3">
                  <button className="text-blue-600 hover:text-blue-800" title="Edit (placeholder)">
                    <FiEdit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-800" title="Delete">
                    <FiTrash2 size={18} />
                  </button>
                  <button onClick={() => setPreviewImage(product.image_url)} className="text-gray-600 hover:text-black" title="Preview">
                    <FiZoomIn size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 cursor-pointer"
        >
          <img
            src={previewImage}
            alt="Preview"
            className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
}
