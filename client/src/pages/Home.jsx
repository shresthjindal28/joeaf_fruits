import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify';
import { motion } from "framer-motion";
import { FadeLeft, FadeRight } from '../utility/animation';
import { selectUserInfo } from '../redux/slices/UserInfoSlice';
import { addProductToWishList, getAllProducts, getUserWishList, removeProductFromWishList, selectAllProducts, selectWishList, setSingleProduct } from '../redux/slices/ProductDataSlice'

function Home() {
    const timerRef = useRef(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [opacity, setOpacity] = useState(1);
    const [imgNumber, setImgNumber] = useState(1);

    const userInfo = useSelector(selectUserInfo);
    const userWishList = useSelector(selectWishList);
    const allProducts = useSelector(selectAllProducts);

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

    // Function to handle the wishlist button click
    const handleWishListClick = async (item) => {
        if (!userInfo) {
            toast.error("Please log in first!", { autoClose: 3000 });
            return;
        }

        const isInList = userWishList.some((e) => e === item._id);

        if (!isInList) {
            dispatch(addProductToWishList({ productId: item._id }));
        }
        else {
            dispatch(removeProductFromWishList({ productId: item._id }));
        }
    }

    useEffect(() => {
        dispatch(getAllProducts())
    }, [])

    useEffect(() => {
        if (userInfo) {
            dispatch(getUserWishList());
        }
    }, [userInfo])

    return (
        <div className='flex flex-col w-full h-full overflow-y-scroll hide-scrollbar'>
            <ToastContainer position="top-right" />
            
            <div className='flex flex-col gap-20 w-full h-full'>

                <div className="flex w-full min-h-[650px] bg-[url('/images/home/bg.jpg')] bg-cover lg:bg-[length:100%_auto] bg-center bg-no-repeat brightness-80">
                    <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[650px] rounded-2xl shadow-xl px-5 py-5 md:pb-0 items-center gap-3">
                        <div className='flex flex-col justify-center py-10 md:py-0 relative z-10 backdrop-blur-xs h-min p-2 rounded-2xl absolute inset-0'>
                            <div className='text-left space-y-6 lg:max-w-[400px]'>
                                <motion.span
                                    variants={FadeRight(0.8)}
                                    initial="hidden"
                                    animate="visible"
                                    className='text-5xl lg:text-6xl font-bold leading-relaxed text-red-600'
                                >
                                    Healthy
                                    <br />
                                    Fresh <span className='text-yellow-400'>Fruits!</span>
                                </motion.span>
                                <motion.p
                                    variants={FadeRight(1.2)}
                                    initial="hidden"
                                    animate="visible"
                                    className='text-2xl tracking-wide text-red-700'
                                >
                                    Order Now For Fresh Healthy Life
                                </motion.p>
                                <motion.p
                                    variants={FadeRight(1.6)}
                                    initial="hidden"
                                    animate="visible"
                                    className='text-black'
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
                                variants={FadeLeft(1.2)}
                                initial="hidden"
                                animate="visible"
                                src='/images/main.jpg' alt='' className='rounded-[15rem] object-cover'
                            />
                        </div>
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

                {/*Fruits Section */}
                <div className='flex flex-grow flex-col gap-2 w-full h-full'>
                    <div className='flex font-bold text-2xl pl-5 mb-4'>Organic Products</div>
                    <div className="grid gap-4 lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 px-5">
                        {allProducts.slice(0, 6).map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.03 }}
                                className="group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                            >
                                {/* Product Image */}
                                <div className="relative aspect-square bg-gray-100 overflow-hidden">
                                    <img
                                        src={item.images[0]}
                                        alt={item.name}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />

                                    {/* Hover Buttons (Appear from Bottom) */}
                                    <div
                                        className="flex justify-center absolute top-0 left-0 right-0 bg-gradient-to-t from-transparent via-white/10 to-white/30 pt-4 px-3 transform transition-all duration-300 translate-y-[-80px] group-hover:translate-y-0"
                                    >
                                        <div className='flex items-center w-min justify-between gap-4 px-3 py-1 rounded-2xl bg-white/70'>
                                            <button
                                                onClick={handleWishListClick}
                                                className="hover:bg-white/50 rouned-full p-1"
                                            >
                                                <i className={`fa-${userWishList.some((e) => e === item._id) ? "solid" : "regular"} fa-heart fa-lg`} />
                                            </button>
                                            <button className="hover:bg-white/50 rouned-full p-1">
                                                {/* 🛒 */}
                                                <i className="fa-solid fa-cart-shopping" style={{ color: "#01060e", }} />
                                            </button>
                                            <button className="hover:bg-white/50 rouned-full p-1" onClick={() => (handleFruitClick(item))}>
                                                <i className="fa-solid fa-up-right-and-down-left-from-center"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className="p-3 text-center">
                                    <p className="text-lg font-semibold text-gray-800 mb-1">{item.name}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="flex w-full sm:justify-end justify-center lg:px-25 md:px-20 sm:px-15 pb-10">
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
