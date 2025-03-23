import React from 'react'

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { GetUserDetails, LoginRoute, RegisterRoute, selectAuthError, selectUserOnline, selectUserToken, userInfoReset } from "../redux/slices/UserInfoSlice";

const AuthPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userToken = useSelector(selectUserToken);
    const userOnline = useSelector(selectUserOnline);
    const err = useSelector(selectAuthError);
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        gender: "Male",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) setErrors({ ...errors, [name]: "" });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.password) newErrors.password = "Password is required";

        if (!isLogin) {
            if (!formData.firstName) newErrors.firstName = "First name is required";
            if (!formData.lastName) newErrors.lastName = "Last name is required";
            if (!formData.phone) newErrors.phone = "Phone number is required";
            if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Invalid phone number";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        dispatch(userInfoReset());
        if (isLogin) {
            dispatch(LoginRoute(formData));
        }
        else {
            dispatch(RegisterRoute(formData));
        }
    };

    useEffect(() => {
        if (isLoading) {
            if (err && !userOnline) {
                toast.error("Some Error! Please try again.", { autoClose: 5000 }); // Show success toast
                setIsLoading(false);
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    phone: "",
                    gender: "Male",
                })
            }
            else if (userOnline) {
                toast.success("Account successfully created! Please Login to continue", { autoClose: 5000 }); // Show success toast
                setIsLoading(false);
                setIsLogin(true);
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    phone: "",
                    gender: "Male",
                })
            }
        }
    }, [userOnline, err])

    useEffect(() => {
        if (isLoading) {
            if (err && !userToken) {
                toast.error("Some Error! Please try again.", { autoClose: 5000 }); // Show success toast
                setIsLoading(false);
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    phone: "",
                    gender: "Male",
                })
            }
            else if (userToken) {
                toast.success("Login successfully", { autoClose: 5000 }); // Show success toast
                dispatch(GetUserDetails());
                navigate('/');
            }
        }
    }, [userToken, err])

    return (
        <div className="flex h-[92vh] w-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
            <ToastContainer
                position="top-right"
                className="!top-12 !right-6 mt-4 mr-4 z-[9999]"
                toastClassName="!bg-amber-50 !text-green-800 !rounded-xl !shadow-lg"
                progressClassName="!bg-gradient-to-r from-amber-400 to-green-600"
                autoClose={3000}
                newestOnTop
            />

            {/* Loading Overlay */}
            {isLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
                </div>
            )}

            <div className="w-full h-full max-w-md bg-white rounded-xl shadow-lg p-8 overflow-y-scroll hide-scrollbar">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        {isLogin ? "Welcome Back" : "Create Account"}
                    </h2>
                    <p className="text-gray-600">
                        {isLogin ? "Sign in to continue" : "Join our community"}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {!isLogin && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-lg border ${errors.firstName ? "border-red-500" : "border-gray-300"
                                        } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                                />
                                {errors.firstName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                                )}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-lg border ${errors.lastName ? "border-red-500" : "border-gray-300"
                                        } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                                />
                                {errors.lastName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                                )}
                            </div>
                        </div>
                    )}

                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-lg border ${errors.email ? "border-red-500" : "border-gray-300"
                                } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-lg border ${errors.password ? "border-red-500" : "border-gray-300"
                                    } focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-12`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-[35%] text-xl text-gray-500 hover:text-yellow-500"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>

                    {
                        !isLogin && (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="Phone Number"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? "border-red-500" : "border-gray-300"
                                                } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                                        />
                                        {errors.phone && (
                                            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                        )}
                                    </div>
                                    <div>
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        >
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                </div>
                            </>
                        )
                    }

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-amber-400 text-amber-900 py-3 px-4 rounded-lg font-bold hover:bg-amber-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
                    </button>
                </form>

                <div className="mt-8">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-center gap-3">
                        <button
                            type="button"
                            className="w-[60%] flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <FaGoogle className="h-5 w-5 text-gray-800" />
                            <span className="ml-2 text-sm font-medium text-gray-800">
                                Google
                            </span>
                        </button>
                    </div>

                    <p className="pt-2 text-center text-gray-600">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-amber-600 hover:text-amber-700 font-semibold"
                        >
                            {isLogin ? "Sign up" : "Sign in"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;