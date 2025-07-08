import React from 'react'
import ReviewsCard from './ReviewsCard'
import img1 from '../../assets/img1.png'
import img2 from '../../assets/img2.png'
import img3 from '../../assets/img3.png'
import { motion } from 'framer-motion'
import { Slideleft } from '../../utility/animation'

const Reviews = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center md:px-32
    px-5 font-playfair'>
      <h1 className='text-4xl font-semibold text-center 1g:pt-16 pt-24 pb-10'>Customers <span className='text-primary'>Reviews</span></h1>
      <motion.div 
       variants={Slideleft()}
       initial="hidden"
       whileInView="visible"
      className='flex flex-col md:flex-row gap-5 mt-5'>
        <ReviewsCard img={img1} name="sara"/>
        <ReviewsCard img={img2} name="Karl"/>
        <ReviewsCard img={img3} name="Jannet"/>
      </motion.div>
    </div>
  )
}

export default Reviews
