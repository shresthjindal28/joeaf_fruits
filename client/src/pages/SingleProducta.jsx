import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { addProductToCart, addProductToWishList, removeProductFromCart, removeProductFromWishList, selectCartList, selectSingleProduct, selectWishList } from '../redux/slices/ProductDataSlice'
import { selectUserInfo, selectUserToken } from '../redux/slices/UserInfoSlice';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion";
import axios from 'axios';

const reviewVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

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
      navigate('/shop');
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

  // Function to handle the review submit
  const handleReviewSubmit = () => {

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
    <div className="min-h-screen bg-amber-50 py-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-t-amber-500 border-amber-100 rounded-full animate-spin"></div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        {/* Product Content */}
        <div className="grid lg:grid-cols-2 gap-8 p-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-amber-50">
              <img
                src={singleProduct.images[imgIndex]}
                alt={singleProduct.name}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20" />

              {/* Navigation Arrows */}
              <button
                onClick={() => handleImgChange("left")}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white"
              >
                <i className="fas fa-chevron-left text-lg"></i>
              </button>
              <button
                onClick={() => handleImgChange("right")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white"
              >
                <i className="fas fa-chevron-right text-lg"></i>
              </button>
            </div>

            {/* Image Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {singleProduct.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setImgIndex(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${imgIndex === index ? 'border-amber-500' : 'border-transparent'
                    }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Header */}
            <div className="border-b pb-6">
              <h1 className="text-3xl font-bold text-amber-800">
                {singleProduct.name}
                {singleProduct.isFeatured && (
                  <span className="ml-3 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm">
                    <i className="fas fa-star mr-1"></i>
                    Featured
                  </span>
                )}
              </h1>

              {/* Price Section */}
              <div className="mt-4 flex items-center gap-4">
                <p className="text-3xl font-bold text-green-700">
                  ₹{singleProduct.variants[selectedVariant].price}
                  <span className="text-sm font-normal ml-2">
                    /{singleProduct.variants[selectedVariant].pricingUnit}
                  </span>
                </p>
                {singleProduct.variants[selectedVariant].discountPercentage > 0 && (
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                    {singleProduct.variants[selectedVariant].discountPercentage}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Variant Selector */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-amber-700">
                <i className="fas fa-weight-hanging mr-2"></i>
                Available Sizes
              </h3>
              <div className="flex flex-wrap gap-2">
                {singleProduct.variants.map((variant, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedVariant(index)}
                    className={`px-4 py-2 rounded-full transition-all ${selectedVariant === index
                      ? 'bg-amber-500 text-white'
                      : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                      }`}
                  >
                    {variant.size} ({variant.singlePieceWeight}
                    {variant.weightUnit})
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center p-3 bg-amber-50 rounded-lg">
                <i className="fas fa-globe text-amber-600 mr-2"></i>
                <div>
                  <p className="font-medium text-amber-800">Origin</p>
                  <p className="capitalize">{singleProduct.origin}</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-amber-50 rounded-lg">
                <i className="fas fa-tag text-amber-600 mr-2"></i>
                <div>
                  <p className="font-medium text-amber-800">Category</p>
                  <p className="capitalize">{singleProduct.category}</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-amber-50 rounded-lg">
                <i className="fas fa-calendar-alt text-amber-600 mr-2"></i>
                <div>
                  <p className="font-medium text-amber-800">Stock</p>
                  <p>{singleProduct.stockQuantity} units available</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-amber-50 rounded-lg">
                <i className="fas fa-star text-amber-600 mr-2"></i>
                <div>
                  <p className="font-medium text-amber-800">Rating</p>
                  <p>4.8 (24 reviews)</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 pt-4">
              {userInfo?.role === "Admin" ? (
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => navigate(`/product/${singleProduct._id}/update`)}
                    className="flex items-center justify-center gap-2 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
                  >
                    <i className="fas fa-edit"></i>
                    Edit Product
                  </button>
                  <button
                    onClick={handleDeleteProduct}
                    className="flex items-center justify-center gap-2 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    <i className="fas fa-trash"></i>
                    Delete Product
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={handleWishListClick}
                    className={`flex items-center justify-center gap-2 py-3 rounded-lg ${inList
                      ? 'bg-red-100 text-red-600 hover:bg-red-200'
                      : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                      }`}
                  >
                    <i className={`${inList ? 'fas' : 'far'} fa-heart`}></i>
                    {inList ? 'In Wishlist' : 'Add to Wishlist'}
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="flex items-center justify-center gap-2 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <i className="fas fa-shopping-cart"></i>
                    {inCart ? 'Remove from Cart' : 'Add to Cart'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="border-t border-amber-100">
          <nav className="flex gap-8 px-8">
            {['description', 'nutrition', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium transition-colors ${activeTab === tab
                  ? 'border-amber-500 text-amber-700'
                  : 'border-transparent text-gray-500 hover:text-amber-600'
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>

          <div className="p-8 pt-4">
            <AnimatePresence mode='wait'>
              {activeTab === 'description' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="prose max-w-none"
                >
                  <h3 className="text-2xl font-bold text-amber-800 mb-4">About this Mango</h3>
                  <p className="text-gray-700">{singleProduct.description}</p>
                </motion.div>
              )}

              {activeTab === 'nutrition' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid md:grid-cols-2 gap-8"
                >
                  <div>
                    <h4 className="text-xl font-semibold text-amber-800 mb-4">
                      Nutritional Information
                    </h4>
                    <dl className="space-y-3">
                      <div className="flex justify-between py-2 border-b">
                        <dt className="text-gray-600">Calories</dt>
                        <dd className="font-medium text-amber-700">
                          {singleProduct.nutritionalInfo?.calories || 'N/A'} per 100g
                        </dd>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <dt className="text-gray-600">Vitamins</dt>
                        <dd className="font-medium text-amber-700">
                          {singleProduct.nutritionalInfo?.vitamins?.join(', ') || 'N/A'}
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-amber-800 mb-4">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {singleProduct.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'reviews' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  {/* Review Form */}
                  <form onSubmit={handleReviewSubmit} className="bg-amber-50 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-amber-800 mb-4">
                      <i className="fas fa-comment-dots mr-2"></i>
                      Write a Review
                    </h3>
                    <div className="space-y-4">
                      {/* ... keep review form inputs same ... */}
                    </div>
                  </form>

                  {/* Reviews List */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-amber-800">
                      Customer Reviews (24)
                    </h3>
                    {[1, 2, 3].map((review) => (
                      <motion.div
                        key={review}
                        variants={reviewVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="bg-white p-4 rounded-lg shadow-sm border border-amber-100"
                      >
                        {/* ... keep review items same ... */}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default SingleProduct;