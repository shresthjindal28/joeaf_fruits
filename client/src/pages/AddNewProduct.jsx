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
        type: '',
        name: '',
        variety: '',
        price: '',
        quantity: '',
        description: '',
        images: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFruitData((prev) => ({ ...prev, [name]: value }));
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        dispatch(resetNewProduct());
        dispatch(addNewProductRoute(fruitData));
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
            else if (newProduct ){
                toast.success("New Item Added Successfully", { autoClose: 5000 });
                setLoading(false);
                console.log("New product added : ", newProduct);
                dispatch(setSingleProduct(newProduct));
                navigate(`/product/${newProduct._id}`);
            }
        }
    }, [newProduct, err])

    return (
        <div className="flex items-center justify-center h-full w-full bg-gray-100 p-5">
            <ToastContainer position="top-right" />
            {/* Loading Overlay */}
            {isLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
                </div>
            )}
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl space-y-6 max-h-[80vh] overflow-y-scroll hide-scrollbar"
            >
                <h2 className="text-2xl font-bold text-gray-800">Add New Fruit</h2>

                {/* Fruit type */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
                        Fruit Type
                    </label>
                    <select
                        name="type"
                        id="type"
                        value={fruitData.type}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                        required
                    >
                        <option value="" disabled>
                            Select a fruit type
                        </option>
                        <option value="Mango">Mango</option>
                        <option value="Orange">Orange</option>
                        <option value="Strawberry">Strawberry</option>
                        <option value="Apple">Apple</option>
                        <option value="Banana">Banana</option>
                        {/* Add more options as needed */}
                    </select>
                </div>

                {/* Fruit Name */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
                        Fruit Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={fruitData.name}
                        onChange={handleChange}
                        placeholder="Enter fruit name"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                        required
                    />
                </div>

                {/* Fruit Variety */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
                        Fruit Variety
                    </label>
                    <input
                        type="text"
                        name="variety"
                        id="variety"
                        value={fruitData.variety}
                        onChange={handleChange}
                        placeholder="Enter fruit variety"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                        required
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="price">
                        Price ($) per unit of quantity
                    </label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        value={fruitData.price}
                        onChange={handleChange}
                        placeholder="Enter price"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                        required
                        min="0"
                        step="0.01"
                    />
                </div>

                {/* Quantity */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="price">
                        Fruit quantity available
                    </label>
                    <input
                        type="number"
                        name="quantity"
                        id="quantity"
                        value={fruitData.quantity}
                        onChange={handleChange}
                        placeholder="Enter quantity of fruit available"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                        required
                        min="0"
                        step="0.01"
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
                        <div className="mt-4 border border-gray-200 rounded-lg p-4">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {fruitData.images.map((url) => (
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
