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
  const [productData, setProductData] = useState({
    ...product,
    variants: product?.variants || [{ weight: 0, unit: 'g', price: 0 }],
    images: product?.images || [],
    tags: product?.tags || [],
    nutritionalInfo: product?.nutritionalInfo || { calories: 0, vitamins: [] },
    discountPercentage: product?.discountPercentage || 0,
    stockQuantity: product?.stockQuantity || 0,
    isFeatured: product?.isFeatured || false
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.startsWith('nutritionalInfo.')) {
      const field = name.split('.')[1]
      setProductData(prev => ({
        ...prev,
        nutritionalInfo: { ...prev.nutritionalInfo, [field]: value }
      }))
    } else {
      setProductData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleVariantChange = (index, e) => {
    const { name, value } = e.target
    const variants = [...productData.variants]
    variants[index] = { ...variants[index], [name]: value }
    setProductData(prev => ({ ...prev, variants }))
  }

  const addVariant = () => {
    setProductData(prev => ({
      ...prev,
      variants: [...prev.variants, { weight: 0, unit: 'g', price: 0 }]
    }))
  }

  const removeVariant = (index) => {
    const variants = productData.variants.filter((_, i) => i !== index)
    setProductData(prev => ({ ...prev, variants }))
  }

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim())
    setProductData(prev => ({ ...prev, tags }))
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
        toast.error("Error updating product. Please try again.", { autoClose: 5000 });
        setLoading("false");
      }
      else if (updatedProduct) {
        toast.success("Product updated successfully", { autoClose: 5000 });
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
     
      <div className='flex flex-col gap-3 w-full h-full lg:px-16 md:px-6 sm:px-3 py-4'>
        <div className='font-bold md:text-2xl sm:text-xl text-lg text-md'>Update the Product Details</div>
        <div className='flex lg:flex-row flex-col w-full h-full gap-3'>

          <div className='flex lg:w-1/2 w-full bg-white rounded-xl shadow-lg pt-5 pb-3 sm:px-5'>
            <div className='flex flex-col gap-4 w-full h-full px-4'>
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  name="category"
                  value={productData.category}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="fresh">Fresh</option>
                  <option value="organic">Organic</option>
                  <option value="exotic">Exotic</option>
                  <option value="berries">Berries</option>
                </select>
              </div>

              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={productData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Variants */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">Product Variants</label>
                {productData.variants.map((variant, index) => (
                  <div key={index} className="p-3 border rounded-lg space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-600">Weight</label>
                        <input
                          type="number"
                          name="weight"
                          value={variant.weight}
                          onChange={(e) => handleVariantChange(index, e)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600">Unit</label>
                        <select
                          name="unit"
                          value={variant.unit}
                          onChange={(e) => handleVariantChange(index, e)}
                          className="w-full p-2 border rounded"
                        >
                          <option value="g">Grams</option>
                          <option value="kg">Kilograms</option>
                          <option value="pcs">Pieces</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600">Price</label>
                        <input
                          type="number"
                          name="price"
                          value={variant.price}
                          onChange={(e) => handleVariantChange(index, e)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600">Original Price</label>
                        <input
                          type="number"
                          name="originalPrice"
                          value={variant.originalPrice || ''}
                          onChange={(e) => handleVariantChange(index, e)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                    </div>
                    {productData.variants.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeVariant(index)}
                        className="text-red-500 text-xs hover:text-red-700"
                      >
                        Remove Variant
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addVariant}
                  className="text-blue-500 text-sm hover:text-blue-700"
                >
                  + Add Variant
                </button>
              </div>

              {/* Origin */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Origin</label>
                <select
                  name="origin"
                  value={productData.origin}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="indian">Indian</option>
                  <option value="imported">Imported</option>
                </select>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
                <input
                  type="text"
                  value={productData.tags.join(', ')}
                  onChange={handleTagsChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* Discription */}
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

              {/* Featured */}
              <div className="flex items-center gap-2 pb-2">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={productData.isFeatured}
                  onChange={(e) => setProductData(prev => ({
                    ...prev,
                    isFeatured: e.target.checked
                  }))}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <label className="text-sm text-gray-700">Featured Product</label>
              </div>
            </div>
          </div>

          <div className='flex lg:w-1/2 w-full bg-white rounded-xl shadow-lg pt-5 pb-3 sm:px-5'>
            <div className='flex flex-col gap-4 w-full px-4'>

              {/* Nutritional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Calories (per 100g)</label>
                  <input
                    type="number"
                    name="nutritionalInfo.calories"
                    value={productData.nutritionalInfo.calories}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vitamins (comma separated)</label>
                  <input
                    type="text"
                    value={productData.nutritionalInfo.vitamins.join(', ')}
                    onChange={(e) => {
                      const vitamins = e.target.value.split(',').map(v => v.trim())
                      setProductData(prev => ({
                        ...prev,
                        nutritionalInfo: { ...prev.nutritionalInfo, vitamins }
                      }))
                    }}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>

              {/* Stock & Discount */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
                  <input
                    type="number"
                    name="stockQuantity"
                    value={productData.stockQuantity}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Discount Percentage</label>
                  <input
                    type="number"
                    name="discountPercentage"
                    value={productData.discountPercentage}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              <div>
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
                  <div className="my-4 border border-gray-200 rounded-lg p-3">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4  gap-3">
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
                  className="w-full py-3 px-3 md:text-xl sm:text-lg text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                  Upload More Images
                </button>
              </div>

              <div className='flex h-full w-full items-end'>
                <button
                  onClick={handleUpdate}
                  disabled={productData === product}
                  className='flex w-full px-3 bg-gradient-to-r from-blue-400 to-blue-700 hover:from-blue-500 hover:to-blue-900 items-center justify-center py-3 text-lg text-white'
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateProduct;
