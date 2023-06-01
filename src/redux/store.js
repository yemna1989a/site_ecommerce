import { configureStore } from '@reduxjs/toolkit'
import articlesReducer from"../features/articleSlice"
import categoriesReducer from"../features/categorieSlice"
import scategoriesReducer from "../features/scategorieSlice"
import authReducer from "../features/AuthSlice"
import cartReducer from"../features/cartSlice"
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';
const persistConfig = {
key: 'root',
version: 1,
storage,
}
const persistedReducer = persistReducer(persistConfig, authReducer)
const store = configureStore({
    reducer: {
    storearticles:articlesReducer,
    storecategories:categoriesReducer,
    storescategories:scategoriesReducer,
    auth:persistedReducer,
    cart:cartReducer

    },
    middleware: [thunk]
    })
    export default store