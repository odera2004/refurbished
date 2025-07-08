import React from 'react';

const categories = ['All', 'Electronics', 'Clothes', 'Books', 'Shoes', 'Accessories'];

export default function CategoryFilter({ selected, setSelected }) {
  return (
    <div className="mb-4">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`btn me-2 mb-2 ${selected === cat ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setSelected(cat === 'All' ? null : cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
