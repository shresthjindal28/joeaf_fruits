import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { removeProductFromCart, selectCartList } from '../redux/slices/ProductDataSlice'

const CartDropdown = React.memo(({ setShowCart }) => {
    const dispatch = useDispatch();
    const userCartList = useSelector(selectCartList);

    const unitLabels = {
        'per piece': 'pieces',
        'per kg': 'kg',
        'per dozen': 'dozen'
    };

    const handleRemoveCart = (item) => {
        dispatch(removeProductFromCart({ productId: item._id }));
    }

    return (
        <div className="absolute md:right-25 sm:right-20 right-2.5 top-full mt-2 w-76 sm:w-85 bg-white rounded-xl shadow-2xl border border-amber-100 z-50 px-3">
            <div className="sm:px-3 py-4">
                <h3 className="text-lg font-bold text-green-800 mb-4">Shopping Cart</h3>

                {userCartList.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">Your cart is empty</p>
                ) : (
                    <>
                        <div className="max-h-96 overflow-scroll hide-scrollbar">
                            {userCartList.map((item, index) => (
                                <div key={index} className="flex gap-3 py-3 border-b border-b-1 border-amber-400">
                                    <img
                                        src={item.images[0]}
                                        alt=""
                                        className="w-24 h-32 object-cover rounded-lg"
                                    />
                                    <div className="flex-1 w-full">
                                        <div className='flex w-full justify-between gap-2 items-center'>
                                            <h6 className="font-semibold text-green-900">{item.name}</h6>
                                            <div
                                                onClick={() => (handleRemoveCart(item))}
                                                className='rounded-full hover:bg-green-100 cursor-pointer py-1 px-2'
                                            >
                                                <i className="fa-solid fa-trash fa-shake" style={{ color: "#FFD43B" }} />
                                            </div>
                                        </div>
                                        <p className="text-sm text-amber-600">
                                            {item.variants[0].size} • {item.category}
                                        </p>
                                        <div className="flex justify-between items-center mt-1">
                                            <span className="text-green-600 font-bold text-[20px]">
                                                ${item.variants[0].price}
                                            </span>
                                            <span className="text-gray-500 text-sm">
                                                Qty: 1 {unitLabels[item.variants[0].pricingUnit]}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4 border-t border-amber-100">
                            <div className="flex justify-between items-center mb-4">
                                <span className="font-bold text-green-800 text-md">Subtotal:</span>
                                <span className="text-green-600 font-bold text-[20px]">
                                    ${userCartList.reduce((sum, item) => sum + (item.variants[0].price * item.quantity), 0).toFixed(2)}
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-[18px] font-bold">
                                <Link
                                    to="/cart"
                                    className="bg-gradient-to-r from-green-500 to-amber-500 text-white py-2 px-4 rounded-lg text-center hover:from-green-600 hover:to-amber-600 transition-all"
                                    onClick={() => ( setShowCart(false) )}
                                >
                                    View Cart
                                </Link>
                                <Link
                                    to="/checkout"
                                    className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white py-2 px-4 rounded-lg text-center hover:from-amber-600 hover:to-yellow-600 transition-all"
                                    onClick={() => ( setShowCart(false) )}
                                >
                                    Checkout
                                </Link>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
});

export default CartDropdown