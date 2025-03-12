import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from './Sidebar';
import { menuList } from '../lib/Constants';
import { selectCartList } from '../redux/slices/ProductDataSlice';
import { selectUserInfo, selectUserOnline, userInfoReset } from '../redux/slices/UserInfoSlice'
import CartDropdown from './CartDropdown';

function Navbar() {
    const dispatch = useDispatch();
    const userInfo = useSelector(selectUserInfo);
    const userCartList = useSelector(selectCartList);
    const userOnline = useSelector(selectUserOnline);

    const [sidebar, setSideBar] = useState(false);
    const [menuClick, setMenuClick] = useState(true);
    const [showCart, setShowCart] = useState(false);

    const handleMenuClick = () => {
        setMenuClick(!menuClick);
    }

    const handleLogout = () => {
        setMenuClick(!menuClick);
        dispatch(userInfoReset());
    }

    return (
        <div className='flex min-h-16 w-full'>
            <div className='flex w-full px-3 pt-0 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 justify-between relative'>
                <div className='flex lg:w-3/4 md:w-4/5 w-full lg:gap-70 md:gap-20 h-full'>
                    <div className='flex xl:ps-5 lg:ps-4 sm:ps-2 ps-1 px-3 lg:text-2xl text-xl text-nowrap text-orange-700 font-bold items-center sm:justify-center justify-start '>
                        <i className="fa-solid fa-leaf fa-lg mr-2 " style={{ color: "#fae905", }} />
                        <Link to={"/sfdlfjsdjf"}>Joeaf Fruits</Link>
                    </div>
                    <div className='md:flex hidden items-center gap-4 text-amber-800'>
                        {
                            menuList.map((item, index) => (
                                <Link key={index} to={item.link} className='lg:text-sm hover:!text-amber-900 text-sm font-bold hover:!scale-110 duration-300 text-nowrap'>{item.name}</Link>
                            ))
                        }
                    </div>
                </div>

                <div className={`md:flex hidden lg:w-1/4 w-1/5 h-full justify-end items-center pr-5 ${userInfo ? "py-2 gap-3" : ""}`}>
                    {
                        userOnline ? (
                            <>
                                {/* Cart */}
                                {showCart && <CartDropdown />}
                                {
                                    userInfo?.role !== "Admin" && <div className='relative flex items-center gap-2 text-3xl cursor-pointer' onClick={() => (setShowCart(!showCart))}>
                                        🛒
                                        <div className={`${userCartList?.length > 0 ? "flex" : "hidden"} absolute top-0.5 right-0.5 bg-red-500 text-white text-xs px-1 rounded-full`}>
                                            {userCartList.length}
                                        </div>
                                    </div>
                                }
                                {
                                    sidebar ?
                                        <div className='flex h-full w-full'>
                                            <Sidebar setState={setSideBar} />
                                        </div>
                                        :
                                        <div className='flex gap-2 items-center h-10 border-2 border-black rounded-md px-2 hover:shadow-2xl bg-yellow-300 cursor-pointer'>
                                            <div className='flex rounded-full h-max items-center' onClick={() => setSideBar(!sidebar)}>
                                                {
                                                    userInfo?.avatar ?
                                                        <div className='flex'>
                                                            <img className='w-10 h-10 rounded-full' src={userInfo?.avatar} alt='' />
                                                        </div>
                                                        : <i className='fa fa-user' />
                                                }
                                            </div>
                                        </div>
                                }
                            </>
                        )
                            :
                            <Link to='/auth' className='lg:text-md text-md font-semibold py-1 px-4 bg-gradient-to-r from-amber-600 to-amber-900 hover:from-amber-500 hover:to-amber-700 hover:shadow-2xl text-white rounded-md'>Login</Link>
                    }
                </div>

                <div className='md:hidden flex gap-3 items-center'>
                    {/* Cart */}
                    {showCart && <CartDropdown />}
                    {
                        userInfo?.role !== "Admin" && <div className='relative flex items-center gap-2 text-2xl cursor-pointer' onClick={() => (setShowCart(!showCart))}>
                            🛒
                            <div className={`${userCartList?.length > 0 ? "flex" : "hidden"} absolute top-0.5 right-0.5 bg-red-500 text-white text-xs px-1 rounded-full`}>
                                {userCartList.length}
                            </div>
                        </div>
                    }
                    <div className='flex hover:bg-amber-400 text-red-700 rounded-lg py-3 px-2 text-sm hover:shadow-[0px_5px_15px_-2px] hover:!scale-110 duration-300' onClick={() => handleMenuClick()}>
                        <i className={`fa-solid fa-${menuClick ? "bars" : "xmark"} fa-xl cursor-pointer`}></i>
                    </div>
                </div>

                <div
                    className={`${menuClick ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100 md:hidden flex"} transition-all duration-[900ms] ease-in-out absolute left-0 top-20 w-full px-3 z-100`}
                >
                    <div className='flex flex-col gap-3 text-green-700 text-md font-semibold w-full bg-lime-200 rounded-lg py-10 px-5 shadow-[0px_5px_15px_-2px]'>
                        {
                            menuList.map((item, index) => (
                                <Link key={index} to={item.link} className="flex w-full items-center hover:bg-yellow-400 hover:scale-107 duration-300 py-2 px-3 rounded-md text-nowrap shadow-[0px_5px_15px_-2px]" onClick={handleMenuClick}>
                                    <i className={`fa-solid fa-${item.icon} fa-lg mr-3`}></i>
                                    {item.name}
                                </Link>
                            ))
                        }
                        <Link to='/addproduct' className={`${userInfo?.role === "Admin" ? "flex" : "hidden"} w-full items-center hover:bg-yellow-400 hover:scale-107 duration-300 py-2 px-3 rounded-md text-nowrap shadow-[0px_5px_15px_-2px]`} onClick={handleMenuClick}>
                            <i className="fa-solid fa-plus fa-lg mr-3"></i>
                            Add Item
                        </Link>
                        <Link to='/auth' className={`${userInfo ? "hidden" : "flex"} w-full items-center hover:bg-yellow-400 hover:scale-107 duration-300 py-2 px-3 rounded-md text-nowrap shadow-[0px_5px_15px_-2px]`} onClick={handleMenuClick}>
                            <i className="fa-solid fa-right-to-bracket fa-lg mr-3"></i>
                            Login
                        </Link>
                        <Link to={`/${userInfo?._id}/profile`} className={`${userInfo ? "flex" : "hidden"} w-full items-center hover:bg-yellow-400 hover:scale-107 duration-300 py-2 px-3 rounded-md text-nowrap shadow-[0px_5px_15px_-2px]`} onClick={handleMenuClick}>
                            <i className="fa-solid fa-user fa-lg mr-3"></i>
                            Manage Account
                        </Link>
                        <button className={`${userInfo ? "flex" : "hidden"} w-full items-center hover:bg-yellow-400 hover:scale-107 duration-300 py-2 px-3 rounded-md text-nowrap shadow-[0px_5px_15px_-2px]`} onClick={handleLogout}>
                            <i className="fa-solid fa-right-from-bracket fa-lg mr-3"></i>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;