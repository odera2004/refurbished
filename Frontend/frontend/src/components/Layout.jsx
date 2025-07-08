import React from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './Layout.css';

const Layout = () => {
  const location = useLocation();

  // 💡 Hide Navbar & Footer for vendor-related pages
  const isVendorPage = location.pathname.startsWith('/vendor');

  return ( 
    <div className="layout-wrapper">
      {!isVendorPage && <Navbar />}
      
      <main className="layout-content pt-24">
        <Outlet />
        <ToastContainer />
      </main>
      
      {!isVendorPage && <Footer />}
    </div>
  );
};

export default Layout;
