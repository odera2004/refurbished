import React from 'react'
import { FaMandalorian } from "react-icons/fa6";
import { GiPyromaniac } from "react-icons/gi";
import { GiSwordwoman } from "react-icons/gi";
import { motion } from 'framer-motion';
import { Slideleft } from '../../utility/animation';

const  WorkData = [
    {
        id: 1,
        title: "Step 1",
        desc: "Sign up as a Student or Vendor Students can explore products, post needs, or request services.Vendors can set up their vendor profile and start listing products books, electronics, fashion, food, etc",
        link: "/",
        icon: <FaMandalorian />,
        delay: 0.3
    },
    {
        id: 2,
        title: "Step 2",
        desc: "🛒 Vendors: Upload product images, set prices, and update stock in real-time from your dashboard.🔍 Students: Browse listings, search by category, and view vendor profiles before placing orders.",
        link: "/",
        icon: <GiPyromaniac />,
        delay: 0.6
    },
    {
        id: 3,
        title: "Step 3",
        desc: "💳 Pay directly via M-Pesa or other available payment methods.📦 Choose between pickup or campus delivery — track delivery status from your account" ,
        link: "/",
        icon: <GiSwordwoman />,
        delay: 0.3
    }
]
const work = () => {
  return (
    <div>
      <div className="container py-24 font-playwrite">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 
        gap-6 font-playfair">
            <div className='space-y-4 p-6'>
                <h1 id="how-it-works" className='text-3xl md:text-4xl
                font-bold'>How It Works</h1>
                <p className='text-gray-500'>Understand How Our Service Works
                </p>
            </div>
            {WorkData.map((item) => {
              return (
                <motion.div 
                variants={Slideleft(item.delay)}
                initial="hidden"
                whileInView="visible"
                key={item.id}
                
                className='space-y-4 p-6 bg-[#fbfbfb] hover:bg-white
                    rounded-xl hover:shadow-[0_0_22px_0_rgba(0,0,0,0.15)]'>
                    <div className='text-4xl'>{item.icon}</div>
                    <div className='text-2xl font-semiold'>{item.title}</div>
                    <div className='text-gray-500'>{item.desc}</div>
                </motion.div>
              )
            }
            )}
        </div>

      </div>
    </div>
  )
}

export default work
