import React from 'react'
import { motion } from 'framer-motion'
import { Slideup } from '../../utility/animation'


const Banner = ({ image, title, subtitle, link }) => {
  return (
    <div className='container'>
      <div className="bg-[#f9f9f9] grid grid-cols-1 md:grid-cols-2 gap-6 py-14 items-center">
        
        {/* Banner Image Section */}
        <div className="flex justify-center items-center">
          <motion.img
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{type: "spring", stiffness: 100,
            delay: 0.2 }}
            src={image}
            alt=""
            className="w-full h-full max-w-[500px] object-cover rounded-md"
          />
        </div>

        {/* Banner Text Section */}
        <div className="flex flex-col justify-center text-center md:text-left space-y-4 lg:max-w-[500px]">
          <motion.p
           variants={Slideup(0.5)}
           initial="hidden"
           whileInView={"visible"}
           viewport={{ once: true }}
            className="text-2xl lg:text-4xl font-bold capitalize font-playfair">
            {title}
          </motion.p>
          <motion.p
          variants={Slideup(0.7)}
          initial="hidden"
          whileInView={"visible"}
          viewport={{ once: true }}
          >
            {subtitle}   
          </motion.p>
          <motion.div 
          variants={Slideup(0.0)}
          initial="hidden"
          whileInView={"visible"}
          viewport={{ once: true }}
          
          className="flex justify-center md:justify-start">
            <button className="primary-btn">Explore more</button>
          </motion.div>
        </div>

      </div>
    </div>
  )
}

export default Banner
