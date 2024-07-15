import { trashTask } from "../../../../server/controllers/taskController"; // Import the trashTask function from the taskController
import { apiSlice } from "../slices/apiSlice"; // Import the base API slice

const TASK_URL = "/task"; // Define the base URL for task-related endpoints..api/task/something

// Inject task-related endpoints into the base API slice
export const taskApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Define the query for getting dashboard statistics
        getDashboardStats: builder.query({
            // builder.query => This is used to define endpoints for fetching data from the server, typically using HTTP GET requests.
            // builder.mutation => This is used to define endpoints for modifying data on the server, such as creating, updating, or deleting resources.
            query: () => ({
                url: `${TASK_URL}/dashboard`, // Set the URL for the dashboard stats endpoint
                method: "GET", // Use GET method to fetch data 
                credentials: "include", // Include credentials in the request
                // here we define the builder.query means we fethching the data from the backend so no need to pass the body:data here...
            }),
        }),

        // Define the query for getting all tasks with optional query parameters
        getAllTask: builder.query({
            query: ({ strQuery, isTrashed, search }) => ({
                url: `${TASK_URL}?stage=${strQuery}&isTrashed=${isTrashed}&search=${search}`, // Set the URL with query parameters
                // Query parameters are additional information you can pass in a URL to customize the request. In this case:
                // stage=${strQuery}: This parameter likely filters tasks based on their stage.
                // isTrashed=${isTrashed}: This parameter may indicate whether to include trashed tasks or not.
                // search=${search}: This parameter could be used for searching tasks based on a keyword or phrase.
                // so indirectly to get all  task it make the request on the `${TASK_URL}/` which is expected route from the backend...see the backed route path which is same as api/user/
                method: "GET", // Use GET method to fetch data
                credentials: "include", // Include credentials in the request
            }),
        }),

        // Define the mutation for creating a new task
        createTask: builder.mutation({
            query: (data) => ({
                url: `${TASK_URL}/create`, // Set the URL for creating a new task
                method: "POST", // Use POST method to send data
                body: data, // Include data in the request body
                credentials: "include", // Include credentials in the request
            }),
        }),

        // Define the mutation for duplicating a task
        duplicateTask: builder.mutation({
            query: (id) => ({
                url: `${TASK_URL}/duplicate/${id}`, // Set the URL for duplicating a task with ID
                method: "POST", // Use POST method for duplication
                // body: {}, // Uncomment and specify the body if needed
                credentials: "include", // Include credentials in the request
            }),
        }),

        // Define the mutation for updating a task
        updateTask: builder.mutation({
            query: (data) => ({
                url: `${TASK_URL}/update/${data._id}`, // Set the URL for updating a task with ID from data
                method: "PUT", // Use PUT method to update data
                body: data, // Include data in the request body
                credentials: "include", // Include credentials in the request
            }),
        }),

        // Define the mutation for trashing a task
        trashTask: builder.mutation({
            query: ({ id }) => ({
                url: `${TASK_URL}/${id}`, // Set the URL for trashing a task with ID
                method: "PUT", // Use PUT method for trashing
                credentials: "include", // Include credentials in the request
            }),
        }),

        // Define the mutation for creating a subtask
        createSubTask: builder.mutation({
            query: ({ data, id }) => ({
                url: `${TASK_URL}/create-subtask/${id}`, // Set the URL for creating a subtask with task ID
                method: "PUT", // Use PUT method to create a subtask
                body: data, // Include subtask data in the request body
                credentials: "include", // Include credentials in the request
            }),
        }),

        // Define the query for getting a single task by ID
        getSingleTask: builder.query({
            query: (id) => ({
                url: `${TASK_URL}/${id}`, // Set the URL for getting a task with ID
                method: "GET", // Use GET method to fetch data
                credentials: "include", // Include credentials in the request
            }),
        }),

        // Define the mutation for posting task activity
        postTaskActivity: builder.mutation({
            query: ({ data, id }) => ({
                url: `${TASK_URL}/activity/${id}`, // Set the URL for posting task activity with task ID
                method: "POST", // Use POST method to post activity
                body: data, // Include activity data in the request body
                credentials: "include", // Include credentials in the request
            }),
        }),

        // Define the mutation for deleting or restoring a task
        deleteRestoreTask: builder.mutation({
            query: ({ id, actionType }) => ({
                url: `${TASK_URL}/delete-restore/${id}?actionType=${actionType}`, // Set the URL for deleting or restoring a task with ID and action type
                method: "DELETE", // Use DELETE method for deletion or restoration
                credentials: "include", // Include credentials in the request
            }),
        }),
    }),
    // so this all are the endpoints on which we make the request like mutation and query to the backend and retrive the data based on the different requests
});

// Export hooks for using the defined API endpoints in components
export const { 
    useGetDashboardStatsQuery,
    useGetAllTaskQuery, 
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDuplicateTaskMutation,
    useTrashTaskMutation,
    useCreateSubTaskMutation,
    useGetSingleTaskQuery,
    usePostTaskActivityMutation,
    useDeleteRestoreTaskMutation 
} = taskApiSlice; // here we export the all endpoints function as the suggested by the javaScript....
