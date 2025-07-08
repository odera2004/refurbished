import React from 'react'
import { FaDumbbell, FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa6'
import { HiLocationMarker } from 'react-icons/hi'

const Footer = () => {
  return (
    <div className="bg-black text-white rounded-t-3xl">
      <div className='container mx-auto px-4 py-10'>
        {/* Main Footer Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          {/* Brand Info */}
          <div className='space-y-4'>
            <div className='text-2xl flex items-center gap-2 font-bold uppercase'>
              <FaDumbbell />
              <p>Soko</p>
              <p className='text-secondary'>La Wanafunzi</p>
            </div>
            <p className='text-sm text-gray-300'>
              Welcome to Soko La Wanafunzi – your student marketplace. Buy, sell, and connect within campus safely and conveniently.
            </p>
            <div className='flex items-center gap-4 mt-4'>
              <HiLocationMarker className="text-2xl" />
              <FaInstagram className="text-2xl" />
              <FaFacebook className="text-2xl" />
              <FaLinkedin className="text-2xl" />
            </div>
          </div>

          {/* Footer Links */}
          <div>
            <h1 className='text-xl font-bold mb-4'>Company Links</h1>
            <ul className='flex flex-col gap-2 text-sm text-gray-300'>
              <li><a href="#">Our Services</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h1 className='text-xl font-bold mb-4'>Important Links</h1>
            <ul className='flex flex-col gap-2 text-sm text-gray-300'>
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Login</a></li>
            </ul>
          </div>

          <div>
            <h1 className='text-xl font-bold mb-4'>Resources</h1>
            <ul className='flex flex-col gap-2 text-sm text-gray-300'>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Support</a></li>
              <li><a href="#">Community</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center">
          <p className='text-sm text-gray-500'>&copy; 2023 Soko La Wanafunzi. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
