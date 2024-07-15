import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice.js";
import authReducer from "./slices/authSlice.js";
import searchReducer from './slices/searchSlice.js';

const store = configureStore({
    reducer:{
        [apiSlice.reducerPath] : apiSlice.reducer,
        // [apiSlice.reducerPath]: Dynamically sets the key for the apiSlice reducer using its reducerPath property. where below we already defined the key=auth..but here it create the dynamic key
        // This is useful when integrating slices created with createApi from @reduxjs/toolkit/query.
        // apiSlice.reducer: The reducer function from "apiSlice"( which we export in the apiSlice.js file ) that handles API-related actions and state.
        auth:authReducer, // Adds the reducer from authSlice under the key auth
        search: searchReducer, // adds the reducer from searchSlice under the key search...
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
//     getDefaultMiddleware: A function that returns the default middleware provided by @reduxjs/toolkit (such as redux-thunk for handling async actions).
// .concat(apiSlice.middleware): Adds additional middleware from apiSlice. This is typically used for handling side effects and caching related to API requests managed by createApi.
    devTools: true, // Enables the Redux DevTools extension. This allows you to inspect every action and state change in your application.
});
export default store;
