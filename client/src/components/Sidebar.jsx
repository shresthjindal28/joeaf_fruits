import React from 'react';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';
import {selectUserInfo} from '../redux/slices/UserInfoSlice';

function Sidebar({ setState }) {
  const userInfo = useSelector(selectUserInfo);

  return (
    <div className="fixed right-0 top-0 h-screen w-64 bg-gray-800 text-white shadow-lg p-5 transform transition-transform duration-300 z-100">
      {/* Close Button */}
      <div className="flex justify-end">
        <i 
          className="fa-solid fa-times fa-2xl cursor-pointer text-white transition-all duration-200 hover:text-red-400 hover:scale-110" 
          onClick={() => setState(false)}
        />
      </div>

      {/* Sidebar Content */}
      <div className="flex flex-col gap-4 mt-5">
        <Link to='/' className="text-lg font-semibold p-2 rounded transition-all duration-200 hover:bg-gray-700 hover:shadow-xl" onClick={() => setState(false)}>
          Account Details
        </Link>
        <Link to='/allproducts' className="text-lg font-semibold p-2 rounded transition-all duration-200 hover:bg-gray-700 hover:shadow-xl" onClick={() => setState(false)}>
          Manage Products
        </Link>
        {
          userInfo?.role === "Admin" && <Link to="/addproduct" className="text-lg font-semibold p-2 rounded transition-all duration-200 hover:bg-gray-700 hover:shadow-xl" onClick={() => setState(false)}>
          Add Item
          </Link>
        }
        <Link to='/' className="text-lg font-semibold p-2 rounded transition-all duration-200 hover:bg-gray-700 hover:shadow-xl" onClick={() => setState(false)}>
          Settings
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
