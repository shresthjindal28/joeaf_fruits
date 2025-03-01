import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSingleProduct } from '../redux/slices/ProductDataSlice'
import { useNavigate } from 'react-router-dom';
import { selectUserInfo } from '../redux/slices/UserInfoSlice';

function ProductList({ allProducts }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector(selectUserInfo);

    const handleClick = (item) => {
        dispatch(setSingleProduct(item));
        navigate(`/product/${item._id}`);
    }

    const handleEditClick = (item) => {
        dispatch(setSingleProduct(item));
        navigate(`/product/${item._id}/update`);
    }

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 w-full">
            {allProducts.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-shadow relative hover:!scale-105 duration-300">
                    {/* Discount Badge */}
                    {item.discountPercentage > 0 && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10">
                            {item.discountPercentage}% OFF
                        </div>
                    )}

                    {/* Product Image */}
                    <div className="relative aspect-square overflow-hidden" onClick={() => handleClick(item)}>
                        <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Product Content */}
                    <div className="p-3">
                        {/* Imported Badge */}
                        {item.imported && (
                            <div className="text-xs text-blue-600 font-medium mb-1">
                                Imported
                            </div>
                        )}

                        {/* Product Title */}
                        <h3 className="font-semibold text-gray-800 mb-1">
                            {item.name}
                        </h3>

                        {/* Product Variant */}
                        {item.variety && (
                            <div className="text-xs text-gray-500 mb-2 [&_span]:mx-1">
                                <span className="font-medium">[{item.variety}]</span>
                            </div>
                        )}

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 text-xs text-gray-500 mb-2">
                            {item.tags?.map((tag, i) => (
                                <span key={i} className="lowercase">
                                    {tag}{i !== item.tags.length - 1 && ' | '}
                                </span>
                            ))}
                        </div>

                        {/* Weight */}
                        <div className="text-xs text-gray-500 mb-2">
                            {item.quantity} kgs
                        </div>

                        {/* Price Section */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                {item.originalPrice ? (
                                    <>
                                        <span className="text-red-500 font-bold text-lg">
                                            ${Math.round(item.price).toLocaleString()}
                                        </span>
                                        <span className="text-gray-400 text-sm line-through">
                                            ${Math.round(item.originalPrice).toLocaleString()}
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-gray-800 font-bold text-lg">
                                        ¥{Math.round(item.price).toLocaleString()}
                                    </span>
                                )}
                            </div>

                            {/* Add Button */}
                            {
                                userInfo?.role === "Admin" ?
                                    <div className='flex gap-3'>
                                        <div className='flex py-1 px-2 rounded-md bg-gradient-to-r from-gray-400 to-gray-700 hover:from-gray-500 hover:to-gray-900 text-white cursor-pointer shadow hover:shadow-2xl' onClick={() => handleClick(item)}>View</div>
                                        <div className='flex py-1 px-2 rounded-md bg-gradient-to-r from-blue-300 to-blue-600 hover:from-blue-500 hover:to-blue-900 text-white cursor-pointer shadow hover:shadow-2xl' onClick={() => handleEditClick(item)}>Edit</div>
                                    </div>
                                    :
                                    <button className={`bg-blue-500 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-600 transition-colors`}>
                                        Add
                                    </button>
                            }
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProductList