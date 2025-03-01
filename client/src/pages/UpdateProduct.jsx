import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import uploadFile from '../components/FileUploadar';
import { ToastContainer, toast } from 'react-toastify';
import { resetNewProduct, selectNewProduct, selectProductError, selectSingleProduct, setSingleProduct, updateProductRoute } from '../redux/slices/ProductDataSlice';
import { useNavigate } from 'react-router-dom';

function UpdateProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector(selectSingleProduct);
  const updatedProduct = useSelector(selectNewProduct);
  const err = useSelector(selectProductError);
  const [isLoading, setLoading] = useState(false);
  const [productData, setProductData] = useState(product);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  }

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      const uploadedUrls = await Promise.all(
        Array.from(files).map(async (file) => {
          const result = await uploadFile(file); // Your upload function
          return result.secure_url;
        })
      );

      setProductData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls]
      }));
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  const handleRemoveImage = (urlToRemove) => {
    setProductData(prev => ({
      ...prev,
      images: prev.images.filter(url => url !== urlToRemove)
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (product === productData) return;
    dispatch(resetNewProduct());
    setLoading(true);
    dispatch(updateProductRoute(productData));
  }

  useEffect(() => {
    if (isLoading) {
      if (err && !updatedProduct) {
        toast.error("Getting error in updating the product details. Try again", { autoClose: 5000 });
        setLoading("false");
      }
      else if (updatedProduct) {
        toast.success("Updated successfully", { autoClose: 5000 });
        setLoading(false);
        dispatch(setSingleProduct(updatedProduct));
        navigate(`/product/${updatedProduct}`);
      }
    }
  }, [updatedProduct, err])

  return (
    <div className='flex flex-grow w-full h-full bg-zinc-100 overflow-y-scroll hide-scrollbar px-4'>
      <ToastContainer position="top-right" />
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
        </div>
      )}
      <div className='flex flex-col gap-2 w-full h-full lg:px-16 md:px-6 sm:px-3 py-5'>
        <h3 className='font-bold md:text-2xl sm:text-xl text-md'>Update the Product Details</h3>
        <div className='flex lg:flex-row flex-col w-full h-full gap-3'>
          <div className='flex flex-col gap-5 lg:w-1/2 w-full bg-white rounded-xl shadow-lg pt-5 pb-3 sm:px-5'>
            <div className='flex flex-col gap-5 w-full h-full px-4'>
              <div className='flex gap-4 w-full'>
                <span className='text-lg font-semibold text-nowrap'>Fruit Type : </span>
                <input
                  type='text' name='type' value={productData.type} onChange={handleChange}
                  className='hover:shadow-inner w-full bg-zinc-100 px-2 py-1 rounded-md'
                />
              </div>
              <div className='flex gap-4 w-full'>
                <span className='text-lg font-semibold text-nowrap'>Fruit Name : </span>
                <input
                  type='text' name='name' value={productData.name} onChange={handleChange}
                  className='hover:shadow-inner w-full bg-zinc-100 px-2 py-1 rounded-md'
                />
              </div>
              <div className='flex gap-4 w-full'>
                <span className='text-lg font-semibold text-nowrap'>Fruit variety : </span>
                <input
                  type='text' name='variety' value={productData.variety} onChange={handleChange}
                  className='hover:shadow-inner w-full bg-zinc-100 px-2 py-1 rounded-md'
                />
              </div>
              <div className='flex sm:flex-row flex-col sm:gap-4 gap-5 justify-between'>
                <div className='flex gap-4'>
                  <span className='text-lg font-semibold text-nowrap'>Price : </span>
                  <input
                    type='number' name='price' value={productData.price} onChange={handleChange}
                    className='hover:shadow-inner w-full bg-zinc-100 px-2 py-1 rounded-md'
                  />
                </div>
                <div className='flex gap-4'>
                  <span className='text-lg font-semibold text-nowrap'>Quantity : </span>
                  <input
                    type='number' name='quantity' value={productData.quantity} onChange={handleChange}
                    className='hover:shadow-inner w-full bg-zinc-100 px-2 py-1 rounded-md'
                  />
                </div>
              </div>
              <div>
                <label className="block text-lg font-semibold mb-2" htmlFor="description">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={productData.description}
                  onChange={handleChange}
                  placeholder="Enter fruit description"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                  rows="4"
                  required
                ></textarea>
              </div>
              <button
                onClick={handleUpdate}
                disabled={productData === product}
                className='flex w-min px-3 bg-gradient-to-r from-blue-400 to-blue-700 hover:from-blue-500 hover:to-blue-900 items-center justify-center py-2 text-lg text-white'
              >
                Update
              </button>
            </div>
          </div>
          <div className='flex lg:w-1/2 w-full bg-white rounded-xl shadow-lg pt-5 pb-3 sm:px-5'>
            <div className='flex flex-col gap-5 w-full px-4'>
              <label className="block text-gray-700 font-medium mb-2">Product Images</label>

              {/* Hidden file input */}
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="imageUpload"
              />

              {/* Image Previews */}
              {productData.images.length > 0 && (
                <div className="my-4 border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {productData.images.map((url) => (
                      <div key={url} className="relative aspect-square group">
                        <img
                          src={url}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(url)}
                          className="absolute top-1 right-1 p-1 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Custom upload button */}
              <button
                type="button"
                onClick={() => document.getElementById('imageUpload').click()}
                className="w-full py-3 px-6 md:text-xl sm:text-lg text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                Upload More Images
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateProduct;