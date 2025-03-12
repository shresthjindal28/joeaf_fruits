import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo } from '../redux/slices/UserInfoSlice';
import { getUserWishList, removeProductFromWishList, selectWishList, setSingleProduct } from '../redux/slices/ProductDataSlice';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const userWishList = useSelector(selectWishList);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(user);
  const [wishlistItems, setWishlistItems] = useState(userWishList);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateAccount = async () => {
    try {

      setEditMode(false);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const handleWishListClick = async (item) => {
    dispatch(removeProductFromWishList({productId: item._id}));
  };

  const handleFruitClick = (fruit) => {
    dispatch(setSingleProduct(fruit))
    navigate(`/product/${fruit._id}`)
  }

  if (!user) {
    navigate('/');
  }

  useEffect( () => {
    setWishlistItems(userWishList);
  }, [userWishList])

  useEffect( () => {
    dispatch(getUserWishList());
  }, [])

  return (
    <div className="flex w-screen min-h-screen py-8 xl:px-48 lg:px-30 md:px-8 sm:px-5 bg-gradient-to-b from-amber-50 to-yellow-50 overflow-hidden">
      <div className="flex flex-col w-full h-full mx-auto px-5">
        {/* Account Details Section */}
        <div className="bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-50 rounded-lg shadow-lg p-6 mb-8 border-2 border-amber-500">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 border-b-2 border-amber-500 pb-2">
              Account Details
            </h2>
          </div>

          {/* Info Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {['First Name', 'Last Name', 'Email', 'Phone', 'Gender'].map((field) => {
              let fieldKey = field.toLowerCase().replace(' ', '');
              if (fieldKey === "firstname") fieldKey = "firstName";
              if (fieldKey === "lastname") fieldKey = "lastName";
              return (
                <div
                  key={fieldKey}
                  className="bg-amber-50 rounded-xl p-3 shadow-inner border border-amber-200"
                >
                  <label className="block text-sm font-semibold text-amber-800 mb-2">
                    {field}
                  </label>
                  {editMode ? (
                    fieldKey === 'gender' ? (
                      <select
                        name={fieldKey}
                        value={formData[fieldKey]}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded-lg border-2 border-amber-300 bg-white text-gray-800 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                      >
                        <option value="Male" className="text-amber-800">Male</option>
                        <option value="Female" className="text-amber-800">Female</option>
                        <option value="Other" className="text-amber-800">Other</option>
                      </select>
                    ) : (
                      <input
                        type={fieldKey === 'email' ? 'email' : fieldKey === 'phone' ? 'tel' : 'text'}
                        name={fieldKey}
                        value={formData[fieldKey]}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded-lg border-2 border-amber-300 bg-white text-gray-800 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                      />
                    )
                  ) : (
                    <p className="text-lg font-medium text-gray-800 px-2">
                      {formData[fieldKey]}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Update button */}
          <div className="flex w-full justify-end pr-3 pt-6">
            <button
              onClick={editMode ? handleUpdateAccount : () => setEditMode(true)}
              className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black px-8 py-3 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/30"
            >
              {editMode ? '💾 Save Changes' : '✏️ Update Account'}
            </button>
          </div>
        </div>

        {/* Wishlist Section */}
        <div className={`${user.role === "Admin" ? "hidden" : "flex flex-col gap-3 flex-grow h-full"} bg-white rounded-xl shadow-md p-6`}>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Wishlist Items</h2>

          {
            wishlistItems.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Your wishlist is empty</p>
            ) : (
              <div className="flex flex-col w-full h-full gap-6">
                {wishlistItems.map((item, index) => (
                  <div key={index} className="flex sm:flex-row flex-col w-full sm:h-80 h-95 group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">

                    {/* Badges */}
                    <div className="absolute top-2 left-2 z-10 flex gap-2">
                      {item.discountPercentage > 0 && (
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          {item.discountPercentage}% OFF
                        </span>
                      )}
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        NEW
                      </span>
                    </div>

                    {/* Product Image */}
                    <div className="relative aspect-square sm:w-1/2 w-full sm:h-full h-1/2">
                      <img
                        src={item.images[0]}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Hover Buttons (Appear from Bottom) */}
                      <div
                        className="sm:hidden flex justify-center absolute top-0 left-0 right-0 bg-gradient-to-t from-transparent via-white/10 to-white/30 pt-10 px-3 transform transition-all duration-300 translate-y-[-80px] group-hover:translate-y-0"
                      >
                        <div className='flex items-center w-min justify-between gap-4 px-3 py-1 rounded-2xl bg-white/70'>

                          <button
                            onClick={() => handleWishListClick(item)}
                            className="hover:bg-white/50 rouned-full p-1"
                          >
                            <i className={`fa-${userWishList.some((e) => e._id === item._id) ? "solid" : "regular"} fa-heart fa-lg`} />
                          </button>
                          <button className="hover:bg-white/50 rouned-full p-1">
                            {/* 🛒 */}
                            <i className="fa-solid fa-cart-shopping" style={{ color: "#01060e", }} />
                          </button>
                          <button className="hover:bg-white/50 rouned-full p-1" onClick={() => (handleFruitClick(item))}>
                            <i className="fa-solid fa-up-right-and-down-left-from-center"></i>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Product Content */}
                    <div className="flex flex-col justify-around p-3 bg-green-50 h-full w-full">
                      <div className='flex flex-col w-full h-full lg:px-5 sm:px-3'>
                        {/* Category and Origin */}
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-500 uppercase">{item.category}</span>
                          <span className="text-sm text-blue-600">{item.origin}</span>
                        </div>

                        {/* Product Name */}
                        <label className="sm:text-xl text-sm font-bold text-gray-800 mb-2">{item.name}</label>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 text-xs text-gray-500 mb-2">
                          {item.tags?.map((tag, i) => (
                            <span key={i} className="lowercase">
                              {tag}{i !== item.tags.length - 1 && ' | '}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Price Section */}
                      <div className="flex w-full h-max lg:px-5 sm:px-3">
                        <div className='flex w-full h-full items-center justify-between'>
                          <div className="flex items-baseline sm:gap-2 gap-1">
                            <span className="sm:text-xl text-md font-bold text-green-600">
                              ${item.variants[0].price}
                            </span>
                            {item.variants[0].originalPrice && (
                              <span className="text-sm text-gray-400 line-through">
                                ${item.variants[0].originalPrice}
                              </span>
                            )}
                          </div>
                          <button className="bg-green-500 text-white sm:text-xl text-sm px-3 py-2 rounded-lg hover:bg-green-600 transition-colors">
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};


export default ProfilePage;