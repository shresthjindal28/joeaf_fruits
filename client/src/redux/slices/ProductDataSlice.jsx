import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const intialState = {
    allProducts: [],
    singleProduct: null,
    newProduct: null,
    wishList: [],
    cartList: [],
    error: null
}

export const addNewProductRoute = createAsyncThunk(
    'Add new Product in the data base',
    async (payload, { getState, thunkAPI }) => {
        const state = getState();
        const token = state.userInfo.userToken;
        if (!token) return rejectWithValue("Token is missing");
        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/product/addproduct`, payload,
                {
                    headers: {
                        'Content-Type': "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            )

            const result = await response.data;

            return result.success === true ? result.product : null;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const getAllProducts = createAsyncThunk(
    'Get All the products available',
    async (payload, thunkAPI) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/product/`, {
                withCredentials: true
            })

            const result = await response.data;

            return result.success === true ? result.allProducts : null;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const getSingleProduct = createAsyncThunk(
    'Get the single products details',
    async (payload, thunkAPI) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/product/${payload}`, {
                withCredentials: true
            })

            const result = await response.data;

            return result.success === true ? result.product : null;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const updateProductRoute = createAsyncThunk(
    "Update the product data",
    async (payload, { getState, rejectWithValue }) => {
        const state = getState();
        const token = state.userInfo.userToken;
        if (!token) return rejectWithValue("Token is missing");
        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/product/${payload._id}/update`, payload,
                {
                    headers: {
                        'Content-Type': "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            )
            const result = await response.data;

            return result.success === true ? result.product : null;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const addProductToWishList = createAsyncThunk(
    "Adding product to the wishlist",
    async (payload, { getState, rejectWithValue }) => {
        const state = getState();
        const token = state.userInfo.userToken;
        if (!token) return rejectWithValue("Token is missing");

        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/product/${payload.productId}/addwishlist`, payload,
                {
                    headers: {
                        'Content-Type': "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            )
            const result = await response.data;

            return result.success === true ? result.list.wishList : null;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const removeProductFromWishList = createAsyncThunk(
    "Removing product from the wishlist",
    async (payload, { getState, rejectWithValue }) => {
        const state = getState();
        const token = state.userInfo.userToken;
        if (!token) return rejectWithValue("Token is missing");

        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/product/${payload.productId}/removewishlist`, payload,
                {
                    headers: {
                        'Content-Type': "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            )
            const result = await response.data;

            return result.success === true ? result.list.wishList : null;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const addProductToCart = createAsyncThunk(
    "Adding product to the cart",
    async (payload, { getState, rejectWithValue }) => {
        const state = getState();
        const token = state.userInfo.userToken;
        if (!token) return rejectWithValue("Token is missing");

        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/product/${payload.productId}/addcart`, payload,
                {
                    headers: {
                        'Content-Type': "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            )
            const result = await response.data;

            return result.success === true ? result.list.cart : null;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const removeProductFromCart = createAsyncThunk(
    "Removing product from the cart",
    async (payload, { getState, rejectWithValue }) => {
        const state = getState();
        const token = state.userInfo.userToken;
        if (!token) return rejectWithValue("Token is missing");

        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/product/${payload.productId}/removecart`, payload,
                {
                    headers: {
                        'Content-Type': "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            )
            const result = await response.data;

            return result.success === true ? result.list.cart : null;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const getUserWishList = createAsyncThunk(
    'Getting user wishList',
    async(_, {getState, rejectWithValue}) => {
        const state = getState();
        const token = state.userInfo.userToken;
        const userInfo = state.userInfo.userInfo;
        if (!token) return rejectWithValue("Token is missing");

        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/user/${userInfo._id}/wishlist`,
                {
                    headers: {
                        'Content-Type': "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            )
            const result = await response.data;

            return result.success === true ? result.wishlist : null;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const getUserCartList = createAsyncThunk(
    'Getting user cart list items',
    async(_, {getState, rejectWithValue}) => {
        const state = getState();
        const token = state.userInfo.userToken;
        const userInfo = state.userInfo.userInfo;
        if (!token) return rejectWithValue("Token is missing");

        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/user/${userInfo._id}/cart`,
                {
                    headers: {
                        'Content-Type': "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            )
            const result = await response.data;

            return result.success === true ? result.cartlist : null;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const ProductSlice = createSlice({
    name: 'productData',
    initialState: intialState,
    reducers: {
        resetNewProduct: (state) => {
            state.newProduct = null;
            state.error = null;
        },
        resetSingleProduct: (state) => {
            state.singleProduct = null;
            state.error = null;
        },
        setSingleProduct: (state, action) => {
            state.singleProduct = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addNewProductRoute.pending, (state) => {
                state.error = null
            })
            .addCase(addNewProductRoute.fulfilled, (state, action) => {
                state.newProduct = action.payload
                state.error = null
            })
            .addCase(addNewProductRoute.rejected, (state, action) => {
                state.error = action.payload
                state.newProduct = null
            })
            .addCase(getAllProducts.pending, (state) => {
                state.error = null
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.allProducts = action.payload
                state.error = null
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.error = action.payload
                state.allProducts = null
            })
            .addCase(getSingleProduct.pending, (state) => {
                state.error = null
            })
            .addCase(getSingleProduct.fulfilled, (state, action) => {
                state.singleProduct = action.payload
                state.error = null
            })
            .addCase(getSingleProduct.rejected, (state, action) => {
                state.error = action.payload
                state.singleProduct = null
            })
            .addCase(updateProductRoute.pending, (state) => {
                state.error = null
            })
            .addCase(updateProductRoute.fulfilled, (state, action) => {
                state.newProduct = action.payload
                state.error = null
            })
            .addCase(updateProductRoute.rejected, (state, action) => {
                state.error = action.payload
                state.singleProduct = null
            })
            .addCase(addProductToWishList.pending, (state) => {
                state.error = null
            })
            .addCase(addProductToWishList.fulfilled, (state, action) => {
                state.wishList = action.payload
                state.error = null
            })
            .addCase(addProductToWishList.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(removeProductFromWishList.pending, (state) => {
                state.error = null
            })
            .addCase(removeProductFromWishList.fulfilled, (state, action) => {
                state.wishList = action.payload
                state.error = null
            })
            .addCase(removeProductFromWishList.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(getUserWishList.pending, (state) => {
                state.error = null
            })
            .addCase(getUserWishList.fulfilled, (state, action) => {
                state.wishList = action.payload
                state.error = null
            })
            .addCase(getUserWishList.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(addProductToCart.pending, (state) => {
                state.error = null
            })
            .addCase(addProductToCart.fulfilled, (state, action) => {
                state.cartList = action.payload
                state.error = null
            })
            .addCase(addProductToCart.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(removeProductFromCart.pending, (state) => {
                state.error = null
            })
            .addCase(removeProductFromCart.fulfilled, (state, action) => {
                state.cartList = action.payload
                state.error = null
            })
            .addCase(removeProductFromCart.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(getUserCartList.pending, (state) => {
                state.error = null
            })
            .addCase(getUserCartList.fulfilled, (state, action) => {
                state.cartList = action.payload
                state.error = null
            })
            .addCase(getUserCartList.rejected, (state, action) => {
                state.error = action.payload
            })
    }
})

export const selectProductError = (state) => state.productData.error;
export const selectNewProduct = (state) => state.productData.newProduct;
export const selectAllProducts = (state) => state.productData.allProducts;
export const selectWishList = (state) => state.productData.wishList;
export const selectCartList = (state) => state.productData.cartList;
export const selectSingleProduct = (state) => state.productData.singleProduct;

export const { resetNewProduct, resetSingleProduct, setSingleProduct } = ProductSlice.actions;

export default ProductSlice.reducer;