import Notice from "../models/notification.js";
import Task from "../models/task.js";
import User from "../models/user.js";

// Controller function to create a new task
export const createTask = async (req, res) => {
    try {
        const { userId } = req.user; // Extracting user ID from request
        
        // Extracting task details from request body
        const { title, team, stage, date, priority, assets } = req.body;
        
        // Creating a notification message based on task details
        let text = "New task has been assigned to you";
        if (team?.length > 1) {
            text = text + ` and ${team.length - 1} others.`;
        }
        text = text + ` The task priority is set a ${priority} priority, so check and act accordingly. The task date is ${new Date(date).toDateString()}. Thank you!!!`;
        
        // Creating an activity object for the task and it is type = assigned and activity text set to above created "text"..and by:current user id which create a task and sure it is admin
        const activity = {
            type: "assigned",
            activity: text,
            by: userId,
        };
        
        // Creating the task in the database
        const task = await Task.create({
            title,
            team,
            stage: stage.toLowerCase(), // set to lowercase
            date,
            priority: priority.toLowerCase(), // set to lowercase
            assets,
            activities: activity,
        });
        
        // Creating a notification for the task
        await Notice.create({
            team,
            text,
            task: task._id,
        }); // creating the notice for the this task and passed the team  which is there in this particular task and so this all people which is there in the team
        // notification is goes..and also pass the task.id to the notification document in the database
        
        // Sending success response with created task
        res.status(200).json({ status: true, task, message: "Task created successfully." });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};

// Controller function to duplicate a task
export const duplicateTask = async (req, res) => {
    try {
        const { id } = req.params; // Extracting task ID from request params
        
        // Finding the task to be duplicated
        const task = await Task.findById(id);
        
        // Creating a new task based on the existing task
        const newTask = await Task.create({
            ...task,// spread the existing task
            title: task.title + " - Duplicate", // title should be like this same title with attached "- duplicate" text..
        });
        
        // Copying over additional task details
        newTask.team = task.team;
        newTask.subTasks = task.subTasks;
        newTask.assets = task.assets;
        newTask.priority = task.priority;
        newTask.stage = task.stage;
        
        await newTask.save(); // Saving the new task into the database
        
        // Creating a notification for the duplicated task same process as the above for the create task
        let text = "New task has been assigned to you";
        if (task.team.length > 1) {
            text = text + ` and ${task.team.length - 1} others.`;
        }
        text = text + ` The task priority is set a ${task.priority} priority, so check and act accordingly. The task date is ${task.date.toDateString()}. Thank you!!!`;
        
        await Notice.create({
            team: task.team,
            text,
            task: newTask._id,
        });
        
        res.status(200).json({ status: true, message: "Task duplicated successfully." });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};

// Controller function to post activity related to a task
export const postTaskActivity = async (req, res) => {
    try {
        const { id } = req.params; // Extracting task ID from request params
        const { userId } = req.user; // Extracting user ID from request
        const { type, activity } = req.body; // Extracting activity details from request body
        
        // Finding the task to post activity to
        const task = await Task.findById(id);
        
        // Creating activity data
        const data = {
            type,
            activity,
            by: userId,
        };
        
        // Adding activity to the task
        task.activities.push(data); // push the data into the task document's activities array so new activity come then it is pushed to the current task's activities array
        
        await task.save(); // Saving the updated task into the data base
        
        res.status(200).json({ status: true, message: "Activity posted successfully." });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};

// Controller function to fetch dashboard statistics
export const dashboardStatistics = async (req, res) => {
    try {
        const { userId, isAdmin } = req.user; // Extracting user details from request
        
        // Check if the user is an admin
        const allTasks = isAdmin 
        // If the user is an admin, find all tasks that are not trashed
        ? await Task.find({ isTrashed: false })
            // Populate the 'team' field with 'name', 'role', 'title', and 'email' fields from the User model
            .populate({
                path: "team",
                select: "name role title email",
            })
            // Sort the tasks by the '_id' field in descending order
            .sort({ _id: -1 })
        // If the user is not an admin, find tasks that are not trashed and which has the current user into the team field
        : await Task.find({
            isTrashed: false,
            team: { $all: [userId] },
        })
        // Populate the 'team' field with 'name', 'role', 'title', and 'email' fields from the User model
        .populate({
            path: "team",
            select: "name role title email",
        })
        // Sort the tasks by the '_id' field in descending order
        .sort({ _id: -1 });

        
        // Fetching active users and select the name title role etc... fields
        const users = await User.find({ isActive: true })
            .select("name title role isAdmin createdAt isActive")
            .limit(10)
            .sort({ _id: -1 }); // descending order sort the users
        
        // The purpose of groupTasks is to categorize tasks by their stage and count how many tasks exist in each stage.
        const groupTasks = allTasks.reduce((result, task) => {
            const stage = task.stage; // Get the stage of the current task
            if (!result[stage]) {
                result[stage] = 1; // If the stage is not yet in the result, initialize it with 1
            } else {
                result[stage] += 1; // If the stage is already in the result, increment the count by 1
            }
            return result; // Return the updated result object
        }, {}); // Initialize result as an empty object
        // groupTask will be like below...
        // {
        //     "in-progress": 2,
        //     "completed": 1,
        //     "not-started": 1
        // }
        

        // The purpose of groupData is to categorize tasks by their priority and count how many tasks exist for each priority level
        const groupData = Object.entries(
            allTasks.reduce((result, task) => {
                const { priority } = task; // Get the priority of the current task
                result[priority] = (result[priority] || 0) + 1; // Increment the count for the priority
                return result; // Return the updated result object
            }, {}) // Initialize result as an empty object
        ).map(([name, total]) => ({ name, total })); // Convert the result object into an array of objects with 'name' and 'total' properties
        // groupData will be like below...
        // [
        //     { name: "high", total: 2 },
        //     { name: "medium", total: 1 },
        //     { name: "low", total: 1 }
        // ]
        
        // Calculating total tasks and preparing summary data
        const totalTasks = allTasks?.length; // Get the total number of tasks
        const last10Task = allTasks?.slice(0, 10); // Get the last 10 tasks
        const summary = {
            totalTasks, // Total number of tasks
            last10Task, // Last 10 tasks
            users: isAdmin ? users : [], // List of users if the current user is an admin, otherwise an empty array
            tasks: groupTasks, // Tasks grouped by stage
            graphData: groupData, // Tasks grouped by priority
        };

        res.status(200).json({ status: true, message: "Successfully", ...summary });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};

// Controller function to fetch tasks based on filters
export const getTasks = async (req, res) => {
    try {
        const { stage, isTrashed,search } = req.query; // Extracting query parameters
        console.log(search);
        // Setting up query based on filters
        let query = { isTrashed: isTrashed ? true : false }; // so if the isTrashed = true then it find the task which has the isTrashed=true and
        // if the isTrashed=false then it find the task which has the isTrashed=false so it work for both depending upon which we pass the isTrashed=true or false from the frontend
        if (stage) {
            query.stage = stage;
        }
        if(search){
            // If search is provided in addition to the above, the query object will search for tasks with the specified isTrashed value,
            //  with a specific stage, and matching the search term in the task's title field.
             // Check if the query already has a $or key
            if (!query.$or) {
                // we check if the query has the $or =[]  key exist or not if not then create one $or key for the query object
                query.$or = [];
            }
            // Add the new search query to the existing $or array..this $or array is there to the existing query object now query object look like below
            // query = {
            //     isTrashed:false,
            //     stage:stage,
            //     $or:[{ title: { $regex: search, $options: 'i' } }]
            // } // query object look like this with three conditions with it...
            query.$or.push({ title: { $regex: search, $options: 'i' } });
            // { title: { $regex: req.query.search, $options: 'i' } }: This sets up a regex search on the task's title field, 
            //         // looking for a match with the search term provided in req.query.search case-insensitively ($options: 'i').
            
            // regex search means if req.query.search is "example", the regex search will look for any titles containing "example" in a case-insensitive manner. 
            // It will match titles like "Example Title", "example-123", "This is an Example", and so on.
        }
        
        // Query the Task collection using the specified query conditions that conditions we already defined above as a query object and passed here to search the particular task...
        let queryResult = Task.find(query)
        // Populate the 'team' field in the Task documents with the referenced User documents
        .populate({
            // Specify the path to the 'team' field which contains references to User documents
            path: "team",
            // Select only the 'name', 'title', and 'email' fields from the referenced User documents
            select: "name title email",
        })
        // Sort the resulting Task documents in descending order based on their '_id' field (most recent first)
        .sort({ _id: -1 });

        const tasks = await queryResult; // Await the query result to get the tasks

        res.status(200).json({ status: true, tasks }); // Send the tasks in the response
    } catch (error) {
        console.log(error); // Log the error for debugging
        return res.status(400).json({ status: false, message: error.message }); // Send error response
    }
};

// Controller function to get a single task by ID
export const getTask = async (req, res) => {
    try {
        const { id } = req.params; // Extracting task ID from request params
        // console.log("id", id); // Log the task ID for debugging
        // Find a Task document by its ID and populate related fields
        const task = await Task.findById(id) // Find the Task document with the given 'id'
        .populate({
            // Populate the 'team' field with referenced User documents
            path: "team",
            // Select only the 'name', 'title', 'role', and 'email' fields from the referenced User documents
            select: "name title role email",
        })
        .populate({
            // Populate the 'activities.by' field with referenced User documents
            path: "activities.by",
            // Select only the 'name' field from the referenced User documents in 'activities.by'
            select: "name",
        }); // Find the task by ID and populate team and activities details
        res.status(200).json({
            status: true,
            task,
        }); // Send the task in the response
    } catch (error) {
        console.log(error); // Log the error for debugging
        return res.status(400).json({ status: false, message: error.message }); // Send error response
    }
}

// Controller function to create a sub-task
export const createSubTask = async (req, res) => {
    try {
        const { title, tag, date } = req.body; // Extracting sub-task details from request body
        const { id } = req.params; // Extracting task ID from request params
        // console.log("req.params", req.params); // Log the params for debugging

        // Creating a new sub-task object
        const newSubTask = {
            title,
            date,
            tag,
        };

        const task = await Task.findById(id); // Find the parent task by ID

        task.subTasks.push(newSubTask); // Add the new sub-task to the parent task

        await task.save(); // Save the updated task
        res.status(200).json({
            status: true,
            message: "SubTask added successfully.",
        }); // Send success response
    } catch (error) {
        console.log(error); // Log the error for debugging
        return res.status(400).json({ status: false, message: error.message }); // Send error response
    }
};

// Controller function to update a task
export const updateTask = async (req, res) => {
    try {
        const { id } = req.params; // Extracting task ID from request params
        const { title, date, team, stage, priority, assets } = req.body; // Extracting task details from request body

        const task = await Task.findById(id); // Find the task by ID
        const oldTeam = task.team; // Store the old team members

        // Update task details
        task.title = title;
        task.date = date;
        task.priority = priority.toLowerCase();
        task.assets = assets;
        task.stage = stage.toLowerCase();
        task.team = team;

        await task.save(); // Save the updated task

        // Identify newly added team members
        const newTeam = team.filter(member => !oldTeam.includes(member));
        // we take the newTeam members and generate the notification for the newly added team members only

        if (task.team.length > 0) {
            // Create a notification message
            let text = "New task has been assigned to you";
            if (task.team.length > 1) {
                text = text + ` and ${task.team.length - 1} others.`;
            }
            text = text + ` The task priority is set at ${task.priority} priority, so check and act accordingly. The task date is ${task.date.toDateString()}. Thank you!!!`;

            // Check if a notice for the task already exists
            const notice = await Notice.findOne({ task: task._id });

            if (notice) {
                // Update the existing notice and spread the team which is there in the notice with the newly added team members
                notice.team = [...new Set([...notice.team, ...newTeam])]; // Add new team members to existing ones, avoiding duplicates
                notice.text = text;
                await notice.save(); // Save the updated notice
            } else {
                // Create a new notice if it doesn't exist then create a new Notice document which is generate the notification
                // for the newly added users only not for users which already there in the team in this task
                await Notice.create({
                    team: newTeam,
                    text,
                    task: task._id,
                });
            }
        }

        res.status(200).json({ status: true, message: "Task updated successfully" }); // Send success response
    } catch (error) {
        console.log(error); // Log the error for debugging
        return res.status(400).json({ status: false, message: error.message }); // Send error response
    }
};

// Controller function to trash a task
export const trashTask = async (req, res) => {
    try {
        const { id } = req.params; // Extracting task ID from request params

        const task = await Task.findById(id); // Find the task by ID

        task.isTrashed = true; // Mark the task as trashed
        // when user click on the delete button on the tasks tab then we dont delete that task from the database..
        // we simply make the request on this function which simply make the field isTrashed as a true..and we fetched the task which has the
        // isTrashed=false so it look like this particular task is deleted but it is still there in the data base for the restore functionality

        await task.save(); // Save the updated task

        res.status(200).json({
            status: true,
            message: `Task trashed successfully.`,
        }); // Send success response
    } catch (error) {
        console.log(error); // Log the error for debugging
        return res.status(400).json({ status: false, message: error.message }); // Send error response
    }
};

// Controller function to delete or restore tasks based on action type
export const deleteRestoreTask = async (req, res) => {
    try {
        const { id } = req.params; // Extracting task ID from request params
        const { actionType } = req.query; // Extracting action type from query params

        if (actionType === "delete") {
            await Task.findByIdAndDelete(id); // Delete a specific task by ID
        } else if (actionType === "deleteAll") {
            await Task.deleteMany({ isTrashed: true }); // Delete all trashed tasks
            // find all task which has the field isTrashed=true and delete them all
        } else if (actionType === "restore") {
            const resp = await Task.findById(id); // Find the task by ID
            resp.isTrashed = false; // Mark the task as not trashed..so this task is shown at the tasks tab because we fethc the all tasks which has the isTrashed=false
            await resp.save(); // Save the updated task
        } else if (actionType === "restoreAll") {
            await Task.updateMany(
                { isTrashed: true },
                { $set: { isTrashed: false } }
                // this means is find the all task which has the isTrashed=true and for all those task update set the isTrashed=false so this all task can show up on the tasks tab../
            ); // Restore all trashed tasks
            console.log("restoreAll"); // Log the action for debugging
        }

        res.status(200).json({ status: true, message: 'Operation performed successfully.' }); // Send success response
    } catch (error) {
        console.log(error); // Log the error for debugging
        return res.status(400).json({ status: false, message: error.message }); // Send error response
    }
};
