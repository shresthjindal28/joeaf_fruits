import React, { lazy } from 'react'
import { Outlet } from 'react-router-dom';

const Navbar = lazy(() => import("../components/Navbar"));
const Footar = lazy(() => import("../components/Footar"));

function GuestLayout() {
    return (
        <div className="flex flex-col min-h-screen min-w-screen">
            {/* Sticky Navbar */}
            <div className="sticky top-0 z-50 bg-white shadow-md w-full">
                <Navbar />
            </div>

            {/* Main Content Area */}
            <div className='flex-1'> 
                <Outlet />
            </div>

            {/* Footer */}
            <Footar />
        </div>
    )
}

export default GuestLayout