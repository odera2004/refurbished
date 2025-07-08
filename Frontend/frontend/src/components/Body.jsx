import React from 'react'
import { motion } from 'framer-motion'
import { Slideleft, Slideup } from '../utility/animation'
import { TbCircleNumber1Filled, TbCircleNumber2Filled, TbCircleNumber3Filled } from "react-icons/tb";

const Body = () => {
  return (
    <>
      <section className="">
        
        {/* Heading */}
        <div className="text-center font-berkshire">
          <motion.h1
            variants={Slideleft(0.6)}
            initial="hidden"
            animate="visible"
            className="text-5xl lg:text-6xl font-bold leading-relaxed"
          >
            How it <span className="text-primary">works</span>
          </motion.h1>
        </div>

        {/* Numbers and Steps */}
        <div className="w-full px-8">
          <motion.div
          variants={Slideup()}
          initial="hidden"
          whileInView="visible"
           className="flex justify-between items-start text-primary text-center w-full text-5xl md:text-6xl">

            {/* Step 1 */}
            <div className="flex flex-col items-center space-y-2 max-w-[120px]">
              <TbCircleNumber1Filled />
              <p className="text-base md:text-lg font-semibold text-black">Create Your Account</p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center space-y-2 max-w-[140px]">
              <TbCircleNumber2Filled />
              <p className="text-base md:text-lg font-semibold text-black">Explore or Upload Products</p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center space-y-2 max-w-[130px]">
              <TbCircleNumber3Filled />
              <p className="text-base md:text-lg font-semibold text-black">Connect and Transact</p>
            </div>

          </motion.div>
        </div>

      </section>
    </>
  )
}

export default Body
