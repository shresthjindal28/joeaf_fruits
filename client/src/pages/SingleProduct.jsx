import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { addProductToCart, addProductToWishList, removeProductFromCart, removeProductFromWishList, selectCartList, selectSingleProduct, selectWishList } from '../redux/slices/ProductDataSlice'
import { selectUserInfo, selectUserToken } from '../redux/slices/UserInfoSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SingleProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector(selectUserInfo);
  const userToken = useSelector(selectUserToken);
  const userWishList = useSelector(selectWishList);
  const userCart = useSelector(selectCartList);
  const singleProduct = useSelector(selectSingleProduct);
  const [inList, setInList] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedVariant, setSelectedVariant] = useState(0)

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

  // Function to handle the wishlist button click
  const handleWishListClick = async () => {
    if (!userInfo) {
      toast.error("Please log in first!", { autoClose: 3000 });
      return;
    }

    if (!inList) {
      dispatch(addProductToWishList({ productId: singleProduct._id }));
    }
    else {
      dispatch(removeProductFromWishList({ productId: singleProduct._id }));
    }
  }

  // Function to add a product to the cart
  const handleAddToCart = async () => {
    if (!userInfo) {
      toast.error("Please log in first!", { autoClose: 3000 });
      return;
    }

    if (!inCart) {
      dispatch(addProductToCart({ productId: singleProduct._id }));
    }
    else {
      dispatch(removeProductFromCart({ productId: singleProduct._id }));
    }
  }

  useEffect(() => {
    const isInList = userWishList.some((item) => item._id === singleProduct._id);
    if (isInList) {
      setInList(true);
    }
    else {
      setInList(false);
    }
  }, [userWishList])

  useEffect(() => {
    const isInList = userCart.some((item) => item._id === singleProduct._id);
    if (isInList) {
      setInCart(true);
    }
    else {
      setInCart(false);
    }
  }, [userCart])

  if (!singleProduct) {
    navigate('/');
    return
  }

  return (
    <div className='flex w-full h-full overflow-y-scroll hide-scrollbar bg-white px-3'>
      <ToastContainer position="top-right" />
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 animate-spin"></div>
        </div>
      )}

      <div className='flex flex-col gap-2 flex-grow w-full h-full lg:px-17 md:px-12 sm:px-7 py-3'>
        <div className='flex grid lg:grid-cols-2 gap-5 flex-grow w-full h-full sm:p-4 px-0 py-4 items-center'>

          {/* Image Sectioin */}
          <div className='flex gap-1 items-center h-full w-full rounded-xl justify-center items-center'>
            <div className='flex py-4 px-2 rounded-md cursor-pointer hover:bg-gray-300' onClick={() => handleImgChange("left")}>
              <i className="fa-solid fa-chevron-left fa-2xl" />
            </div>
            <img src={singleProduct.images[imgIndex]} alt='' className='rounded-xl xl:h-[70vh] lg:h-[55vh] sm:h-[70vh] h-[30vh] xl:w-[70vh] lg:w-[55vh] sm:w-[70vh] w-[30vh] object-cover shadow shadow-inner' />
            <div className='flex py-4 px-2 rounded-md cursor-pointer hover:bg-gray-300' onClick={() => handleImgChange("right")}>
              <i className="fa-solid fa-chevron-right fa-2xl" />
            </div>
          </div>

          {/* Fruit Information */}
          <div className="lg:pl-8">
            <div className="xl:text-3xl md:text-2xl text-lg font-bold text-gray-900 mb-2 whitespace-nowrap">
              {singleProduct.name}
            </div>

            <div className="flex items-center mb-4">
              <span className="ml-2 text-sm text-gray-500">(24 reviews)</span>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-4 mb-3">
                <p className="text-2xl font-bold text-gray-900 pt-3">
                  ${singleProduct.variants[selectedVariant].price}
                  {singleProduct.variants[selectedVariant].originalPrice && (
                    <span className="ml-3 text-sm text-red-500 line-through">
                      ${singleProduct.variants[selectedVariant].originalPrice}
                    </span>
                  )}
                </p>
                {singleProduct.discountPercentage > 0 && (
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                    {singleProduct.discountPercentage}% OFF
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {singleProduct.variants.map((variant, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedVariant(index)}
                    className={`px-4 py-2 rounded-md ${selectedVariant === index
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {variant.weight}
                    {variant.unit}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-b border-gray-200 py-6">
              <div className="grid grid-cols-2 gap-4">
                <div className='flex flex-col w-full h-full'>
                  <h4 className="text-sm font-medium text-gray-900">Category</h4>
                  <p className="mt-1 text-sm text-gray-500 capitalize">
                    {singleProduct.category}
                  </p>
                </div>
                <div className='flex flex-col items-end w-full h-full'>
                  <h4 className="text-sm font-medium text-gray-900">Origin</h4>
                  <p className="mt-1 text-sm text-gray-500 capitalize whitespace-nowrap">
                    {singleProduct.origin}
                  </p>
                </div>
                <div className='flex flex-col w-full h-full'>
                  <h4 className="text-sm font-medium text-gray-900">Stock</h4>
                  <p className="mt-1 text-sm text-gray-500 whitespace-nowrap">
                    {singleProduct.stockQuantity} units available
                  </p>
                </div>
                <div className='flex flex-col items-end w-full h-full'>
                  <h4 className="text-sm font-medium text-gray-900">SKU</h4>
                  <p className="mt-1 text-sm text-gray-500">
                    {singleProduct._id.slice(-6).toUpperCase()}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 space-y-4">
              {userInfo?.role === "Admin" ? (
                <div className="flex grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => navigate(`/product/${singleProduct._id}/update`)}
                    className="flex-1 py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Edit Product
                  </button>
                  <button
                    onClick={handleDeleteProduct}
                    className="flex-1 py-3 px-6 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete Product
                  </button>
                </div>
              ) : (
                <div className="flex grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={handleWishListClick}
                    className="w-full py-3 px-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg
                      className={`w-5 h-5 ${inList ? 'text-red-500 fill-current' : 'text-white'}`}
                      fill={inList ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {inList ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </button>
                  <button
                    className={`w-full py-3 px-6 ${ inCart ? "bg-green-300 text-white hover:bg-green-400" : "bg-green-600 text-white hover:bg-green-700"} rounded-lg transition-colors`}
                    onClick={handleAddToCart}
                  >
                    { inCart ? "Remove from Cart" : "Add to Cart" }
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional Product Info Tabs */}
        <div className="mt-16 pb-10">
          <nav className="flex gap-4 space-x-8 border-b border-gray-200">
            {['description', 'details', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-1 text-sm font-medium ${activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>

          <div className="pt-6">
            {activeTab === 'description' && (
              <div className="prose prose-sm max-w-none">
                <p>{singleProduct.description}</p>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Nutritional Information</h4>
                  <dl className="mt-2 space-y-2">
                    <div>
                      <dt className="text-sm text-gray-500">Calories</dt>
                      <dd className="text-sm text-gray-900">
                        {singleProduct.nutritionalInfo?.calories || 'N/A'} per 100g
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Vitamins</dt>
                      <dd className="text-sm text-gray-900">
                        {singleProduct.nutritionalInfo?.vitamins?.join(', ') || 'N/A'}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Tags</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {singleProduct.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-8">
                <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProduct;