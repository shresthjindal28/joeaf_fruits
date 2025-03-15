import React, { useEffect, useState } from 'react';
import uploadFile from '../components/FileUploadar';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addNewProductRoute, resetNewProduct, selectNewProduct, selectProductError, setSingleProduct } from '../redux/slices/ProductDataSlice';

function AddNewProduct() {
    const navigate = useNavigate();
    const newProduct = useSelector(selectNewProduct);
    const err = useSelector(selectProductError);
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);
    const [fruitData, setFruitData] = useState({
        name: '',
        slug: '',
        description: '',
        category: 'mango',
        variants: [{
            size: 'medium',
            singlePieceWeight: 0,
            weightUnit: 'g',
            pricingUnit: 'per piece',
            price: 0,
            originalPrice: 0,
            discountPercentage: 0
        }],
        images: [],
        tags: [],
        origin: 'indian',
        nutritionalInfo: {
            calories: 0,
            vitamins: []
        },
        isFeatured: false,
        stockQuantity: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('nutritionalInfo.')) {
            const field = name.split('.')[1];
            setFruitData(prev => ({
                ...prev,
                nutritionalInfo: {
                    ...prev.nutritionalInfo,
                    [field]: value
                }
            }));
        } else {
            setFruitData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleVariantChange = (index, e) => {
        const { name, value } = e.target;
        const variants = [...fruitData.variants];

        // Convert numeric fields to numbers
        const parsedValue = ['singlePieceWeight', 'price', 'originalPrice', 'discountPercentage'].includes(name)
            ? parseFloat(value)
            : value;

        variants[index][name] = parsedValue;
        setFruitData({ ...fruitData, variants });
    };

    const addVariant = () => {
        setFruitData({
            ...fruitData,
            variants: [...fruitData.variants, {
                size: 'medium',
                singlePieceWeight: 0,
                weightUnit: 'g',
                pricingUnit: 'per piece',
                price: 0,
                originalPrice: 0,
                discountPercentage: 0
            }]
        });
    };

    const removeVariant = (index) => {
        const variants = fruitData.variants.filter((_, i) => i !== index);
        setFruitData({ ...fruitData, variants });
    };

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

            setFruitData(prev => ({
                ...prev,
                images: [...prev.images, ...uploadedUrls]
            }));
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };

    const handleRemoveImage = (urlToRemove) => {
        setFruitData(prev => ({
            ...prev,
            images: prev.images.filter(url => url !== urlToRemove)
        }));
    };

    const handleTagsChange = (e) => {
        const tags = e.target.value.split(',').map(tag => tag.trim());
        setFruitData({ ...fruitData, tags });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        dispatch(resetNewProduct());

        // Generate slug from name
        const slug = fruitData.name.toLowerCase().replace(/\s+/g, '-');
        const productData = { ...fruitData, slug };

        dispatch(addNewProductRoute(productData));
    };

    useEffect(() => {
        if (isLoading) {
            if (err && !newProduct) {
                toast.error("Error in Adding the Item! Please try again.", { autoClose: 5000 }); // Show success toast
                setLoading(false);
                setFruitData({
                    type: '',
                    name: '',
                    varitey: '',
                    price: '',
                    quantity: '',
                    description: '',
                    images: []
                })
            }
            else if (newProduct) {
                toast.success("New Item Added Successfully", { autoClose: 5000 });
                setLoading(false);
                console.log("New product added : ", newProduct);
                dispatch(setSingleProduct(newProduct));
                navigate(`/product/${newProduct._id}`);
            }
        }
    }, [newProduct, err])

    return (
        <div className="flex items-center justify-center min-h-screen w-full bg-amber-50 p-3">
            <ToastContainer position="top-right" toastClassName="!bg-amber-100 !text-green-800" />

            {/* Loading Overlay */}
            {isLoading && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-t-amber-500 border-amber-100 rounded-full animate-spin"></div>
                </div>
            )}

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-xl rounded-2xl p-4 w-full max-w-4xl space-y-8 max-h-[90vh] overflow-y-scroll hide-scrollbar border-2 border-amber-100"
            >
                {/* Form Header */}
                <div className="text-center mb-8">
                    <span className="sm:text-3xl xs:text-2xl text-lg font-bold text-amber-800 mb-2">
                        Add New Mango Product 🥭
                    </span>
                    <p className="text-amber-600 xs:text-lg text-xs">Fill in details of your mango</p>
                </div>

                {/* Name and Type */}
                <div className="bg-amber-50 p-3 rounded-xl border border-amber-100">
                    <div className="flex items-center mb-4">
                        <i className="fas fa-tag text-amber-600 mr-2" />
                        <label className="text-xl font-semibold text-amber-800">Basic Information</label>
                    </div>

                    <div className="space-y-6">
                        {/* Category Input */}
                        <div>
                            <label className="block text-amber-800 font-medium mb-2">Category</label>
                            <div className="">
                                <select
                                    name="category"
                                    value={fruitData.category}
                                    onChange={handleChange}
                                    className="w-full p-2 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white text-amber-800"
                                    required
                                >
                                    <option value="mango">Standard Mango</option>
                                    <option value="premium mango">Premium Mango</option>
                                </select>
                            </div>
                        </div>

                        {/* Name Input */}
                        <div>
                            <label className="block text-amber-800 font-medium mb-2">Mango Name</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="name"
                                    value={fruitData.name}
                                    onChange={handleChange}
                                    placeholder="e.g., Alphonso, Kesar"
                                    className="w-full p-2 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white text-amber-800"
                                    required
                                />
                                <i className="fas fa-mango absolute right-3 top-4 text-amber-500" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Variants Section */}
                <div className="bg-amber-50 p-3 rounded-xl border border-amber-100">
                    <div className="flex items-center mb-4">
                        <i className="fas fa-weight-hanging text-amber-600 mr-2" />
                        <span className="text-xl font-semibold text-amber-800">Pricing & Variants</span>
                    </div>
                    {fruitData.variants.map((variant, index) => (
                        <div key={index} className="mb-4 p-3 bg-white rounded-lg shadow-sm border border-amber-100">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {/* Size */}
                                <div className='relative'>
                                    <label className="block text-sm text-amber-700 mb-1">Size</label>
                                    <select
                                        name="size"
                                        value={variant.size}
                                        onChange={(e) => handleVariantChange(index, e)}
                                        className="w-full p-2 border-2 border-amber-100 rounded-md bg-white text-amber-800"
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
                                    <label className="block text-sm text-amber-700 mb-1">Single Piece Weight</label>
                                    <input
                                        type="number"
                                        name="singlePieceWeight"
                                        value={variant.singlePieceWeight}
                                        onChange={(e) => handleVariantChange(index, e)}
                                        className="w-full p-2 border-2 border-amber-100 rounded-md bg-white text-amber-800"
                                        step="0.01"
                                        required
                                    />
                                </div>

                                {/* Weight Unit */}
                                <div>
                                    <label className="block text-sm text-amber-700 mb-1">Weight Unit</label>
                                    <select
                                        name="weightUnit"
                                        value={variant.weightUnit}
                                        onChange={(e) => handleVariantChange(index, e)}
                                        className="w-full p-2 border-2 border-amber-100 rounded-md bg-white text-amber-800"
                                    >
                                        <option value="g">Grams (g)</option>
                                        <option value="kg">Kilograms (kg)</option>
                                    </select>
                                </div>

                                {/* Pricing Unit */}
                                <div>
                                    <label className="block text-sm text-amber-700 mb-1">Pricing Unit</label>
                                    <select
                                        name="pricingUnit"
                                        value={variant.pricingUnit}
                                        onChange={(e) => handleVariantChange(index, e)}
                                        className="w-full p-2 border-2 border-amber-100 rounded-md bg-white text-amber-800"
                                    >
                                        <option value="per piece">Per Piece</option>
                                        <option value="per kg">Per Kilogram</option>
                                        <option value="per dozen">Per Dozen</option>
                                    </select>
                                </div>

                                {/* Price */}
                                <div>
                                    <label className="block text-sm text-amber-700 mb-1">Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={variant.price}
                                        onChange={(e) => handleVariantChange(index, e)}
                                        className="w-full p-2 border-2 border-amber-100 rounded-md bg-white text-amber-800"
                                        step="0.01"
                                        required
                                    />
                                </div>

                                {/* Original Price */}
                                <div>
                                    <label className="block text-sm text-amber-700 mb-1">Original Price</label>
                                    <input
                                        type="number"
                                        name="originalPrice"
                                        value={variant.originalPrice}
                                        onChange={(e) => handleVariantChange(index, e)}
                                        className="w-full p-2 border-2 border-amber-100 rounded-md bg-white text-amber-800"
                                        step="0.01"
                                    />
                                </div>

                                {/* Discount Percentage */}
                                <div>
                                    <label className="block text-sm text-amber-700 mb-1">Discount Percentage</label>
                                    <input
                                        type="number"
                                        name="discountPercentage"
                                        value={variant.discountPercentage}
                                        onChange={(e) => handleVariantChange(index, e)}
                                        className="w-full p-2 border-2 border-amber-100 rounded-md bg-white text-amber-800"
                                        min="0"
                                        max="100"
                                        step="1"
                                    />
                                </div>
                            </div>
                            {fruitData.variants.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeVariant(index)}
                                    className="mt-3 text-red-500 hover:text-red-700 text-sm flex items-center"
                                >
                                    <i className="fas fa-times mr-1" />
                                    Remove Variant
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addVariant}
                        className="w-full py-2 text-amber-700 hover:text-amber-900 border-2 border-dashed border-amber-300 rounded-lg flex items-center justify-center gap-2"
                    >
                        <i className="fas fa-plus-circle" />
                        Add Variant
                    </button>
                </div>

                {/* Additional Information */}
                <div className="bg-amber-50 p-3 rounded-xl border border-amber-100 space-y-6">
                    <div className="flex items-center mb-4">
                        <i className="fa-solid fa-square-pen fa-lg text-amber-600 mr-2" />
                        <span className="text-xl font-semibold text-amber-800">Additional Details</span>
                    </div>
                    
                    {/* Origin */}
                    <div>
                        <label className="block text-sm text-amber-700 mb-1">Origin</label>
                        <select
                            name="origin"
                            value={fruitData.origin}
                            onChange={handleChange}
                            className="w-full p-2 border-2 border-amber-100 rounded-md bg-white text-amber-800"
                            required
                        >
                            <option value="indian">Indian</option>
                            <option value="imported">Imported</option>
                        </select>
                    </div>

                    {/* Nutritional Info */}
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm text-amber-700 mb-1">Calories (per 100g)</label>
                            <input
                                type="number"
                                name="nutritionalInfo.calories"
                                value={fruitData.nutritionalInfo.calories}
                                onChange={handleChange}
                                className="w-full p-2 border-2 border-amber-100 rounded-md bg-white text-amber-800"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-amber-700 mb-1">Vitamins (comma separated)</label>
                            <input
                                type="text"
                                name="nutritionalInfo.vitamins"
                                value={fruitData.nutritionalInfo.vitamins.join(', ')}
                                onChange={(e) => {
                                    const vitamins = e.target.value.split(',').map(v => v.trim());
                                    setFruitData(prev => ({
                                        ...prev,
                                        nutritionalInfo: {
                                            ...prev.nutritionalInfo,
                                            vitamins
                                        }
                                    }));
                                }}
                                className="w-full p-2 border-2 border-amber-100 rounded-md bg-white text-amber-800"
                                placeholder="C, K, A..."
                            />
                        </div>
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-sm text-amber-700 mb-1">Tags (comma separated)</label>
                        <input
                            type="text"
                            value={fruitData.tags.join(', ')}
                            onChange={handleTagsChange}
                            className="w-full p-2 border-2 border-amber-100 rounded-md bg-white text-amber-800"
                            placeholder="organic, summer-fruits, exotic..."
                        />
                    </div>

                    {/* Stock Quantity */}
                    <div>
                        <label className="block text-sm text-amber-700 mb-1">Stock Quantity</label>
                        <input
                            type="number"
                            name="stockQuantity"
                            value={fruitData.stockQuantity}
                            onChange={handleChange}
                            className="w-full p-2 border-2 border-amber-100 rounded-md bg-white text-amber-800"
                            required
                            min="0"
                        />
                    </div>

                </div>

                {/* Description */}
                <div className='bg-amber-50 p-3 rounded-xl border border-amber-100 space-y-6'>
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="description">
                        Description about the fruit
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        value={fruitData.description}
                        onChange={handleChange}
                        placeholder="Enter fruit description"
                        className="w-full p-2 border-2 border-amber-100 rounded-md bg-white text-amber-800"
                        rows="4"
                        required
                    ></textarea>
                </div>

                {/* Image Upload Section */}
                <div className="bg-amber-50 p-3 rounded-xl border border-amber-100">
                    <div className="flex items-center mb-4">
                        <i className="fas fa-images text-amber-600 mr-2" />
                        <span className="text-xl font-semibold text-amber-800">Mango Images</span>
                    </div>

                    <div className="border-2 border-dashed border-amber-200 rounded-xl p-3 text-center">
                        {/* Hidden file input */}
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="imageUpload"
                        />

                        <label
                            htmlFor="imageUpload"
                            className="cursor-pointer flex flex-col items-center justify-center space-y-3"
                        >
                            <i className="fas fa-upload text-amber-500 text-3xl" />
                            <p className="text-amber-700 font-medium">
                                Drag & drop images or <span className="text-amber-600 underline">browse files</span>
                            </p>
                            <p className="sm:text-xs text-xs text-amber-500">Recommended size: 800x800px</p>
                        </label>
                    </div>

                    {/* Custom upload button */}
                    {/* <button
                        type="button"
                        onClick={() => document.getElementById('imageUpload').click()}
                        className="w-full py-3 px-6 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center justify-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                        Upload Images
                    </button> */}

                    {/* Image Previews */}
                    {fruitData.images.length > 0 && (
                        <div className="mt-4 border border-gray-200 rounded-lg p-3">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                {fruitData.images.map((url) => (
                                    <div key={url} className="rounded-md relative aspect-square group shadow-md hover:shadow-2xl transition-shadow relative hover:!scale-105 duration-300">
                                        <img
                                            src={url}
                                            alt="Preview"
                                            className="w-full h-full object-cover rounded-md"
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
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-amber-500 to-green-600 text-white rounded-xl font-bold text-lg hover:from-amber-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl"
                >
                    Add Mango Product
                </button>
            </form>
        </div>
    );
}

export default AddNewProduct;
