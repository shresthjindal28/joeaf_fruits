import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectUserInfo } from '../redux/slices/UserInfoSlice';

function AuthLayout() {
    const userInfo = useSelector(selectUserInfo);

    if (!userInfo) {
        return (
            <Navigate to="/" replace={true} />
        )
    }

    return (
        <div className="flex flex-col min-h-screen min-w-screen">
            {/* Main Content Area */}
            <div className='flex-1'>
                <Outlet />
            </div>
        </div>
    )
}

export default AuthLayout