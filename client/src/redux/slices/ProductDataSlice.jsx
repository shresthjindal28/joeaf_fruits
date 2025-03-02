import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const intialState = {
    allProducts: [],
    singleProduct: null,
    newProduct: null,
    wishList: [],
    error: null
}

export const addNewProductRoute = createAsyncThunk(
    'Add new Product in the data base',
    async (payload, {getState, thunkAPI}) => {
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
    async(payload, thunkAPI) => {
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

export const updateProductRoute = createAsyncThunk(
    "Update the product data",
    async(payload, {getState, rejectWithValue}) => {
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
    async(payload, {getState, rejectWithValue}) => {
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

            return result.success === true ? result.list : null;
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
    extraReducers: ( builder) => {
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
                state.singleProduct = null
            })
    }
})

export const selectProductError = (state) => state.productData.error;
export const selectNewProduct = (state) => state.productData.newProduct;
export const selectAllProducts = (state) => state.productData.allProducts;
export const selectWishList = (state) => state.productData.wishList;
export const selectSingleProduct = (state) => state.productData.singleProduct;

export const { resetNewProduct, resetSingleProduct, setSingleProduct } = ProductSlice.actions;

export default ProductSlice.reducer;