// src/redux/slices/searchSlice.js
import { createSlice } from '@reduxjs/toolkit'; // Import the createSlice function from the Redux Toolkit

const searchSlice = createSlice({
    name: 'search', // Name of the slice, used as a prefix for action types
    initialState: {
        text: '', // Initial state with a single property `text` initialized to an empty string
    },
    reducers: {
        setSearchText: (state, action) => { // Reducer function to handle setting the search text
            state.text = action.payload; // Update the state's `text` property with the payload from the dispatched action..
            // means what ever we passed to the dispatch function is act as a action.payload
        },
    },
});

export const { setSearchText } = searchSlice.actions; // Export the generated action creator function `setSearchText`

export default searchSlice.reducer; // Export the reducer function to be used in the Redux store
