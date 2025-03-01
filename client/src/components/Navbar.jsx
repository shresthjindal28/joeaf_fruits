import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectUserInfo, selectUserOnline } from '../redux/slices/UserInfoSlice'
import Sidebar from './Sidebar';
import { menuList } from '../lib/Constants';

function Navbar() {
    const userInfo = useSelector(selectUserInfo);
    const userOnline = useSelector(selectUserOnline);
    const [sidebar, setSideBar] = useState(false);

    const [menuClick, setMenuClick] = useState(true);

    const handleMenuClick = () => {
        setMenuClick(!menuClick);
    }

    return (
        <div className='flex min-h-16 w-full'>
            <div className='flex w-full px-3 pt-2 justify-between bg-green-100 relative'>
                <div className='flex lg:w-3/4 md:w-4/5 w-full gap-3 h-full'>
                    <div className='flex px-5 lg:text-3xl text-2xl text-nowrap font-bold items-center'>
                        Fresh Food
                    </div>
                    <div className='md:flex hidden items-center gap-5'>
                        {
                            menuList.map((item, index) => (
                                <Link key={index} to={item.link} className='lg:text-xl text-lg font-semibold hover:!scale-110 duration-300 text-nowrap'>{item.name}</Link>
                            ))
                        }
                    </div>
                </div>
                <div className='md:flex hidden lg:w-1/4 w-1/5 h-full justify-end items-center pb-2 pr-5'>
                    {
                        userOnline ?
                            sidebar ?
                                <div className='flex h-full w-full'>
                                    <Sidebar setState={setSideBar} />
                                </div>
                                :
                                <div className='flex gap-2 items-center h-full border border-2 border-black rounded-md px-3 hover:shadow-2xl bg-gray-200 cursor-pointer'>
                                    <div className='flex h-full items-center' onClick={() => setSideBar(!sidebar)}>
                                        {
                                            userInfo?.avatar ?
                                                <div className='flex'>
                                                    <img className='w-10 h-10 rounded-full' src={userInfo?.avatar} alt='' />
                                                </div>
                                                : <i className='fa fa-user fa-xl' />
                                        }
                                    </div>
                                </div>
                            :
                            <Link to='/auth' className='lg:text-xl text-lg font-semibold py-1 px-2 bg-gradient-to-r from-black/60 to-black/80 hover:from-black/40 hover:to-black/60 hover:shadow-2xl text-white rounded-md'>Login</Link>
                    }
                </div>
                <div className='md:hidden flex items-center'>
                    <div className='flex hover:bg-green-200 rounded-lg py-3 px-2 hover:shadow-[0px_10px_14px_-7px_#366347] hover:!scale-110 duration-300' onClick={() => handleMenuClick()}>
                        <i className={`fa-solid fa-${menuClick ? "bars" : "xmark"} fa-xl cursor-pointer`}></i>
                    </div>
                </div>
                <div 
                    className={`${menuClick ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100 md:hidden flex"} transition-all duration-[900ms] ease-in-out absolute left-0 top-20 w-full px-3 z-100`}
                >
                    <div className='flex flex-col gap-3 text-white text-xl font-semibold w-full bg-red-600 rounded-lg py-10 px-5 shadow-[0px_15px_15px_-10px_#de0029]'>
                        {
                            menuList.map((item, index) => (
                                <Link key={index} to={item.link} className="flex w-full items-center hover:bg-red-700 hover:scale-107 duration-300 py-2 px-3 rounded-md text-nowrap shadow-[0px_30px_15px_-0px_#de0000]" onClick={handleMenuClick}>
                                    <i className={`fa-solid fa-${item.icon} fa-lg mr-3`}></i>
                                    {item.name}
                                </Link>
                            ))
                        }
                        <Link to='/addproduct' className={`${userInfo?.role === "Admin" ? "flex" : "hidden"} w-full items-center hover:bg-red-700 hover:scale-107 duration-300 py-2 px-3 rounded-md text-nowrap shadow-[0px_30px_15px_-0px_#de0000]`} onClick={handleMenuClick}>
                            <i className="fa-solid fa-plus fa-lg mr-3"></i>
                            Add Item
                        </Link>
                        <Link to='/auth' className={`${userInfo ? "hidden" : "flex"} w-full items-center hover:bg-red-700 hover:scale-107 duration-300 py-2 px-3 rounded-md text-nowrap shadow-[0px_30px_15px_-0px_#de0000]`} onClick={handleMenuClick}>
                            <i className="fa-solid fa-right-to-bracket fa-lg mr-3"></i>
                            Login
                        </Link>
                        <Link to={`/${userInfo?._id}/profile`} className={`${userInfo ? "flex" : "hidden"} w-full items-center hover:bg-red-700 hover:scale-107 duration-300 py-2 px-3 rounded-md text-nowrap shadow-[0px_30px_15px_-0px_#de0000]`} onClick={handleMenuClick}>
                            <i className="fa-solid fa-user fa-lg mr-3"></i>
                            Manage Account
                        </Link>
                        <Link to='/auth' className={`${userInfo ? "flex" : "hidden"} w-full items-center hover:bg-red-700 hover:scale-107 duration-300 py-2 px-3 rounded-md text-nowrap shadow-[0px_30px_15px_-0px_#de0000]`} onClick={handleMenuClick}>
                            <i className="fa-solid fa-right-from-bracket fa-lg mr-3"></i>
                            Logout
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;