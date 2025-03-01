import {configureStore} from '@reduxjs/toolkit';
import userInfoReducer from './slices/UserInfoSlice';
import productReducer from './slices/ProductDataSlice';

export const reduxStore = configureStore({
    reducer : {
        userInfo : userInfoReducer,
        productData: productReducer,
    }
});