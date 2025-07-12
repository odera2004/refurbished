import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Hero from './components/Hero/Hero';
import Equipments from './components/Equipments';
import Banner from './components/Banner/Banner.jsx';
import Banner2 from './components/Banner/Banner2.jsx';
import Img1 from './assets/1.png';
import BgImage from './assets/bg.jpg';
import TabComp from './components/Tab/TabComp.jsx';
import Testimonials from './Testimonials/Testimonials.jsx';

import ListingsPage from './components/ListingsPage';
import Login from './Pages/Login';
import Register from './Pages/Register';
import VendorDashboard from './Pages/VendorDashboard';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BannerData = {
  image: Img1,
  title: 'Best Student Retail Market',
  subtitle:
   " Discover the power of student enterprise with Soko La Wanafunzi,From dorm-room deals to campus-born brands, our platform showcases the creativity, hustle, and innovation of students across Kenya. Whether you are buying or selling, find everything you need in one vibrant space  made for students, driven by students.",
  link: '#',
};

const bgstyle = {
  backgroundImage: `url(${BgImage})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
};

function HomePage() {
  return (
    <>
      <div style={bgstyle}>
        <Hero />
      </div>
      <Equipments />
      <Banner {...BannerData} />
      <TabComp />
      <Testimonials />
      <Banner2 />
    </>
  );
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="listings" element={<ListingsPage />} />
          <Route path="vendor-dashboard" element={<VendorDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Outside layout (e.g., no navbar for auth pages) */}
        
      </Routes>

   
    </>
  );
}

export default App;
