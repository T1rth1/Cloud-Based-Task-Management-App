import { apiSlice } from "../slices/apiSlice"; // Import the base API slice

const AUTH_URL = "/user"; // Define the base URL for authentication-related endpoints..and for this login,register and logout we have the user routes..so endpoint /api/user/something

// Inject authentication endpoints into the base API slice
export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({ // this is the builder function to create the endpoints...
        // Define the login mutation endpoint
        login: builder.mutation({
            // Configure the query for the login endpoint
            query: (data) => ({
                url: `${AUTH_URL}/login`, // Set the URL for the login endpoint
                method: "POST", // Use POST method for login
                body: data, // Include the data (e.g., username and password) in the request body..so when we define a mutation or 
                // POST request to an API endpoint, the body typically refers to the data that you send from the frontend to the backend.
                // so at the endpoint api/user/login request send with this data...
                credentials: "include", // Include credentials (e.g., cookies) in the request
            }),
        }),
        // Define the register mutation endpoint
        register: builder.mutation({
            // Configure the query for the register endpoint and Queries are used to fetch data from the server, such as fetching a user's profile information, 
            // fetching a list of items, or retrieving specific data based on criteria.
            query: (data) => ({
                url: `${AUTH_URL}/register`, // Set the URL for the register endpoint
                method: "POST", // Use POST method for registration
                body: data, // Include the data (e.g., user details) in the request body
                credentials: "include", // Include credentials (e.g., cookies) in the request
            }),
        }),
        // Define the logout mutation endpoint
        logout: builder.mutation({
            // Configure the query for the logout endpoint
            query: (data) => ({
                url: `${AUTH_URL}/logout`, // Set the URL for the logout endpoint
                method: "POST", // Use POST method for logout
                body: data, // Include the data (if any) in the request body
                credentials: "include", // Include credentials (e.g., cookies) in the request
            }),
        }),
    }),
});

// Export hooks for using the login, register, and logout mutations in components
export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApiSlice;
