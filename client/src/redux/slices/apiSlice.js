// Import the createApi and fetchBaseQuery functions from @reduxjs/toolkit/query/react
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Retrieve the base URL for the API from environment variables
const API_URI = import.meta.env.VITE_APP_BASE_URL; // Server-side endpoint URL
// Example: "http://localhost:8800" so here our backend run at the 8800 so we make the request with this endpoints

// Define a base query using fetchBaseQuery with the API base URL
const baseQuery = fetchBaseQuery({ baseUrl: API_URI + "/api" }); // here we set the baseUrl as the API_URI + "/api"...which is for the backend endpoints

// Create an API slice using createApi. This API slice will handle API requests and caching.
export const apiSlice = createApi({
    baseQuery, // Set the base query for API requests
    tagTypes: [], // Define any tag types for cache invalidation (currently empty)
    endpoints: (builder) => ({}), // Define the API endpoints..here we pass the endpoints in which we make the requests so for this we create separeate api folder in which we simple
    // define the endpoints
});
