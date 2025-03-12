import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartList } from '../redux/slices/ProductDataSlice';

function CartPage() {
    const cartItems = useSelector(selectCartList);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-yellow-50 flex flex-col items-center py-8 px-6">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
                <i className="fa-solid fa-apple-whole text-green-300 text-6xl absolute top-20 left-20 animate-float" />
                <i className="fa-solid fa-pepper-hot text-yellow-300 text-8xl absolute top-1/3 right-32 animate-spin-slow" />
                <i className="fa-solid fa-wheat-awn text-amber-400 text-5xl absolute bottom-40 left-44 animate-pulse" />
                <i className="fa-solid fa-pineapple text-green-400 text-7xl absolute bottom-20 right-44 animate-bounce" />
                <i className="fa-solid fa-leaf text-green-300 text-6xl absolute top-20 right-20 animate-float" />
                <i className="fa-solid fa-carrot text-amber-400 text-8xl absolute bottom-32 left-32 animate-spin-slow" />
            </div>

            <div className="relative z-10 w-full max-w-6xl">
                {/* Header with animated icon */}
                <div className="flex items-center gap-3 mb-8 group">
                    <i className="fa-solid fa-basket-shopping lg:text-5xl sm:text-4xl text-3xl text-green-600 animate-bounce group-hover:animate-none" />
                    <h1 className="xl:text-4xl lg:text-3xl md:text-2xl sm:text-1xl text-lg font-bold bg-gradient-to-r from-green-600 to-amber-500 bg-clip-text text-transparent whitespace-nowrap">
                        Your Organic Basket
                    </h1>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        {cartItems.map((item) => (
                            <div key={item._id} className="bg-white rounded-xl shadow-lg sm:p-3 border-2 border-green-100 hover:shadow-xl transition-shadow">
                                <div className="flex gap-3 items-center p-3">
                                    <div className="relative sm:flex hidden">
                                        <img
                                            src={item.images[0]}
                                            alt=""
                                            className="w-48 h-60 object-cover rounded-lg border-2 border-green-100"
                                        />
                                        {item.discountPercentage > 0 && (
                                            <div className="absolute -top-3 -right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
                                                <i className="fa-solid fa-tag mr-1" /> {item.discountPercentage}%
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 h-60">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <label className="sm:text-xl text-md font-bold text-green-900 flex items-center">
                                                <i className="fa-solid fa-seedling text-amber-500 mr-2" />
                                                    {item.name}
                                                </label>
                                                <p className="text-sm text-amber-700 mt-1 mb-2 flex items-center gap-1">
                                                    <i className="fa-solid fa-tag text-xs" /> {item.category}
                                                </p>
                                            </div>
                                            <button className="text-amber-600 hover:text-red-600 transition-colors">
                                                <i className="fa-solid fa-trash-can-arrow-up fa-lg" />
                                            </button>
                                        </div>

                                        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex items-start gap-2">
                                            <i className="fa-solid fa-info-circle text-green-500 mt-1" />
                                            {item.description}
                                        </p>

                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-3 bg-green-50 px-4 py-2 rounded-full">
                                                <button className="w-8 h-8 rounded-full bg-green-200 text-green-700 hover:bg-green-300 transition-colors">
                                                    <i className="fa-solid fa-minus" />
                                                </button>
                                                <span className="font-medium w-6 text-center">{item.quantity}</span>
                                                <button className="w-8 h-8 rounded-full bg-green-200 text-green-700 hover:bg-green-300 transition-colors">
                                                    <i className="fa-solid fa-plus" />
                                                </button>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-lg font-bold text-green-600 flex items-center gap-2">
                                                    ${item.variants[0].price}
                                                    {item.variants[0].originalPrice && (
                                                        <span className="text-sm text-gray-400 line-through">
                                                            ${item.variants[0].originalPrice}
                                                        </span>
                                                    )}
                                                </p>
                                                <div className="capitalize text-sm text-amber-600 flex items-center gap-1 justify-end">
                                                    <i className="fa-solid fa-location-dot" /> {item.origin}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white rounded-xl shadow-lg p-6 h-fit border-2 border-green-100 sticky top-8">
                        <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-2">
                            <i className="fa-solid fa-receipt" />
                            Order Summary
                        </h3>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 flex items-center gap-2">
                                    <i className="fa-solid fa-wallet text-green-500" />
                                    Subtotal
                                </span>
                                <span className="font-medium">$ 100</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 flex items-center gap-2">
                                    <i className="fa-solid fa-scissors text-red-500" />
                                    Discount
                                </span>
                                <span className="text-red-500">-$ 20</span>
                            </div>
                            <div className="flex justify-between items-center border-t pt-4">
                                <span className="font-bold text-lg flex items-center gap-2">
                                    <i className="fa-solid fa-circle-dollar-to-slot" />
                                    Total
                                </span>
                                <span className="font-bold text-green-600 text-lg">$ 80</span>
                            </div>
                        </div>

                        <Link
                            to="/checkout"
                            className="w-full bg-gradient-to-r from-green-500 to-amber-500 text-white py-4 px-6 rounded-xl font-bold hover:from-green-600 hover:to-amber-600 transition-all flex items-center justify-center gap-2 group"
                        >
                            <i className="fa-solid fa-badge-check group-hover:animate-bounce" />
                            Secure Checkout
                            <i className="fa-solid fa-arrow-right-long ml-2 transition-transform group-hover:translate-x-1" />
                        </Link>

                        {/* Continue Shopping */}
                        <div className="mt-6 text-center">
                            <Link to="/allproducts" className="text-green-600 hover:text-amber-600 flex items-center justify-center gap-2">
                                <i className="fa-solid fa-basket-shopping" />
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartPage;