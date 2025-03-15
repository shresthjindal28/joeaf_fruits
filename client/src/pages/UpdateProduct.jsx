import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import uploadFile from '../components/FileUploadar';
import { resetNewProduct, selectNewProduct, selectProductError, selectSingleProduct, setSingleProduct, updateProductRoute } from '../redux/slices/ProductDataSlice';

function UpdateProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector(selectSingleProduct);
  const updatedProduct = useSelector(selectNewProduct);
  const err = useSelector(selectProductError);
  const [isLoading, setLoading] = useState(false);
  const [productData, setProductData] = useState({
    ...product,
    variants: product?.variants || [{
      size: 'medium',
      singlePieceWeight: 0,
      weightUnit: 'g',
      pricingUnit: 'per piece',
      price: 0,
      originalPrice: 0,
      discountPercentage: 0
    }],
    images: product?.images || [],
    tags: product?.tags || [],
    nutritionalInfo: product?.nutritionalInfo || { calories: 0, vitamins: [] },
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
    const { name, value } = e.target;
    setProductData(prev => {
      const updatedVariants = prev.variants.map((variant, i) =>
        i === index ? { ...variant, [name]: value } : variant
      );

      return { ...prev, variants: updatedVariants };
    });
  };

  const addVariant = () => {
    setProductData(prev => ({
      ...prev,
      variants: [...prev.variants, {
        size: 'medium',
        singlePieceWeight: 0,
        weightUnit: 'g',
        pricingUnit: 'per piece',
        price: 0,
        originalPrice: 0,
        discountPercentage: 0
      }]
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
    <div className="flex items-center justify-center min-h-screen w-full bg-amber-50 p-3">
      <ToastContainer position="top-right" toastClassName="!bg-amber-100 !text-green-800" />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-t-amber-500 border-amber-100 rounded-full animate-spin"></div>
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
                  <option value="mango">Mango</option>
                  <option value="premium mango">Premium Mango</option>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Size */}
                      <div className='relative'>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                        <select
                          name="size"
                          value={variant.size}
                          onChange={(e) => handleVariantChange(index, e)}
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                          required
                        >
                          <option value="small">Small</option>
                          <option value="medium">Medium</option>
                          <option value="large">Large</option>
                          <option value="jumbo">Jumbo</option>
                        </select>
                      </div>

                      {/* Single Piece Weight */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Single Piece Weight</label>
                        <input
                          type="number"
                          name="singlePieceWeight"
                          value={variant.singlePieceWeight}
                          onChange={(e) => handleVariantChange(index, e)}
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                          step="0.01"
                          required
                        />
                      </div>

                      {/* Weight Unit */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Weight Unit</label>
                        <select
                          name="weightUnit"
                          value={variant.weightUnit}
                          onChange={(e) => handleVariantChange(index, e)}
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="g">Grams (g)</option>
                          <option value="kg">Kilograms (kg)</option>
                        </select>
                      </div>

                      {/* Pricing Unit */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Pricing Unit</label>
                        <select
                          name="pricingUnit"
                          value={variant.pricingUnit}
                          onChange={(e) => handleVariantChange(index, e)}
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="per piece">Per Piece</option>
                          <option value="per kg">Per Kilogram</option>
                          <option value="per dozen">Per Dozen</option>
                        </select>
                      </div>

                      {/* Price */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                        <input
                          type="number"
                          name="price"
                          value={variant.price}
                          onChange={(e) => handleVariantChange(index, e)}
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                          step="0.01"
                          required
                        />
                      </div>

                      {/* Original Price */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Original Price</label>
                        <input
                          type="number"
                          name="originalPrice"
                          value={variant.originalPrice}
                          onChange={(e) => handleVariantChange(index, e)}
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                          step="0.01"
                        />
                      </div>

                      {/* Discount Percentage */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Discount Percentage</label>
                        <input
                          type="number"
                          name="discountPercentage"
                          value={variant.discountPercentage}
                          onChange={(e) => handleVariantChange(index, e)}
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                          min="0"
                          max="100"
                          step="1"
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
              </div>

              {/* Product Images */}
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
                  className='w-full py-4 bg-gradient-to-r from-amber-500 to-green-600 text-white rounded-xl font-bold text-lg hover:from-amber-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl'
                >
                  Update Details
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
