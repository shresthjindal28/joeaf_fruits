import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getAllProducts, getUserWishList, selectAllProducts, setSingleProduct } from '../redux/slices/ProductDataSlice'
import { motion } from "framer-motion";
import { FadeLeft, FadeRight } from '../utility/animation';
import { selectUserInfo } from '../redux/slices/UserInfoSlice';

function Home() {
    const timerRef = useRef(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [imgNumber, setImgNumber] = useState(1)
    const [opacity, setOpacity] = useState(1)
    
    const userInfo = useSelector(selectUserInfo);
    const allProducts = useSelector(selectAllProducts)

    const changeImage = useCallback((direction) => {
        // Fade out the current image
        setOpacity(0)
        // Wait for fade-out to complete before changing image (adjust timing to match your duration)
        setTimeout(() => {
            setImgNumber((prev) => (direction === 'left'
                ? (prev === 1 ? 4 : prev - 1)
                : (prev === 4 ? 1 : prev + 1)
            ))
            // Fade in the new image
            setOpacity(1)
        }, 500) // 500ms should match the transition duration below
    }, [])

    // Function to reset timer
    const resetTimer = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current)
        }
        timerRef.current = setInterval(() => {
            changeImage('right')
        }, 3000)
    }, [changeImage])

    // On mount, start timer
    useEffect(() => {
        resetTimer()
        return () => clearInterval(timerRef.current)
    }, [resetTimer])

    // Update timer on manual click
    const handleImgChange = (direction) => {
        changeImage(direction)
        resetTimer()
    }

    const handleFruitClick = (fruit) => {
        dispatch(setSingleProduct(fruit))
        navigate(`/product/${fruit._id}`)
    }

    useEffect(() => {
        dispatch(getAllProducts())
    }, [])

    useEffect( () => {
        if (userInfo){
            dispatch(getUserWishList());
        }
    }, [userInfo])

    return (
        <div className='flex flex-col w-full h-full overflow-y-scroll hide-scrollbar'>
            <div className='flex flex-col gap-5 w-full h-full lg:px-20 md:px-10 sm:px-5 py-5'>
                
                <div className='container grid grid-cols-1 md:grid-cols-2 min-h-[650px] bg-gradient-to-r from-zinc-100 to-zinc-200 rounded-2xl shadow-xl px-5 pb-5 md:pb-0'>
                    <div className='flex flex-col justify-center py-10 md:py-0 relative z-10'>
                        <div className='text-left space-y-6 lg:max-w-[400px]'>
                            <motion.span 
                                variants={FadeRight(0.8)}
                                initial="hidden"
                                animate="visible"
                                className='text-5xl lg:text-6xl font-bold leading-relaxed'
                            >
                                Healthy
                                <br />
                                Fresh <span className='text-yellow-400'>Fruits!</span>
                            </motion.span>
                            <motion.p 
                                variants={FadeRight(1.2)}
                                initial="hidden"
                                animate="visible"
                                className='text-2xl tracking-wide'
                            >
                                Order Now For Fresh Healthy Life
                            </motion.p>
                            <motion.p 
                                variants={FadeRight(1.6)}
                                initial="hidden"
                                animate="visible"
                                className='text-gray-500'
                            >
                                Healthy and yummy food for fresh morning breakfast. Eat Daily for good health and mind Order now and get 20% off on your first order
                            </motion.p>
                            <motion.div
                                variants={FadeRight(1.8)}
                                initial="hidden"
                                animate="visible" 
                                className='flex justify-center md:justify-start'
                            >
                                <Link to='/allproducts' className='bg-red-700 text-white font-semibold py-3 px-6 rounded-xl shadow-[0px_10px_14px_-7px_#de0029] hover:!scale-110 duration-300 cursor-pointer items-center'>
                                    <i className="fa-solid fa-bag-shopping fa-xl pr-3"></i>
                                    Order Now
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                    <div className='flex items-center justify-center'>
                        <motion.img 
                            // initial={{opacity: 0, x: 200, rotate: 75}}
                            // animate={{opacity: 1, x: 0, rotate: 0}}
                            // transition={{ duration: 1, delay: 0.2}}
                            variants={FadeLeft(1.2)}
                            initial="hidden"
                            animate="visible"
                            src='/images/main.jpg' alt='' className='rounded-[15rem] object-cover'
                        />
                    </div>
                </div>

                <div className='flex gap-2 items-center w-full h-96 md:px-20 sm:px-10 xs:px-5 rounded-xl relative'>
                    <div
                        className='flex py-4 px-2 rounded-md cursor-pointer hover:bg-gray-300 z-10'
                        onClick={() => handleImgChange('left')}
                    >
                        <i className="fa-solid fa-chevron-left fa-2xl" />
                    </div>
                    {/* Wrap image in a container with relative positioning */}
                    <div className="w-full h-96 overflow-hidden relative">
                        <img
                            src={`/images/img${imgNumber}.jpg`}
                            alt=''
                            className={`rounded-xl w-full h-96 object-cover transition-opacity duration-500`}
                            style={{ opacity }}
                        />
                    </div>
                    <div
                        className='flex py-4 px-2 rounded-md cursor-pointer hover:bg-gray-300 z-10'
                        onClick={() => handleImgChange('right')}
                    >
                        <i className="fa-solid fa-chevron-right fa-2xl" />
                    </div>
                </div>

                <div className='flex flex-grow flex-col gap-2 w-full h-full md:px-15 sm:px-5'>
                    <div className='flex font-bold text-2xl pl-5'>Some Trending Fruit</div>
                    <div className='grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 px-5'>
                        {allProducts.slice(0, 4).map((fruit, index) => (
                            <div
                                key={index}
                                className='flex flex-col items-center gap-2 rounded-md p-4 hover:bg-gray-300 cursor-pointer shadow-[0px_10px_14px_-7px_#777373] hover:!scale-110 duration-300'
                                onClick={() => handleFruitClick(fruit)}
                            >
                                <img
                                    src={fruit.images[0]}
                                    alt=''
                                    className='rounded-md w-32 h-32'
                                />
                                <div className='flex items-center text-xl font-semibold py-1 px-2 rounded-md bg-gradient-to-r from-black/50 to-black/90 text-white'>
                                    {fruit.type}
                                </div>
                                <div className='flex items-center text-xl font-bold'>
                                    ${fruit.price}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex w-full sm:justify-end justify-center lg:px-25 md:px-20 sm:px-15">
                    <div
                        className='flex w-max px-10 rounded-md border-black border-2 items-center py-2 gap-4 sm:text-xl text-lg font-bold cursor-pointer bg-gradient-to-r from-gray-400 hover:black/50 hover:to-black/80 hover:text-white shadow-[0px_10px_14px_-7px_#777373] hover:!scale-108 duration-300'
                        onClick={() => navigate('allproducts')}
                    >
                        Explore More.....
                        <i className="fa-solid fa-angles-right fa-2xl" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
