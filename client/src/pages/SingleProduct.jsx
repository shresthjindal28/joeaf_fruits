import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { addProductToWishList, selectSingleProduct } from '../redux/slices/ProductDataSlice'
import { selectUserInfo, selectUserToken } from '../redux/slices/UserInfoSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SingleProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector(selectUserInfo);
  const userToken = useSelector(selectUserToken);
  const singleProduct = useSelector(selectSingleProduct);
  const [imgIndex, setImgIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleImgChange = (direction) => {
    if (direction === "left") {
      setImgIndex((prev) => (prev === 0 ? singleProduct.images.length - 1 : prev - 1));
    } else {
      setImgIndex((prev) => (prev === singleProduct.images.length - 1 ? 0 : prev + 1));
    }
  };

  const handleDeleteProduct = async () => {
    if (userInfo.role !== "Admin") {
      toast.error("Unauthorized Access!", { autoClose: 3000 });
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_BACKEND_URL}/product/${singleProduct._id}/delete`,
        {
          headers: {
            'Content-Type': "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          withCredentials: true,
        }
      );
      toast.success(response.data.message || "Product deleted successfully!", { autoClose: 3000 });
      navigate('/allproducts');
    } catch (error) {
      console.log("Error in deleting the Product", error);
      toast.error(error.response?.data?.message || "Failed to delete product!", { autoClose: 3000 });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to add a product to the wishlist
  const handleAddToWishlist = async () => {
    if (!userInfo) {
      toast.error("Please log in first!", { autoClose: 3000 });
      return;
    }
    
    // dispatch(addProductToWishList({productId : singleProduct._id}));
  }

  // Function to add a product to the wishlist
  const handleBuy = async () => {
    if (!userInfo) {
      toast.error("Please log in first!", { autoClose: 3000 });
      return;
    }
  }

  return (
    <div className='flex w-full h-full overflow-y-scroll hide-scrollbar bg-zinc-100 px-3'>
      <ToastContainer position="top-right" />
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 animate-spin"></div>
        </div>
      )}
      <div className='flex flex-grow w-full h-full lg:px-17 md:px-12 sm:px-7 py-5'>
        <div className='flex grid lg:grid-cols-2 gap-5 flex-grow w-full h-full lg:p-4 p-5 bg-white rounded-xl items-center'>

          {/* Image Sectioin */}
          <div className='flex gap-2 items-center w-full h-full rounded-xl justify-center items-center'>
            <div className='flex py-4 px-2 rounded-md cursor-pointer hover:bg-gray-300' onClick={() => handleImgChange("left")}>
              <i className="fa-solid fa-chevron-left fa-2xl" />
            </div>
            <img src={singleProduct.images[imgIndex]} alt='' className='rounded-xl h-[70vh] w-[70vh] object-cover shadow shadow-inner' />
            <div className='flex py-4 px-2 rounded-md cursor-pointer hover:bg-gray-300' onClick={() => handleImgChange("right")}>
              <i className="fa-solid fa-chevron-right fa-2xl" />
            </div>
          </div>

          {/* Fruit Information */}
          <div className='flex w-full h-[70vh] flex-col gap-3 overflow-y-auto hide-scrollbar'>
            <div className='flex items-center md:text-3xl sm:text-2xl text-xl font-bold'>{singleProduct.name}- 1kg</div>
            <div className='flex items-center md:text-xl sm:text-lg text-md font-bold'>Price per Quantity: <span className='text-xl font-extrabold pl-5'>${singleProduct.price}</span></div>
            <div className='flex items-center md:text-lg sm:text-md text-sm font-bold'>In Stock Quantity Available : <span className='text-lg font-extrabold pl-5'>{singleProduct.quantity}</span></div>
            <div>
              <div className='font-bold md:text-lg text-md'>Description</div>
              <div className='flex w-full md:text-md text-sm'>
                {singleProduct.description}
              </div>
            </div>
            <div className='flex w-full h-max items-end gap-2'>
              {
                userInfo?.role === "Admin" ?
                  <div className='flex w-full justify-end gap-4'>
                    <div className='flex py-1 px-3 sm:text-xl text-lg rounded-md bg-gradient-to-r from-blue-300 to-blue-600 hover:from-blue-500 hover:to-blue-900 text-white cursor-pointer shadow hover:shadow-2xl' onClick={() => (navigate(`/product/${singleProduct._id}/update`))}>Edit</div>
                    <div
                      className='flex py-1 px-3 sm:text-xl text-lg rounded-md bg-gradient-to-r from-red-500 to-red-900 hover:from-red-300 hover:to-red-700 text-white cursor-pointer shadow hover:shadow-2xl'
                      onClick={() => handleDeleteProduct()}
                    >
                      Delete
                    </div>
                  </div>
                  :
                  <div className='grid xl:grid-cols-2 lg:grid-cols-1 sm:grid-cols-2 grid-cols-1 w-full gap-2 h-min'>
                    <div
                      className='flex h-min w-full py-2 border border-2 border-black rounded-md items-center justify-center md:text-xl sm:text-lg text-md font-semibold cursor-pointer bg-gradient-to-r hover:from-black/40 hover:to-black/80 hover:text-white'
                      onClick={handleAddToWishlist}
                    >
                      <i className="fa-regular fa-heart fa-xl pr-5" />
                      Add To Wishlist
                    </div>
                    <div
                      className='flex h-min w-full py-2 border border-2 border-black rounded-md items-center justify-center md:text-xl sm:text-lg text-md font-semibold cursor-pointer bg-gradient-to-r hover:from-red-300 hover:to-red-800 hover:text-white'
                      onClick={handleBuy}
                    >
                      Buy Now
                    </div>
                  </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProduct;