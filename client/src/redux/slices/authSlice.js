import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
    isSidebarOpen: false,
}
// Explanation:
// initialState: An object that represents the initial state of your slice.
// user: Checks if there is any user information stored in the browser's localStorage under the key "userInfo". If found, it parses the JSON string into a JavaScript object. If not found, it defaults to null.
// isSidebarOpen: A boolean flag that indicates whether the sidebar is open or closed. Initially set to false.

// createSlice: This function takes an object with name, initialState, and reducers properties to create the slice.
// name: The name of the slice, which is "auth" in this case. one type of key.
// initialState: The initial state defined above.
// reducers: An object containing reducer functions that define how the state can be updated. Each function defines how to update the state for a specific action.
const authSlice = createSlice ({
    name:"auth",
    initialState,
    reducers:{
        setCredentials:(state,action) => {
            // state: The current state of the slice.
            // action: Contains the payload with the new user information.
            state.user = action.payload;
            localStorage.setItem("userInfo",JSON.stringify(action.payload)); // set the item in the localStorage
        },
        logout:(state,action) => {
            state.user=null;
            localStorage.removeItem("userInfo"); // remove item from the local storage when user loggedout
        },
        setOpenSidebar:(state,action) => {
        // state: The current state of the slice.
        // action: Contains the payload with the new value for isSidebarOpen (value is true or false )
            state.isSidebarOpen = action.payload;
        },
    },
});
export const{
    setCredentials,logout,setOpenSidebar
} = authSlice.actions;
export default authSlice.reducer;
// When you create a slice using createSlice, it automatically generates action creators and a reducer based on the reducers(setCredentials,logout,setOpenSidebar are the reducers) you define.
// A single reducer function that handles all the actions defined in the reducers object. When you export authSlice.reducer, you're exporting the combined reducer function that handles all the actions defined in your slice.