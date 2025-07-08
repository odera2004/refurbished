import React from 'react';
import step1 from '../assets/step1.svg';
import step2 from '../assets/step2.svg';
import step3 from '../assets/step3.svg';
import step4 from '../assets/step4.svg';
import step5 from '../assets/step5.svg';

const steps = [
  {
    id: 1,
    title: 'Choose Your Role',
    description: 'Sign up and select whether you’re a Buyer or a Vendor.',
    image: step1,
  },
  {
    id: 2,
    title: 'Create Your Profile',
    description: 'Vendors create a store with location, WhatsApp contact, and profile image.',
    image: step2,
  },
  {
    id: 3,
    title: 'Upload & Sell',
    description: 'Vendors pay a small fee and upload product listings by category.',
    image: step3,
  },
  {
    id: 4,
    title: 'Browse & Order',
    description: 'Buyers explore listings by category and place orders easily.',
    image: step4,
  },
  {
    id: 5,
    title: 'Delivery & Confirmation',
    description: 'Vendors manage deliveries. Buyers confirm once the product arrives.',
    image: step5,
  },
];

export default function HowItWorks() {
  return (
    <div className="bg-light py-5" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="container">
        <h2 className="text-center mb-5 fw-bold display-5 text-dark">How Soko La Wanafunzi Works</h2>

        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`row align-items-center my-5 ${index % 2 !== 0 ? 'flex-row-reverse' : ''}`}
          >
            <div className="col-md-6 mb-4 mb-md-0">
              <img
                src={step.image}
                alt={step.title}
                className="img-fluid rounded shadow"
              />
            </div>
            <div className="col-md-6">
              <h3 className="h4 fw-semibold text-primary">{step.title}</h3>
              <p className="text-muted fs-5">{step.description}</p>
            </div>
          </div>
        ))}

        <div className="text-center mt-5">
          <a
            href="/register"
            className="btn btn-dark btn-lg px-5 py-3 shadow-sm"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}
