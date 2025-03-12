import React from 'react'
import { Link } from 'react-router-dom'

function Footar() {
  return (
    <>
    <div className='w-full h-40 bg-green-700 justify-between py-6 md:px-10 lg:px-30 items-center text-white text-base tracking-wide'>
        <div className=' flex justify-between px-8'>
          <div className="left flex flex-col">
            <Link to="/" className='hover:!text-amber-400'>Home</Link>
            <Link to="/allproducts" className='hover:!text-amber-400'>Our Products</Link>
            <Link to="/about" className='hover:!text-amber-400'>About</Link>
          </div>
          <div className="right text-center">
            <a href='joeaffruits.com' className=' !text-yellow-300  font-medium tracking-widest'>joeafFruits.com</a>
            <div className=' text-lime-300 cursor-pointer'>+91 9340147425</div>
          </div>
        </div>
    </div>
    <div className=' bg-emerald-900 text-center py-2 sm:py-3 text-white'>
    Made with ❤️ by <a href="https://www.fusionlabsai.io" target='blank' className=' font-bold l tracking-wide'><span className=' text-sky-400'>Fusion</span><span className=' text-fuchsia-500'>Labs </span><span>AI</span></a>
  </div>
  </>
  )
}

export default Footar