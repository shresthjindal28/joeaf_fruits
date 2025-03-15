import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify';
import { motion } from "framer-motion";
import { FadeLeft, FadeRight } from '../utility/animation';
import { selectUserInfo } from '../redux/slices/UserInfoSlice';
import { addProductToCart, addProductToWishList, getAllProducts, getUserCartList, getUserWishList, removeProductFromCart, removeProductFromWishList, selectAllProducts, selectCartList, selectWishList, setSingleProduct } from '../redux/slices/ProductDataSlice'

function Home() {
    const timerRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [opacity, setOpacity] = useState(1);
    const [columns, setColumns] = useState(1);
    const [imgNumber, setImgNumber] = useState(1);

    const userInfo = useSelector(selectUserInfo);
    const userCart = useSelector(selectCartList);
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

        const isInList = userWishList.some((e) => e._id === item._id);

        if (!isInList) {
            dispatch(addProductToWishList({ productId: item._id }));
        }
        else {
            dispatch(removeProductFromWishList({ productId: item._id }));
        }
    }

    // Function to handle the add to cart button
    const handleAddToCart = async (item) => {
        if (!userInfo) {
            toast.error("Please log in first!", { autoClose: 3000 });
            return;
        }

        const isInList = userCart.some((e) => e._id === item._id);

        if (!isInList) {
            dispatch(addProductToCart({ productId: item._id }));
        }
        else {
            dispatch(removeProductFromCart({ productId: item._id }));
        }
    }

    useEffect(() => {
        dispatch(getAllProducts())
    }, [])

    useEffect(() => {
        if (userInfo?.role !== "Admin") {
            dispatch(getUserWishList());
            dispatch(getUserCartList());
        }
    }, [userInfo])

    return (
        <div className='flex flex-col w-full h-full overflow-y-scroll hide-scrollbar'>
            <ToastContainer position="top-right" />

            <div className='flex flex-col gap-20 w-full h-full'>

                {/* Hero Section */}
                <div className="relative w-screen h-screen bg-gradient-to-br from-amber-100/80 to-green-50 overflow-hidden">
                    <div className="flex relative w-screen h-screen bg-[url('/images/home/bg.jpg')] bg-cover bg-center bg-no-repeat overflow-hidden">
                        {/* Background Overlay */}
                        <div className="absolute inset-0 bg-black/30 brightness-90"></div>
                        <div className='flex w-full h-full sm:justify-end justify-center items-center px-3'>
                            <motion.div
                                className='flex flex-col w-full xl:max-w-[40%] lg:max-w-[50%] md:max-w-[65%] sm:max-w-[80%] max-w-[95%] relative z-10 bg-white/50 px-6 py-8 rounded-2xl shadow-2xl border-2 border-amber-200'
                                initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className='text-left space-y-6'>
                                    <motion.span
                                        variants={FadeRight(0.8)}
                                        initial="hidden"
                                        animate="visible"
                                        className='text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 to-green-800 bg-clip-text text-transparent'
                                    >
                                        <i className="fa-solid fa-leaf mr-4 text-amber-600" />
                                        Royal Mangoes
                                        <br />
                                        <span className='text-green-800'>Direct from Farms</span>
                                    </motion.span>

                                    <motion.p
                                        variants={FadeRight(1.2)}
                                        initial="hidden"
                                        animate="visible"
                                        className='text-xl sm:text-2xl text-amber-800 font-semibold'
                                    >
                                        <span className='border-b-2 border-amber-600 pb-1'>Season's Finest Selection</span>
                                    </motion.p>

                                    <motion.p
                                        variants={FadeRight(1.6)}
                                        initial="hidden"
                                        animate="visible"
                                        className='text-gray-700 text-base sm:text-lg leading-relaxed'
                                    >
                                        Experience the golden sweetness of hand-picked, organic mangoes.
                                        <span className='block mt-2 text-amber-700 font-medium'>
                                            🥭 First order discount: 20% OFF
                                        </span>
                                    </motion.p>

                                    <motion.div
                                        variants={FadeRight(1.8)}
                                        initial="hidden"
                                        animate="visible"
                                        className='flex justify-center md:justify-start'
                                    >
                                        <Link
                                            to='/shop'
                                            className='bg-gradient-to-r from-amber-500 to-green-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-3'
                                        >
                                            <i className="fa-solid fa-bag-shopping h-6 w-6" />
                                            <span>Shop Mangoes</span>
                                        </Link>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Mango Varieties Carousel */}
                <div className='relative h-[550px] w-full py-20 px-2'>
                    <div className='absolute inset-0 bg-amber-50/80 shadow-inner' />

                    <div className='relative flex items-center h-full z-10 w-full sm:gap-2 xl:px-20 lg:px-15 md:px-10 sm:px-5'>
                        <button
                            onClick={() => handleImgChange('left')}
                            className='p-2 text-amber-800 hover:text-amber-900 hover:bg-amber-100 rounded-full transition-all'
                        >
                            <i className="fa-solid fa-chevron-left" />
                        </button>

                        <div className="w-full h-full overflow-hidden relative rounded-2xl shadow-lg">
                            <img
                                src={`/images/img${imgNumber}.jpg`}
                                alt='Mango varieties'
                                loading='lazy'
                                className={`rounded-2xl w-full h-full object-cover transition-opacity duration-500 border-4 border-amber-100`}
                                style={{ opacity }}
                            />
                            <div className='absolute bottom-4 sm:left-4 left-2 sm:text-xl text-xs bg-amber-100/90 px-4 py-2 rounded-full text-amber-800 font-semibold'>
                                Premium Mango Collection
                            </div>
                        </div>

                        <button
                            onClick={() => handleImgChange('right')}
                            className='p-2 text-amber-800 hover:text-amber-900 hover:bg-amber-100 rounded-full transition-all'
                        >
                            <i className="fa-solid fa-chevron-right" />
                        </button>
                    </div>
                </div>

                {/* Featured Mangoes */}
                <div className='flex flex-col gap-8 w-full px-4 py-20'>
                    <h2 className='text-4xl font-bold text-center bg-gradient-to-r from-amber-600 to-green-800 bg-clip-text text-transparent'>
                        <i className="fa-solid fa-leaf mr-4" />
                        Our Royal Varieties
                    </h2>

                    <div className="grid gap-4 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-2 grid-cols-1 xl:px-10 lg:px-20 md:px-10 sm:px-5 xs:px-4">
                        {allProducts && allProducts.slice(0, 6).map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.03 }}
                                className="group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                            >
                                {/* Product Image */}
                                <div className="relative aspect-square bg-gray-100 overflow-hidden">
                                    <img
                                        src={item.images[0]}
                                        alt=""
                                        loading='lazy'
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />

                                    {/* Hover Buttons (Appear from top) */}
                                    <div
                                        className="flex justify-center absolute top-0 left-0 right-0 bg-gradient-to-t from-transparent via-white/10 to-white/30 pt-4 px-3 transform transition-all duration-300 translate-y-[-80px] group-hover:translate-y-0"
                                    >
                                        <div className='flex items-center w-min justify-between gap-4 px-3 py-1 rounded-2xl bg-white/70'>
                                            {
                                                userInfo?.role === "Admin" ? (
                                                    <>
                                                        <button
                                                            onClick={() => {
                                                                dispatch(setSingleProduct(item));
                                                                navigate(`/product/${item._id}/update`);
                                                            }}
                                                            className="hover:bg-white/50 rouned-full p-1"
                                                        >
                                                            <i className="fa-solid fa-pen-to-square fa-bounce" />
                                                        </button>
                                                    </>
                                                )
                                                    :
                                                    (
                                                        <>
                                                            <button
                                                                onClick={() => handleWishListClick(item)}
                                                                className="hover:bg-white/50 rouned-full p-1"
                                                            >
                                                                <i className={`fa-${userWishList.some((e) => e._id === item._id) ? "solid" : "regular"} fa-heart fa-lg`} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleAddToCart(item)}
                                                                className="hover:bg-white/50 rouned-full p-1 font-bold text-black"
                                                            >
                                                                {
                                                                    userCart.some((e) => e._id === item._id) ? (
                                                                        <i className={`fa-solid fa-cart-shopping`} style={{ color: "#01060e", }} />
                                                                    )
                                                                        : (
                                                                            <span className="text-black">🛒</span>
                                                                        )
                                                                }
                                                            </button>
                                                        </>
                                                    )
                                            }
                                            <button className="hover:bg-white/50 rouned-full p-1" onClick={() => (handleFruitClick(item))}>
                                                <i className="fa-solid fa-up-right-and-down-left-from-center"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className="px-3 pt-3 h-16 text-center">
                                    <p className="text-lg font-semibold text-gray-800 mb-1">{item.name}</p>
                                </div>

                                {/* Price */}
                                <div className="flex px-3 justify-between items-center mb-1">
                                    <span className="text-sm px-2 py-1 rounded bg-gradient-to-r from-gray-400 via-gray-500 to-gray-400 text-white">
                                        {item.variants[0].weight} {item.variants[0].unit}
                                    </span>
                                    <p className="text-lg font-bold text-gray-900 pt-3">
                                        ${item.variants[0].price}
                                        {item.variants[0].originalPrice && (
                                            <span className="ml-3 text-sm text-red-500 line-through">
                                                ${item.variants[0].originalPrice + 2}
                                            </span>
                                        )}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="flex justify-center pt-8">
                        <button
                            onClick={() => navigate('/shop')}
                            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-green-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:gap-4 hover:scale-105"
                        >
                            <span>Explore All Varieties</span>
                            <i className="fa-solid fa-angle-right" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home