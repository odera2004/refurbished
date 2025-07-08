import React from 'react'
import HeroImg from '../../assets/HeroImg.png'
import { motion } from 'framer-motion'
import { Slideleft } from '../../utility/animation'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <>
      <section>
    <div className="container grid grid-cols-1 
    md:grid-cols-2 min-h-[650px] relative">
        {/* Brand info */}
        <div className='flex flex-col justify-center
        py-14 md:py-0 font-playfair'>
           <div className='text-center md:text-left space-y-6'>
           <motion.h1 
           variants={Slideleft(0.6)}
           initial="hidden"
           animate="visible"
           className='text-5xl lg:text-6xl font-bold leading-relaxed xl:leading-normal'
           >
            The market place for refurbished <span className='text-primary'>stuff</span>{" "}
            </motion.h1>
            <motion.p 
            variants={Slideleft(1.2)}
            initial="hidden"
            animate="visible"
            className='text-gray-600 xl:max-w-[500px]'
            >
              Welcome to Soko La Wanafunzi — Kenya’s premier student-powered marketplace!
              Built by students, for students, our platform connects vibrant campus entrepreneurs with buyers seeking affordable, trendy, and trustworthy products. Whether you're searching for stylish outfits, electronics, or everyday essentials, Soko La Wanafunzi brings you a trusted space to shop, sell, and grow within your campus community. Say goodbye to overpriced listings and unreliable sellers — we’re redefining student commerce, one listing at a time.
            </motion.p>
            {/* button section */}
            <motion.div
            variants={Slideleft(1.5)}
            initial="hidden"
            animate="visible"
            className='flex justify-center md:justify-start items-center gap-8 !mt-4'>
                <Link to="/login" className='primary-btn flex items-center gap-2'> Get started</Link>
                <Link to="/listings" className='flex justify-center items-center gap-2 '> 
                     View Listings</Link>
            </motion.div>
           </div>
        </div>
        {/* Hero section */}
        <div className='flex justify-center items-center relative'>
        <motion.img 
  initial={{ opacity: 0, x: -100 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 1 }}
  src={HeroImg} 
  alt="Hero Image"
  className='w-[350px] md:w-[550px] xl:w-[700px] drop-shadow' />

        </div>
    </div>
      </section>
    </>
  )
}

export default Hero
