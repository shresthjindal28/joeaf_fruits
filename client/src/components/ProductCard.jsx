import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUserInfo } from '../redux/slices/UserInfoSlice';
import { addProductToCart, addProductToWishList, removeProductFromCart, removeProductFromWishList, selectCartList, selectWishList, setSingleProduct } from '../redux/slices/ProductDataSlice';

const ProductCard = React.memo(({ product }) => {
    const intervalRefs = useRef({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector(selectUserInfo);
    const userCart = useSelector(selectCartList);
    const userWishList = useSelector(selectWishList);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
            if (intervalRefs.current[product._id]) {
                clearInterval(intervalRefs.current[product._id]);
            }
        };
    }, [product._id]);

    return (
        <div className="relative flex w-full h-full sm:px-4 w-full">
            <div
                className="group w-full xl:h-[69vh] sm:h-[70vh] h-[70vh] bg-gradient-to-br from-amber-50 via-yellow-50 to-green-50 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 relative border-2 border-amber-100"
            >
                {/* Discount & Origin Badges */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                    {product.discountPercentage > 0 && (
                        <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                            {product.discountPercentage}% OFF
                        </div>
                    )}
                    {product.origin === "imported" && (
                        <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                            <i className="fa-solid fa-globe mr-1" /> Imported
                        </div>
                    )}
                </div>

                {/* Product Image */}
                <div className="w-full flex-grow max-h-[30vh] relative aspect-square overflow-hidden cursor-pointer" onClick={() => handleClick(item)}
                    onMouseEnter={() => {
                        if (product.images?.length > 1) {
                            if (intervalRefs.current[product._id]) {
                                clearInterval(intervalRefs.current[product._id]);
                                delete intervalRefs.current[product._id];
                            }

                            const interval = setInterval(() => {
                                setCurrentImageIndex(prev => ({
                                    ...prev,
                                    [product._id]: ((prev[product._id] || 0) + 1) % product.images.length
                                }));
                            }, 2000);
                            intervalRefs.current[product._id] = interval
                        }
                    }}
                    onMouseLeave={() => {
                        if (product.images?.length > 1) {
                            clearInterval(intervalRefs.current[product._id]);
                            delete intervalRefs.current[product._id];
                            setCurrentImageIndex(prev => ({
                                ...prev,
                                [product._id]: 0
                            }));
                        }
                    }}
                >
                    <img
                        src={product.images[currentImageIndex[product._id] || 0]}
                        alt=""
                        loading='lazy'
                        className="w-full h-[38vh] object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Product Content */}
                <div className="px-3 py-2 h-full bg-white/90">
                    {/* Product Title */}
                    <span className="font-bold text-lg text-green-800 mb-1">
                        {product.name}
                        <span className="block text-sm font-normal text-amber-600 mb-2">'Premium Mango'</span>
                    </span>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-2">
                        {product.tags?.slice(0, 4).map((tag, i) => (
                            <span key={i} className="text-[10px] bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                                #{tag}
                            </span>
                        ))}
                    </div>

                    {/* Stock & Weight */}
                    <div className="flex justify-between items-center mb-2">
                        <div className="text-xs font-medium text-green-700">
                            <i className="fa-solid fa-box-open mr-2" />
                            {product.stockQuantity} in stock
                        </div>
                        <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full">
                            <i className="fa-solid fa-weight-hanging mr-2" />
                            {product.variants[0].weight}{product.variants[0].unit}
                        </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-end justify-between">
                        <div>
                            <p className="text-xl font-bold text-green-700">
                                ${product.variants[0].price}
                                {product.variants[0].originalPrice && (
                                    <span className="ml-2 text-base text-red-500 line-through">
                                        ${product.variants[0].originalPrice}
                                    </span>
                                )}
                            </p>
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
                                    handleClick(product);
                                }}
                                className="px-3 py-1 rounded-md bg-gray-600 text-white hover:bg-gray-700 transition-colors"
                            >
                                <i className="fa-solid fa-eye fa-xs mr-1"></i>
                                View
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditClick(product);
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
                                onClick={() => handleWishListClick(product)}
                            >
                                <i className={`fa-${userWishList.some((data) => data._id === product._id) ? "solid" : "regular"} fa-heart`} style={{ color: "#010813", }} />
                            </div>
                            <div
                                onClick={() => handleCartClick(product)}
                                className={`flex p-2 bg-green-300 ${userCart.some(data => data._id === product._id) ? "" : "text-white"} rounded-full items-center justify-center cursor-pointer shadow-2xl`}
                            >
                                <i className="fa-solid fa-cart-shopping"></i>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
});

export default ProductCard;