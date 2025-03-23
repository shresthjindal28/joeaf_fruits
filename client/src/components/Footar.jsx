import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

function Footar() {
  return (
    <>
      <div className='w-full bg-green-700 py-8 sm:py-10 text-white'>
        <div className='container mx-auto px-4 sm:px-6'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
            {/* Quick Links */}
            <div className="flex flex-col">
              <h3 className='text-xl font-bold mb-4 pb-2 border-b border-green-500'>Quick Links</h3>
              <div className='flex flex-col space-y-3'>
                <Link to="/" className='group flex items-center w-max'>
                  <span className='mr-2 transform group-hover:translate-x-2 transition-transform duration-300'>→</span>
                  <span className='hover:text-amber-400 relative overflow-hidden'>
                    <span className='inline-block transform transition-transform duration-300 group-hover:-translate-y-full'>Home</span>
                    <span className='absolute top-0 left-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 text-amber-400'>Home</span>
                  </span>
                </Link>
                <Link to="/shop" className='group flex items-center w-max'>
                  <span className='mr-2 transform group-hover:translate-x-2 transition-transform duration-300'>→</span>
                  <span className='hover:text-amber-400 relative overflow-hidden'>
                    <span className='inline-block transform transition-transform duration-300 group-hover:-translate-y-full'>Store</span>
                    <span className='absolute top-0 left-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 text-amber-400'>Store</span>
                  </span>
                </Link>
                <Link to="/about" className='group flex items-center w-max'>
                  <span className='mr-2 transform group-hover:translate-x-2 transition-transform duration-300'>→</span>
                  <span className='hover:text-amber-400 relative overflow-hidden'>
                    <span className='inline-block transform transition-transform duration-300 group-hover:-translate-y-full'>About</span>
                    <span className='absolute top-0 left-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 text-amber-400'>About</span>
                  </span>
                </Link>
                <Link to="/contact" className='group flex items-center w-max'>
                  <span className='mr-2 transform group-hover:translate-x-2 transition-transform duration-300'>→</span>
                  <span className='hover:text-amber-400 relative overflow-hidden'>
                    <span className='inline-block transform transition-transform duration-300 group-hover:-translate-y-full'>Contact</span>
                    <span className='absolute top-0 left-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 text-amber-400'>Contact</span>
                  </span>
                </Link>
              </div>
            </div>

            {/* Contact Us */}
            <div className="flex flex-col">
              <h3 className='text-xl font-bold mb-4 pb-2 border-b border-green-500'>Contact Us</h3>
              <div className='flex flex-col space-y-3'>
                <a href='https://joeaffruits.com' className='text-yellow-300 font-medium tracking-widest hover:underline flex items-center transition-transform duration-300 hover:translate-x-1'>
                  <FaEnvelope className='mr-2' /> info@joeaffruits.com
                </a>
                <div className='text-lime-300 cursor-pointer flex items-center transition-transform duration-300 hover:translate-x-1'>
                  <FaPhone className='mr-2' /> +91 9340147425
                </div>
                <div className='text-white flex items-center transition-transform duration-300 hover:translate-x-1'>
                  <FaMapMarkerAlt className='mr-2' /> 123 Fruit Avenue, Organic City
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="flex flex-col">
              <h3 className='text-xl font-bold mb-4 pb-2 border-b border-green-500'>Stay Connected</h3>
              <p className='mb-3'>Subscribe to our newsletter for updates and special offers.</p>
              <div className='flex flex-col sm:flex-row w-full gap-2'>
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className='px-4 py-2 rounded-md w-full sm:max-w-[65%] text-gray-800 border focus:outline-none focus:border-0 focus:ring-2 focus:ring-amber-400'
                />
                <button className='bg-amber-500 hover:bg-amber-600 transition-all duration-300 text-white px-4 py-2 rounded-md hover:shadow-lg hover:-translate-y-1 active:translate-y-0'>
                  Subscribe
                </button>
              </div>
              <div className='flex space-x-6 mt-6'>
                <a href="#" className='text-white hover:text-amber-400 text-2xl transform transition-transform duration-300 hover:scale-125'>
                  <FaFacebook />
                </a>
                <a href="#" className='text-white hover:text-amber-400 text-2xl transform transition-transform duration-300 hover:scale-125'>
                  <FaInstagram />
                </a>
                <a href="#" className='text-white hover:text-amber-400 text-2xl transform transition-transform duration-300 hover:scale-125'>
                  <FaTwitter />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className='bg-emerald-900 text-center py-3 text-white text-sm sm:text-base'>
        <div className='container mx-auto px-4'>
          <p>
            © {new Date().getFullYear()} JoeAF Fruits. All rights reserved. | Made with ❤️ by{' '}
            <a 
              href="https://www.fusionlabsai.io" 
              target='_blank' 
              rel="noopener noreferrer" 
              className='font-bold tracking-wide hover:text-amber-400 transition-colors duration-300'
            >
              <span className='text-sky-400'>Fusion</span><span className='text-fuchsia-500'>Labs </span><span>AI</span>
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

export default Footar