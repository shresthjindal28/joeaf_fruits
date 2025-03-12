import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUserInfo } from '../redux/slices/UserInfoSlice';

function CheckoutPage() {
    const userInfo = useSelector(selectUserInfo);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        deliveryAddress: '',
        phone: '',
    })

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    useState(() => {
        if (userInfo) {
            setFormData({
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                email: userInfo.email,
                address: "",
                phone: userInfo.phone,
            })
        }
    }, [userInfo])

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-yellow-50 flex flex-col items-center py-6 sm:px-5 md:px-8 relative overflow-hidden">
            {/* Animated Background Icons */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
                <i className="fa-solid fa-citrus text-yellow-300 text-8xl absolute top-20 right-20 animate-spin-slow" />
                <i className="fa-solid fa-wheat-awn text-amber-400 text-6xl absolute bottom-32 left-32 animate-pulse" />
                <i className="fa-solid fa-strawberry text-red-300 text-7xl absolute top-1/3 left-1/4 animate-bounce" />
                <i className="fa-solid fa-seedling text-green-400 text-9xl absolute top-3/4 right-1/3 animate-float" />
            </div>

            <div className="relative z-10 w-full max-w-4xl px-3">
                {/* Header with Decorative Icons */}
                <div className="flex items-center justify-center gap-2.5 mb-12">
                    <i className="fa-solid fa-basket-shopping sm:text-5xl text-4xl text-amber-600" />
                    <h1 className="sm:text-4xl text-2xl font-bold text-green-800 text-center">
                        Fresh Checkout
                        <i className="fa-solid fa-leaf sm:text-3xl text-2xl text-green-500 ml-3" />
                    </h1>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Shipping Details - Enhanced with Input Icons */}
                    <div className="bg-white rounded-xl shadow-lg p-4 border-2 border-green-100 relative">
                        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                            <i className="fa-solid fa-map-location-dot text-3xl bg-amber-100 p-3 rounded-full text-green-600" />
                        </div>

                        <h2 className="text-2xl font-bold text-green-800 mb-6 text-center mt-4">
                            Shipping Details
                        </h2>

                        <form className="space-y-6">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="relative">
                                    <i className="fa-solid fa-user absolute left-2.5 top-1/2 -translate-y-1/2 text-amber-500" />
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleFormChange}
                                        placeholder="First Name"
                                        className="w-full pl-8 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 bg-amber-50"
                                    />
                                </div>
                                <div className="relative">
                                    <i className="fa-solid fa-user-tag absolute left-2.5 top-1/2 -translate-y-1/2 text-amber-500" />
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleFormChange}
                                        placeholder="Last Name"
                                        className="w-full pl-9 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 bg-amber-50"
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <i className="fa-solid fa-location-dot absolute left-3 top-4 text-amber-500" />
                                <textarea
                                    placeholder="Delivery Address"
                                    id="deliveryAddress"
                                    name="deliveryAddress"
                                    value={formData.deliveryAddress}
                                    onChange={handleFormChange}
                                    className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 bg-amber-50 min-h-[100px]"
                                />
                            </div>

                            <div className="relative">
                                <i className="fa-solid fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-amber-500" />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleFormChange}
                                    placeholder="Email Address"
                                    className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 bg-amber-50"
                                />
                            </div>

                            <div className="relative">
                                <i className="fa-solid fa-mobile-screen absolute left-3 top-1/2 -translate-y-1/2 text-amber-500" />
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleFormChange}
                                    placeholder="Contact Number"
                                    className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 bg-amber-50"
                                />
                            </div>
                        </form>
                    </div>

                    {/* Order Summary - Enhanced with Visual Elements */}
                    <div className="bg-white rounded-xl shadow-lg p-4 h-fit border-2 border-green-100 relative">
                        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                            <i className="fa-solid fa-receipt text-3xl bg-green-100 p-3 rounded-full text-amber-600" />
                        </div>

                        <h2 className="text-2xl font-bold text-green-800 mb-6 text-center mt-4">
                            Order Summary
                        </h2>

                        {/* Cart Items */}
                        <div className="space-y-6 mb-8">
                            <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                                <div className="flex items-center gap-3 w-full h-full">
                                    <img
                                        src="https://res.cloudinary.com/dyj6xolyl/image/upload/v1741644464/wmpg0mjdh6czvnqbehcx.jpg"
                                        className="w-28 h-20 object-cover rounded-lg border-2 border-amber-100"
                                        alt="Strawberry"
                                    />
                                    <div className='flex flex-col w-full justify-between h-full'>
                                        <span className="font-medium text-green-800">Premium Strawberry</span>
                                        <div className='flex justify-between w-full'>
                                            <p className="text-sm text-amber-600">500g <i className="fa-solid fa-weight-scale ml-2" /></p>
                                            <span className="font-medium text-green-700">$13.00</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pricing Breakdown */}
                        <div className="space-y-4 bg-amber-50 p-4 rounded-lg">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">
                                    <i className="fa-solid fa-basket-shopping mr-2 text-amber-600" />
                                    Subtotal
                                </span>
                                <span className="font-medium">$26.00</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">
                                    <i className="fa-solid fa-gift mr-2 text-red-500" />
                                    Discount
                                </span>
                                <span className="text-red-500">-$2.60</span>
                            </div>
                            <div className="flex justify-between items-center pt-4 border-t border-amber-200">
                                <span className="font-bold text-lg text-green-800">
                                    <i className="fa-solid fa-money-bill-wave mr-2" />
                                    Total
                                </span>
                                <span className="font-bold text-green-600 text-lg">$23.40</span>
                            </div>
                        </div>

                        {/* Payment Section */}
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
                                <i className="fa-solid fa-credit-card text-amber-600" />
                                Secure Payment
                            </h3>
                            <div className="grid grid-cols-4 gap-3">
                                <button className="p-3 border-2 rounded-xl hover:border-green-500 transition-all bg-white flex items-center justify-center">
                                    <i className="fa-brands fa-cc-visa text-3xl text-blue-600" />
                                </button>
                                <button className="p-3 border-2 rounded-xl hover:border-green-500 transition-all bg-white flex items-center justify-center">
                                    <i className="fa-brands fa-cc-mastercard text-3xl text-red-600" />
                                </button>
                                <button className="p-3 border-2 rounded-xl hover:border-green-500 transition-all bg-white flex items-center justify-center">
                                    <i className="fa-brands fa-cc-apple-pay text-3xl text-black" />
                                </button>
                                <button className="p-3 border-2 rounded-xl hover:border-green-500 transition-all bg-white flex items-center justify-center">
                                    <i className="fa-brands fa-google-pay text-3xl text-green-600" />
                                </button>
                            </div>
                            <div className="mt-4 text-center text-sm text-amber-700">
                                <i className="fa-solid fa-shield-check mr-2 text-green-600" />
                                256-bit SSL Secure Connection
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-12 flex flex-col gap-4">
                    <button className="w-full bg-gradient-to-r from-green-500 to-amber-500 text-white py-4 px-6 rounded-xl font-bold hover:from-green-600 hover:to-amber-600 transition-all flex items-center justify-center gap-3 text-lg">
                        <i className="fa-solid fa-lock" />
                        Confirm Secure Payment
                    </button>
                    <Link to="/cart" className="text-center text-amber-700 hover:text-green-700 transition-colors">
                        <i className="fa-solid fa-arrow-left mr-2" />
                        Back to Cart
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;