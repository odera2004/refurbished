// import React, { useState } from 'react';
// import ProductGrid from '../components/ProductGrid';
// import Chatbot from 'react-chatbot-kit';
// import 'react-chatbot-kit/build/main.css';
// import config from '../components/chatbot/chatbotconfig';
// import MessageParser from '../components/chatbot/MessageParser';
// import ActionProvider from '../components/chatbot/ActionProvider';
// import { FaRobot } from 'react-icons/fa';

// export default function HomePage() {
//   const [category, setCategory] = useState('');
//   const [isChatOpen, setIsChatOpen] = useState(false);

//   const categories = ['All', 'Electronics', 'Clothes', 'Books', 'Shoes', 'Accessories'];

//   return (
//     <div className="container mx-auto px-4 py-6">
//       {/* Category Filter */}
//       <div className="mb-6 text-center">
//         <h4 className="text-2xl font-semibold mb-4">Browse by Category</h4>
//         <div className="flex flex-wrap justify-center gap-3">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               className={`px-4 py-2 rounded-full border transition ${
//                 category === cat || (cat === 'All' && category === '')
//                   ? 'bg-blue-600 text-white'
//                   : 'border-blue-500 text-blue-600 hover:bg-blue-100'
//               }`}
//               onClick={() => setCategory(cat === 'All' ? '' : cat)}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Slideshow */}
//       <div className="relative w-full overflow-hidden rounded-lg shadow-lg mb-8">
//         <div className="carousel">
//           <div className="carousel-item active">
//             <img
//               src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg"
//               alt="Slide 1"
//               className="w-full h-[300px] object-cover"
//             />
//           </div>
//           {/* Additional static slides — for dynamic carousel use JS/Lib */}
//           <div className="carousel-item">
//             <img
//               src="https://t4.ftcdn.net/jpg/01/96/31/09/360_F_196310986_IqebKaPPrE2rA9pFAGOwAQcx3cqUJA0R.jpg"
//               alt="Slide 2"
//               className="w-full h-[300px] object-cover"
//             />
//           </div>
//           <div className="carousel-item">
//             <img
//               src="https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg"
//               alt="Slide 3"
//               className="w-full h-[300px] object-cover"
//             />
//           </div>
//         </div>
//         {/* Placeholder navigation buttons */}
//         <div className="absolute inset-y-1/2 left-4 text-white text-2xl font-bold cursor-pointer">{'<'}</div>
//         <div className="absolute inset-y-1/2 right-4 text-white text-2xl font-bold cursor-pointer">{'>'}</div>
//       </div>

//       {/* Product Listings */}
//       <div>
//         <h4 className="text-xl font-semibold mb-4">Latest Listings</h4>
//         <ProductGrid category={category} />
//       </div>

//       {/* Floating Chatbot */}
//       <div className="fixed bottom-6 right-6 z-50">
//         {isChatOpen ? (
//           <div className="relative w-[350px] h-[500px] bg-white rounded-lg shadow-xl">
//             <button
//               onClick={() => setIsChatOpen(false)}
//               className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm"
//             >
//               Close
//             </button>
//             <Chatbot
//               config={config}
//               messageParser={MessageParser}
//               actionProvider={ActionProvider}
//             />
//           </div>
//         ) : (
//           <button
//             onClick={() => setIsChatOpen(true)}
//             className="w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center hover:bg-blue-700 transition"
//           >
//             <FaRobot size={24} />
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }
