import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavbarMenu } from '../mockData/data';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoSearch } from "react-icons/io5";
import { MdMenu, MdClose } from "react-icons/md";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        {/* Logo Section */}
        <Link to="/" className="text-2xl flex items-center gap-2 font-bold uppercase text-gray-800">
          <AiOutlineShoppingCart className="text-primary" />
          <span>Soko</span>
          <span className="text-secondary">La Wanafunzi</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 text-gray-700">
          {NavbarMenu.map((item) => (
            <li key={item.id}>
              <Link to={item.link} className="hover:text-primary font-semibold transition">
                {item.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* Icons + Login */}
        <div className="hidden md:flex items-center gap-4 text-gray-600">
          <button className="text-2xl hover:bg-primary hover:text-white p-2 rounded-full transition">
            <IoSearch />
          </button>
          <button className="text-2xl hover:bg-primary hover:text-white p-2 rounded-full transition">
            <AiOutlineShoppingCart />
          </button>
          <Link
            to="/login"
            className="border-2 border-primary text-primary font-semibold px-6 py-2 rounded-md hover:bg-primary hover:text-white transition"
          >
            Login
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setOpen(!open)} className="text-3xl text-gray-800">
            {open ? <MdClose /> : <MdMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white px-4 py-6 shadow-md rounded-b-xl">
          <ul className="flex flex-col gap-4 text-gray-700">
            {NavbarMenu.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.link}
                  className="block text-lg font-medium hover:text-primary transition"
                  onClick={() => setOpen(false)}
                >
                  {item.title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/login"
                className="block border-2 border-primary text-primary font-semibold px-4 py-2 rounded-md text-center hover:bg-primary hover:text-white transition"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
