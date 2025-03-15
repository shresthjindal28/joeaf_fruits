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
            weight: '',
            unit: 'g',
            price: '',
            originalPrice: ''
        }],
        images: [],
        tags: [],
        origin: 'indian',
        nutritionalInfo: {
            calories: '',
            vitamins: []
        },
        discountPercentage: 0,
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
        variants[index][name] = value;
        setFruitData({ ...fruitData, variants });
    };

    const addVariant = () => {
        setFruitData({
            ...fruitData,
            variants: [...fruitData.variants, {
                weight: '',
                unit: 'g',
                price: '',
                originalPrice: ''
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
        <div className="flex items-center justify-center h-full w-full bg-gray-100 p-3">
            <ToastContainer position="top-right" />

            {/* Loading Overlay */}
            {isLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
                </div>
            )}

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl space-y-6 max-h-[86vh] overflow-y-scroll hide-scrollbar"
            >
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Add New Fruit</h2>

                {/* Category */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Category</label>
                    <select
                        name="category"
                        value={fruitData.category}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                        required
                    >
                        <option value="mango">Mango</option>
                        <option value="premium mango">Premium Mango</option>
                    </select>
                </div>

                {/* Name */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Fruit Name</label>
                    <input
                        type="text"
                        name="name"
                        value={fruitData.name}
                        onChange={handleChange}
                        placeholder="Enter fruit name"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                        required
                    />
                </div>

                {/* Variants */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Product Variants</label>
                    {fruitData.variants.map((variant, index) => (
                        <div key={index} className="mb-4 p-3 border rounded-lg">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm text-gray-600">Weight</label>
                                    <input
                                        type="number"
                                        name="weight"
                                        value={variant.weight}
                                        onChange={(e) => handleVariantChange(index, e)}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600">Unit</label>
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
                                    <label className="block text-sm text-gray-600">Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={variant.price}
                                        onChange={(e) => handleVariantChange(index, e)}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600">Original Price</label>
                                    <input
                                        type="number"
                                        name="originalPrice"
                                        value={variant.originalPrice}
                                        onChange={(e) => handleVariantChange(index, e)}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                            </div>
                            {fruitData.variants.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeVariant(index)}
                                    className="mt-2 text-red-500 text-sm hover:text-red-700"
                                >
                                    Remove Variant
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addVariant}
                        className="text-green-500 hover:text-green-700 text-sm"
                    >
                        + Add Variant
                    </button>
                </div>

                {/* Origin */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Origin</label>
                    <select
                        name="origin"
                        value={fruitData.origin}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                        required
                    >
                        <option value="indian">Indian</option>
                        <option value="imported">Imported</option>
                    </select>
                </div>

                {/* Nutritional Info */}
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Calories (per 100g)</label>
                        <input
                            type="number"
                            name="nutritionalInfo.calories"
                            value={fruitData.nutritionalInfo.calories}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Vitamins (comma separated)</label>
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
                            className="w-full p-3 border border-gray-300 rounded-md"
                            placeholder="C, K, A..."
                        />
                    </div>
                </div>

                {/* Tags */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Tags (comma separated)</label>
                    <input
                        type="text"
                        value={fruitData.tags.join(', ')}
                        onChange={handleTagsChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="organic, summer-fruits, exotic..."
                    />
                </div>

                {/* Stock Quantity */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Stock Quantity</label>
                    <input
                        type="number"
                        name="stockQuantity"
                        value={fruitData.stockQuantity}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        required
                        min="0"
                    />
                </div>

                {/* Discount Percentage */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Discount Percentage</label>
                    <input
                        type="number"
                        name="discountPercentage"
                        value={fruitData.discountPercentage}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        min="0"
                        max="100"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="description">
                        Description about the fruit
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        value={fruitData.description}
                        onChange={handleChange}
                        placeholder="Enter fruit description"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                        rows="4"
                        required
                    ></textarea>
                </div>

                {/* Image Upload Section */}
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

                    {/* Custom upload button */}
                    <button
                        type="button"
                        onClick={() => document.getElementById('imageUpload').click()}
                        className="w-full py-3 px-6 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center justify-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                        Upload Images
                    </button>

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
                    className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                >
                    Add Fruit
                </button>
            </form>
        </div>
    );
}

export default AddNewProduct;
