// src/pages/ListingsPage.jsx

import React, { useEffect, useState } from 'react';

export default function ListingsPage() {
  const [products, setProducts] = useState([]);

  const fetchAllProducts = async () => {
    try {
      const response = await fetch(`https://refurbished-2.onrender.com/listings`);
      const data = await response.json();
      if (response.ok) {
        setProducts(data);
      } else {
        console.error(data.error);
      }
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handlePaystackPayment = (product) => {
    const handler = window.PaystackPop.setup({
      key: "YOUR_PUBLIC_KEY", // replace with your Paystack public key
      email: "customer@email.com", // ideally use buyer’s email
      amount: product.price * 100, // in kobo (for NGN)
      currency: "NGN", // 👈 change from KES to NGN
      ref: '' + Math.floor(Math.random() * 1000000000 + 1),
      callback: function (response) {
        alert('Payment successful! Reference: ' + response.reference);
      },
      onClose: function () {
        alert('Transaction was not completed, window closed.');
      },
    });
    handler.openIframe();
  };

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6 text-primary">Available Listings</h1>
      {products.length === 0 ? (
        <p className="text-gray-500">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-md p-4">
              {product.image_url && (
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
              )}
              <h2 className="text-xl font-semibold text-gray-800">{product.title}</h2>
              <p className="text-gray-500 text-sm mt-1">{product.description}</p>
              <p className="text-primary font-bold mt-2">₦ {product.price}</p>
              <p className="text-sm text-gray-600">Condition: {product.condition}</p>
              <p className="text-sm text-gray-600">Category: {product.category}</p>

              {product.vendor_name && (
                <p className="text-sm mt-2"><strong>Vendor:</strong> {product.vendor_name}</p>
              )}

              {product.vendor_whatsapp && (
                <a
                  href={`https://wa.me/${product.vendor_whatsapp}?text=Hi%20I'm%20interested%20in%20your%20product:%20${product.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-2 text-sm text-green-600 hover:underline"
                >
                  Chat with Vendor
                </a>
              )}

              {/* Paystack Buy Now Button */}
              <button
                onClick={() => handlePaystackPayment(product)}
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
