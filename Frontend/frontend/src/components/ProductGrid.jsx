import React, { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export default function ProductGrid({ category }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let url = 'http://localhost:5000/listings';
    if (category) url += `?category=${encodeURIComponent(category)}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Failed to load listings:', err));
  }, [category]);

  return (
    <div className="row">
      {products.length === 0 ? (
        <p className="text-center text-muted mt-4">No products found.</p>
      ) : (
        products.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card h-100 shadow-sm border-0 rounded-4">
              {product.image_url && (
                <img
                  src={`http://localhost:5000/${product.image_url}`}
                  className="card-img-top rounded-top-4"
                  alt={product.title}
                  style={{ objectFit: 'cover', height: '200px' }}
                />
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-dark fw-bold">{product.title}</h5>
                <p className="text-muted mb-1">{product.category}</p>
                <p className="text-muted small flex-grow-1">{product.description}</p>
                <p className="fw-bold text-success">Ksh {product.price}</p>

                {product.vendor_name && (
                  <p className="mb-1">
                    <strong>Vendor:</strong> {product.vendor_name}
                  </p>
                )}

                {product.vendor_whatsapp && (
                  <div className="d-flex align-items-center gap-2 mt-2">
                    <a
                      href={`https://wa.me/${product.vendor_whatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-sm btn-success d-flex align-items-center gap-1"
                      style={{ textDecoration: 'none' }}
                    >
                      <FaWhatsapp size={18} />
                      Start Chat
                    </a>
                    <span className="text-muted small">
                      {product.vendor_whatsapp}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
