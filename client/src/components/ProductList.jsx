import React, { useEffect, useRef, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProductToCart, addProductToWishList, removeProductFromCart, removeProductFromWishList, selectCartList, selectWishList, setSingleProduct } from '../redux/slices/ProductDataSlice'
import { selectUserInfo } from '../redux/slices/UserInfoSlice';

function ProductList({ allProducts }) {
    const intervalRefs = useRef({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector(selectUserInfo);
    const userCart = useSelector(selectCartList);
    const userWishList = useSelector(selectWishList);
    const [currentImageIndex, setCurrentImageIndex] = useState({});

    const handleClick = (item) => {
        dispatch(setSingleProduct(item));
        navigate(`/product/${item._id}`);
    }

    const handleEditClick = (item) => {
        dispatch(setSingleProduct(item));
        navigate(`/product/${item._id}/update`);
    }

    // Function to handle the wishlist button click
    const handleWishListClick = async (data) => {
        if (!userInfo) {
            toast.error("Please log in first!", { autoClose: 3000 });
            return;
        }

        const isInList = userWishList.some((item) => item._id === data._id);

        if (!isInList) {
            dispatch(addProductToWishList({ productId: data._id }));
        }
        else {
            dispatch(removeProductFromWishList({ productId: data._id }));
        }
    }

    // Function to handle the Cart button
    const handleCartClick = async (data) => {
        if (!userInfo) {
            toast.error("Please log in first!", { autoClose: 3000 });
            return;
        }

        const isInList = userCart.some((item) => item._id === data._id);

        if (!isInList) {
            dispatch(addProductToCart({ productId: data._id }));
        }
        else {
            dispatch(removeProductFromCart({ productId: data._id }));
        }
    }

    useEffect(() => {
        return () => {
            Object.values(intervalRefs.current).forEach(clearInterval);
        }
    }, [])

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 w-full">
            <ToastContainer position="top-right" />
            
            {allProducts.map((item, index) => (
                <div
                    key={index}
                    className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-shadow relative hover:!scale-105 duration-300 overflow-hidden"
                >
                    {/* Discount Badge */}
                    {item.discountPercentage > 0 && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10">
                            {item.discountPercentage}% OFF
                        </div>
                    )}

                    {/* Product Image */}
                    <div
                        className="relative aspect-square overflow-hidden cursor-pointer"
                        onClick={() => handleClick(item)}
                        onMouseEnter={() => {
                            if (item.images?.length > 1) {
                                if (intervalRefs.current[item._id]) {
                                    clearInterval(intervalRefs.current[item._id]);
                                    delete intervalRefs.current[item._id];
                                }

                                const interval = setInterval(() => {
                                    setCurrentImageIndex(prev => ({
                                        ...prev,
                                        [item._id]: ((prev[item._id] || 0) + 1) % item.images.length
                                    }));
                                }, 2000);
                                intervalRefs.current[item._id] = interval
                            }
                        }}
                        onMouseLeave={() => {
                            if (item.images?.length > 1) {
                                clearInterval(intervalRefs.current[item._id]);
                                delete intervalRefs.current[item._id];
                                setCurrentImageIndex(prev => ({
                                    ...prev,
                                    [item._id]: 0
                                }));
                            }
                        }}
                    >
                        <img
                            src={item.images[currentImageIndex[item._id] || 0]}
                            alt={item.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Product Content */}
                    <div className="p-3">
                        {/* Imported Badge */}
                        {item.origin === "imported" && (
                            <div className="text-xs font-medium mb-1 rounded-md py-1 px-2 bg-gradient-to-r from-blue-300 via-blue-600 to-blue-400 text-white w-min">
                                Imported
                            </div>
                        )}

                        {/* Product Title */}
                        <h3 className="font-semibold sm:text-xl text-md text-gray-800 mb-1">
                            {item.name}
                        </h3>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 text-xs text-gray-500 mb-2">
                            {item.tags?.map((tag, i) => (
                                <span key={i} className="lowercase">
                                    {tag}{i !== item.tags.length - 1 && ' | '}
                                </span>
                            ))}
                        </div>

                        {/* Stock */}
                        <div className="text-xs text-gray-900 mb-2">
                            Stock Available : <span className='text-black text-xs font-bold'>{item.stockQuantity}</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-4 mb-1">
                            <p className="text-2xl font-bold text-gray-900 pt-3">
                                ${item.variants[0].price}
                                {item.variants[0].originalPrice && (
                                    <span className="ml-3 text-sm text-red-500 line-through">
                                        ${item.variants[0].originalPrice + 2}
                                    </span>
                                )}
                            </p>
                            <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                                {item.variants[0].weight} {item.variants[0].unit}
                            </span>
                        </div>
                    </div>

                    {/* Hover Buttons */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white/90 to-transparent pt-4 px-3 transform transition-all duration-300 translate-y-full group-hover:translate-y-0">
                        {userInfo?.role === "Admin" ? (
                            <div className="flex gap-2 justify-end mb-2">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleClick(item);
                                    }}
                                    className="px-3 py-1 rounded-md bg-gray-600 text-white hover:bg-gray-700 transition-colors"
                                >
                                    <i className="fa-solid fa-eye fa-xs mr-1"></i>
                                    View
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleEditClick(item);
                                    }}
                                    className="px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                                >
                                    <i className="fa-solid fa-pen-to-square fa-bounce mr-1"></i>
                                    Edit
                                </button>
                            </div>
                        ) : (
                            <div
                                className='flex w-full gap-3 pb-2 justify-end'
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                            >
                                <div 
                                    className='flex p-2 bg-green-300 text-white rounded-full items-center justify-center cursor-pointer shadow-2xl'
                                    onClick={() => handleWishListClick(item)}
                                >
                                    <i className={`fa-${userWishList.some((data) => data._id === item._id) ? "solid" :  "regular"} fa-heart`} style={{color: "#010813",}}/>
                                </div>
                                <div 
                                    onClick={ () => handleCartClick(item)}
                                    className={`flex p-2 bg-green-300 ${userCart.some(data => data._id === item._id) ? "" : "text-white"} rounded-full items-center justify-center cursor-pointer shadow-2xl`}
                                >
                                    <i className="fa-solid fa-cart-shopping"></i>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProductList