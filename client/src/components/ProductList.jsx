import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSingleProduct } from '../redux/slices/ProductDataSlice'
import { useNavigate } from 'react-router-dom';
import { selectUserInfo } from '../redux/slices/UserInfoSlice';

function ProductList({ allProducts }) {
    const intervalRefs = useRef({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector(selectUserInfo);
    const [currentImageIndex, setCurrentImageIndex] = useState({});

    const handleClick = (item) => {
        dispatch(setSingleProduct(item));
        navigate(`/product/${item._id}`);
    }

    const handleEditClick = (item) => {
        dispatch(setSingleProduct(item));
        navigate(`/product/${item._id}/update`);
    }

    useEffect(() => {
        return () => {
            Object.values(intervalRefs.current).forEach(clearInterval);
        }
    }, [])

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 w-full">
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
                        {item.imported && (
                            <div className="text-xs text-blue-600 font-medium mb-1">
                                Imported
                            </div>
                        )}

                        {/* Product Title */}
                        <h3 className="font-semibold text-gray-800 mb-1">
                            {item.name}
                        </h3>

                        {/* Product Variant */}
                        {item.variety && (
                            <div className="text-xs text-gray-500 mb-2 [&_span]:mx-1">
                                <span className="font-medium">[{item.variety}]</span>
                            </div>
                        )}

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 text-xs text-gray-500 mb-2">
                            {item.tags?.map((tag, i) => (
                                <span key={i} className="lowercase">
                                    {tag}{i !== item.tags.length - 1 && ' | '}
                                </span>
                            ))}
                        </div>

                        {/* Weight */}
                        <div className="text-xs text-gray-500 mb-2">
                            {item.quantity} kgs
                        </div>

                        {/* Price Section */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                {item.originalPrice ? (
                                    <>
                                        <span className="text-red-500 font-bold text-lg">
                                            ${Math.round(item.price).toLocaleString()}
                                        </span>
                                        <span className="text-gray-400 text-sm line-through">
                                            ${Math.round(item.originalPrice).toLocaleString()}
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-gray-800 font-bold text-lg">
                                        ¥{Math.round(item.price).toLocaleString()}
                                    </span>
                                )}
                            </div>
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
                                <div className='flex p-2 bg-green-300 text-white rounded-full items-center justify-center cursor-pointer shadow-2xl'>
                                    <i className="fa-solid fa-heart"></i>
                                </div>
                                <div className='flex p-2 bg-green-300 text-white rounded-full items-center justify-center cursor-pointer shadow-2xl'>
                                    <i className="fa-solid fa-cart-shopping"></i>
                                </div>
                                {/* <button
                                    className="w-max px-3 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-700 transition-colors"
                                >
                                    Add to Cart
                                </button> */}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProductList