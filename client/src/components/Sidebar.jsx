import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo, userInfoReset } from '../redux/slices/UserInfoSlice';

function Sidebar({ setState }) {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);

  const handleLogout = () => {
    dispatch(userInfoReset());
  }

  return (
    <div className="fixed right-0 top-0 h-dvh w-72 bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-50 border-l-2 border-amber-200 shadow-2xl p-6 transform transition-transform duration-300 z-50 overflow-scroll hide-scrollbar">
      {/* Close Button */}
      <div className="flex justify-end w-full items-center mb-8">
        <button
          onClick={() => setState(false)}
          className="px-1 rounded-full hover:bg-amber-100 hover:!scale-120 duration-800 transition-colors duration-200 hover:shadow-[0px_5px_10px_-2px] shadow-inner duration-300"
        >
          <i className='fa-solid fa-xmark fa-xl' style={{ color: "#f9ca08 " }} />
        </button>
      </div>

      <div className='flex flex-col w-full h-full justify-between'>
        {/* Navigation Links */}
        <div className="flex flex-grow w-full flex-col gap-4 mb-5">
          <Link
            to={`/${userInfo?._id}/profile`}
            className="flex items-center gap-3 p-3 rounded-lg text-amber-900 bg-gradient-to-r hover:from-amber-200 hover:via-amber-100 hover:to-amber-200 transition-all duration-200 group shadow-inner hover:shadow-xl"
            onClick={() => setState(false)}
          >
            <i className='fa-solid fa-user fa-md' style={{ color: "#09cb2f" }} />
            <span className="font-semibold">Manage Account</span>
          </Link>

          {userInfo?.role === "Admin" && (
            <>
              <Link
                to='/allproducts'
                className="flex items-center gap-3 p-3 rounded-lg text-amber-900 hover:bg-amber-200 transition-all duration-200 group shadow-inner hover:shadow-xl"
                onClick={() => setState(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                </svg>
                <span className="font-semibold">Manage Products</span>
              </Link>

              <Link
                to="/addproduct"
                className="flex items-center gap-3 p-3 rounded-lg text-amber-900 hover:bg-amber-200 transition-all duration-200 group shadow-inner hover:shadow-xl"
                onClick={() => setState(false)}
              >
                <i className='fa-solid fa-plus fa-sm' style={{ color: "#09cb2f" }} />
                <span className="font-semibold">Add New Product</span>
              </Link>
            </>
          )}
        </div>

        {/* Logout button */}
        <div className="mt-8 border-t-2 border-amber-200 pt-6 w-full">
          <button
            onClick={() => {
              setState(false);
              handleLogout();
            }}
            className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg hover:from-red-600 hover:to-orange-600 transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;