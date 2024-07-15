import { apiSlice } from "../slices/apiSlice"; // Import the apiSlice from the specified location

const USER_URL = "/user"; // Define the base URL for user-related endpoints

export const userApiSlice = apiSlice.injectEndpoints({ // Define API endpoints using Redux Toolkit's apiSlice.injectEndpoints method
    endpoints: (builder) => ({ // Define the endpoints object using the builder parameter
        updateUser: builder.mutation({ // Define an endpoint for updating user profile information
            query: (data) => ({ // Define the query function for the updateUser endpoint
                url: `${USER_URL}/profile`, // Set the URL for the updateUser endpoint
                method: "PUT", // Set the HTTP method as PUT for updating data so that's why here we use the builder.mutation instead of builder.query
                body: data, // Pass the data in the request body for updating the profile
                credentials: "include", // Include credentials in the request for authentication
            }),
        }),

        getTeamList: builder.query({ // Define an endpoint for fetching the team list
            query: () => ({ // Define the query function for the getTeamList endpoint
                url: `${USER_URL}/get-team`, // Set the URL for fetching the team list
                method: "GET", // Set the HTTP method as GET for fetching data
                credentials: "include", // Include credentials in the request for authentication
            }),
        }),

        deleteUser: builder.mutation({ // Define an endpoint for deleting a user
            query: (id) => ({ // Define the query function for the deleteUser endpoint
                url: `${USER_URL}/${id}`, // Set the URL for the deleteUser endpoint with the user ID to be deleted
                method: "DELETE", // Set the HTTP method as DELETE for deleting data
                credentials: "include", // Include credentials in the request for authentication
            }),
        }),

        userAction: builder.mutation({ // Define an endpoint for generic user actions
            query: (data) => ({ // Define the query function for the userAction endpoint
                url: `${USER_URL}/${data.id}`, // Set the URL for the userAction endpoint with the user ID to perform actions on
                method: "PUT", // Set the HTTP method as PUT for performing actions
                body: data, // Pass the data in the request body for performing user actions
                credentials: "include", // Include credentials in the request for authentication
            }),
        }),

        getNotifications: builder.query({ // Define an endpoint for fetching notifications
            query: () => ({ // Define the query function for the getNotifications endpoint
                url: `${USER_URL}/notifications`, // Set the URL for fetching notifications
                method: "GET", // Set the HTTP method as GET for fetching data
                credentials: "include", // Include credentials in the request for authentication
            }),
        }),

        markNotiAsRead: builder.mutation({ // Define an endpoint for marking notifications as read
            query: (data) => ({ // Define the query function for the markNotiAsRead endpoint
                url: `${USER_URL}/read-noti?isReadType=${data.type}&id=${data?.id}`, // Set the URL for marking notifications as read with query parameters
                method: "PUT", // Set the HTTP method as PUT for marking notifications
                body: data, // Pass the data in the request body for marking notifications as read
                credentials: "include", // Include credentials in the request for authentication
            }),
        }),

        changePassword: builder.mutation({ // Define an endpoint for changing user password
            query: (data) => ({ // Define the query function for the changePassword endpoint
                url: `${USER_URL}/change-password`, // Set the URL for changing user password
                method: "PUT", // Set the HTTP method as PUT for changing password
                body: data, // Pass the data in the request body for changing password
                credentials: "include", // Include credentials in the request for authentication
            }),
        }),
    }),
});

export const { // Destructure hooks for each API endpoint defined above for use in components
    useGetTeamListQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useUserActionMutation,
    useGetNotificationsQuery,
    useMarkNotiAsReadMutation,
    useChangePasswordMutation,
} = userApiSlice;
