import React from 'react'
import { memo, useEffect, useRef, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUserInfo } from '../redux/slices/UserInfoSlice';
import { 
    addProductToCart, 
    addProductToWishList, 
    removeProductFromCart, 
    removeProductFromWishList, 
    selectCartList, 
    selectWishList, 
    setSingleProduct 
} from '../redux/slices/ProductDataSlice';

const ProductCard = memo(({ product }) => {
    const mainVariant = product.variants?.[0] || {};
    const intervalRefs = useRef({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector(selectUserInfo);
    const userCart = useSelector(selectCartList);
    const userWishList = useSelector(selectWishList);
    const [currentImageIndex, setCurrentImageIndex] = useState({});

    const handleClick = useCallback((item) => {
        dispatch(setSingleProduct(item));
        navigate(`/product/${item._id}`);
    }, [dispatch, navigate]);

    const handleEditClick = useCallback((item) => {
        dispatch(setSingleProduct(item));
        navigate(`/product/${item._id}/update`);
    }, [dispatch, navigate]);

    // Function to handle the wishlist button click
    const handleWishListClick = useCallback(async (data) => {
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
    }, [userInfo, userWishList, dispatch]);

    // Function to handle the Cart button
    const handleCartClick = useCallback(async (data) => {
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
    }, [userInfo, userCart, dispatch]);

    // Clear interval on component unmount
    useEffect(() => {
        return () => {
            if (intervalRefs.current[product._id]) {
                clearInterval(intervalRefs.current[product._id]);
            }
        };
    }, [product._id]);

    // Image slideshow handlers
    const startImageSlideshow = useCallback(() => {
        if (product.images && product.images.length > 1) {
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
            intervalRefs.current[product._id] = interval;
        }
    }, [product._id, product.images]);

    const stopImageSlideshow = useCallback(() => {
        if (product.images && product.images.length > 1) {
            clearInterval(intervalRefs.current[product._id]);
            delete intervalRefs.current[product._id];
            setCurrentImageIndex(prev => ({
                ...prev,
                [product._id]: 0
            }));
        }
    }, [product._id, product.images]);

    // Check if product is in wishlist/cart
    const isInWishList = userWishList?.some((data) => data._id === product._id) || false;
    const isInCart = userCart?.some(data => data._id === product._id) || false;

    // Ensure we have valid product images
    const productImages = Array.isArray(product.images) && product.images.length > 0 
        ? product.images 
        : ['https://via.placeholder.com/300?text=No+Image'];

    return (
        <div className="relative flex w-full h-full sm:px-4">
            <div
                onClick={() => handleClick(product)}
                className="group w-full xl:h-[69vh] sm:h-[70vh] h-[70vh] bg-gradient-to-br from-amber-50 via-yellow-50 to-green-50 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 relative border-2 border-amber-100"
            >
                {/* Discount & Origin Badges */}
                {((mainVariant.discountPercentage > 0 || product.discountPercentage > 0) || product.origin === "imported") && (
                    <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                        {(mainVariant.discountPercentage > 0 || product.discountPercentage > 0) && (
                            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                                {(mainVariant.discountPercentage || product.discountPercentage)}% OFF
                            </div>
                        )}
                        {product.origin === "imported" && (
                            <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                                <i className="fa-solid fa-globe mr-1" /> Imported
                            </div>
                        )}
                    </div>
                )}

                {/* Product Image */}
                <div 
                    className="w-full flex-grow max-h-[30vh] relative aspect-square overflow-hidden cursor-pointer"
                    onMouseEnter={startImageSlideshow}
                    onMouseLeave={stopImageSlideshow}
                >
                    <img
                        src={productImages[currentImageIndex[product._id] || 0]}
                        alt={product.name}
                        loading='lazy'
                        className="w-full h-[38vh] object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/300?text=Error+Loading';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Product Information */}
                <div className="p-2.5 space-y-3">
                    {/* Name and Origin */}
                    <div className="flex justify-between items-start">
                        <label className="sm:text-lg text-md font-bold text-amber-800">{product.name}</label>
                        <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full whitespace-nowrap">
                            <i className={`fas fa-globe-${product.origin === 'indian' ? 'asia' : 'americas'} fa-lg mr-1`}></i>
                            {product.origin.charAt(0).toUpperCase() + product.origin.slice(1)}
                        </span>
                    </div>

                    {/* Size and Weight */}
                    <div className="flex gap-2 text-sm">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            <i className="fas fa-ruler mr-1"></i>
                            {mainVariant.size.charAt(0).toUpperCase() + mainVariant.size.slice(1)}
                        </span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            <i className="fas fa-weight-hanging mr-1"></i>
                            {mainVariant.singlePieceWeight}
                            {mainVariant.weightUnit}
                        </span>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-xl font-bold text-green-700">
                                ₹{mainVariant.price}
                                <span className="text-sm font-normal ml-1">/{mainVariant.pricingUnit}</span>
                            </span>
                            {mainVariant.originalPrice && (
                                <span className="ml-2 text-sm text-red-500 line-through">
                                    ₹{mainVariant.originalPrice}
                                </span>
                            )}
                        </div>
                        <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full whitespace-nowrap">
                            <i className="fas fa-box-open mr-1"></i>
                            {product.stockQuantity} in stock
                        </span>
                    </div>

                    {/* Tags */}
                    {product.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                            {product.tags.slice(0, 3).map((tag, i) => (
                                <span key={i} className="text-[10px] bg-amber-100 text-amber-800 px-2 py-1 rounded-full whitespace-nowrap">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
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
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div
                                className='flex p-2 bg-green-300 text-white rounded-full items-center justify-center cursor-pointer shadow-2xl'
                                onClick={() => handleWishListClick(product)}
                            >
                                <i className={`fa-${isInWishList ? "solid" : "regular"} fa-heart`} style={{ color: "#010813" }} />
                            </div>
                            <div
                                onClick={() => handleCartClick(product)}
                                className={`flex p-2 bg-green-300 ${isInCart ? "" : "text-white"} rounded-full items-center justify-center cursor-pointer shadow-2xl`}
                            >
                                <i className="fa-solid fa-cart-shopping"></i>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});

ProductCard.displayName = 'ProductCard';
export default ProductCard;