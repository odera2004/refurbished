import React from 'react'
import { FaHouse } from "react-icons/fa6";
import { FcElectronics } from "react-icons/fc";
import { FaDumbbell } from "react-icons/fa6";
import { motion } from 'framer-motion';
import { Slideleft } from '../utility/animation';

const  EquipmentData = [
    {
        id: 1,
        title: "House Furniture",
        desc: "We provide all types of house furniture",
        link: "/",
        icon: <FaHouse />,
        delay: 0.3
    },
    {
        id: 2,
        title: "Electronics",
        desc: "Get all types of electronics here, refurbished or new, get them all here",
        link: "/",
        icon: <FcElectronics />,
        delay: 0.6
    },
    {
        id: 3,
        title: "Fitness Equipments",
        desc: "Its a long established fact that you can gain muscle",
        link: "/",
        icon: <FaDumbbell />,
        delay: 0.3
    }
]
const Equipments = () => {
  return (
    <div>
      <div className="container py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 
        gap-6 font-playfair">
            <div className='space-y-4 p-6'>
                <h1 className='text-3xl md:text-4xl
                font-bold'>What we offer for you</h1>
                <p className='text-gray-500'>Affordable refurbished products from vendors
                </p>
            </div>
            {EquipmentData.map((item) => {
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

export default Equipments
