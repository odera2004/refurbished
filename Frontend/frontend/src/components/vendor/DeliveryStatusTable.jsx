// src/components/vendor/DeliveryStatusTable.jsx
import React, { useEffect, useState } from 'react';

export default function DeliveryStatusTable({ vendorId }) {
  const [deliveries, setDeliveries] = useState([]);

  const fetchDeliveries = async () => {
    try {
      const res = await fetch(`http://localhost:5000/deliveries?vendor_id=${vendorId}`);
      const data = await res.json();
      if (res.ok) {
        setDeliveries(data);
      } else {
        console.error(data.error || 'Failed to fetch deliveries');
      }
    } catch (error) {
      console.error('Error loading deliveries:', error);
    }
  };

  useEffect(() => {
    if (vendorId) fetchDeliveries();
  }, [vendorId]);

  return (
    <div className="table-responsive mt-4">
      <h5 className="mb-3">Delivery Status</h5>
      {deliveries.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No deliveries found.
        </div>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Buyer</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((delivery, index) => (
              <tr key={delivery.id}>
                <td>{index + 1}</td>
                <td>{delivery.product_name}</td>
                <td>{delivery.buyer_name}</td>
                <td>{delivery.buyer_phone}</td>
                <td>
                  <span
                    className={`badge ${
                      delivery.status === 'delivered'
                        ? 'bg-success'
                        : delivery.status === 'pending'
                        ? 'bg-warning text-dark'
                        : 'bg-secondary'
                    }`}
                  >
                    {delivery.status}
                  </span>
                </td>
                <td>{new Date(delivery.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
