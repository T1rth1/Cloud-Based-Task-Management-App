import { response } from "express";
import User from "../models/user.js";
import Notice from "../models/notification.js"
import { createJWT } from "../utils/index.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, isAdmin, role, title } = req.body; // Destructuring the request body to get user details..this request coming from the frontend side

        const userExist = await User.findOne({ email }); // Checking if a user with the given email already exists
        const userExistByName = await User.findOne({ name }); // Checking if a user with the given name already exists

        if (userExist || userExistByName) {
            return res.status(400).json({
                status: false,
                message: "User already exists", // Sending a response if the user already exists
            });
        }
        
        const user = await User.create({ name, email, password, isAdmin, role, title }); // Creating a new user in the data base using the User model

        if (user) {
            isAdmin ? createJWT(res, user._id) : null; // Creating a JWT for the user if they are an admin..because admin can only register
            // so we check here if user is admin then create token and send back to the user as a response

            user.password = undefined; // Removing the password from the user object before sending the response
            res.status(201).json(user); // Sending the created user as a response
        } else {
            return res.status(400).json({ status: false, message: "Invalid user data" }); // Sending a response if user creation failed
        }
    } catch (error) {
        console.log(error); // Logging the error
        return res.status(400).json({ status: false, message: error.message }); // Sending a response if an error occurred
    }
};


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body; // Destructuring the request body to get email and password..request coming from the frontend side and we here deprop the element comes with the request..
        const user = await User.findOne({ email }); // Finding a user with the given email

        if (!user) {
            return res.status(401).json({ status: false, message: "Invalid email or password." }); // Sending a response if the user is not found
        }

        if (!user?.isActive) {
            return res.status(400).json({ status: false, message: "User account has been deactivated, contact the administrator!" }); // Sending a response if the user's account is deactivated
        }

        const isMatch = await user.matchPassword(password); // Checking if the provided password from the frontend as a request matches the stored password

        if (user && isMatch) {
            createJWT(res, user._id); // Creating a JWT for the user if authentication(password matches) is successful
            user.password = undefined; // Removing the password from the user object before sending the response to the frontend..
            res.status(200).json(user); // Sending the authenticated user as a response
        } else {
            return res.status(401).json({ status: false, message: "Invalid email or password." }); // Sending a response if authentication fails
        }
    } catch (error) {
        console.log(error); // Logging the error
        return res.status(400).json({ status: false, message: error.message }); // Sending a response if an error occurred
    }
};

export const logoutUser = async (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(0), // Setting the cookie to expire immediately, effectively logging the user out..Date(0) means right now right this time this cookie expired so user logout imediately
        });
        res.status(200).json({ message: "Logout successful" }); // Sending a response indicating logout was successful
    } catch (error) {
        console.log(error); // Logging the error
        return res.status(400).json({ status: false, message: error.message }); // Sending a response if an error occurred
    }
};

export const getTeamList = async (req, res) => {
    // this function for the get the all users awailable in the data base
    try {
        const users = await User.find().select("name title role email isActive"); // Retrieving the list of users with selected fields
        // find all "users" because we dont specify any condition in the find() function and select the appropiate the field using the select function

        res.status(200).json(users); // Sending the list of users as a response
    } catch (error) {
        console.log(error); // Logging the error
        return res.status(400).json({ status: false, message: error.message }); // Sending a response if an error occurred
    }
};

export const getNotificationsList = async (req, res) => {
    try {
        const { userId } = req.user; // Destructuring to get the userId from the request JSON object

        const notice = await Notice.find({
            team: userId,
            isRead: { $nin: [userId] }, // Finding notifications that the current user is not in the isRead array and current user in the team array 
            // this type of document it is find in the data base...

        }).populate("task", "title"); // Populating the 'task' field with the 'title' from the related document which is the Task model it's self
        // means populate is used for to retrive the particular data from related document and replace it with that field of the Notice model which 
        // refer this document "task" or task model

        res.status(201).json(notice); // Sending the list of notifications as a response..which we find for the current log-in user...
    } catch (error) {
        console.log(error); // Logging the error
        return res.status(400).json({ status: false, message: error.message }); // Sending a response if an error occurred
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const { userId, isAdmin } = req.user; // Destructuring to get userId and isAdmin from the request object
        const { _id, name, email } = req.body; // Destructuring to get _id, name, and email from the request body...request body means from the frontend side
        // we send the data to the backend with the api request here it is destructured as the req.body

        console.log(name, email); // Logging the name and email
        const id = isAdmin && userId === _id ? userId : isAdmin && userId !== _id ? _id : userId; // Determining the user ID to be updated
        // isAdmin: This checks if the logged-in user has admin privileges.
        // userId === _id: This checks if the logged-in user is updating their own profile.
        // If both conditions are true, it sets id to userId, meaning the admin is updating their own profile.
        // isAdmin: This checks if the logged-in user has admin privileges.
        // userId !== _id: This checks if the logged-in user is updating someone else's profile.
        // If both conditions are true, it sets id to _id, meaning the admin is updating another user's profile.
        // If neither of the above conditions are true, it sets id to userId, meaning the user can only update their own profile if they are not an admin.

        const user = await User.findById(id); // Finding the user by ID

        if (user) {
            user.title = req.body.title || user.title; // Updating the title if provided
            user.role = req.body.role || user.role; // Updating the role if provided

            const userExist = await User.findOne({ email }).find({ _id: { $ne: id } }); // Checking if another user with the same email exists
            const userExist2 = await User.findOne({ name }).find({ _id: { $ne: id } }); // Checking if another user with the same name exists

            if (userExist.length > 0 || userExist2.length > 0) {
                return res.status(400).json({
                    status: false,
                    message: "User already exists", // Sending a response if a user with the same email or name already exists
                });
            } else {
                user.name = name; // Updating the name
                user.email = email; // Updating the email
            }

            const updatedUser = await user.save(); // Saving the updated user
            user.password = undefined; // Removing the password from the user object before sending the response to the frontend

            res.status(201).json({
                status: true,
                message: "Profile Updated Successfully.",
                user: updatedUser, // Sending the updated user as a response
            });
        } else {
            return res.status(400).json({ status: false, message: "User not found" }); // Sending a response if the user is not found
        }
    } catch (error) {
        console.log(error); // Logging the error
        return res.status(400).json({ status: false, message: error.message }); // Sending a response if an error occurred
    }
};

export const markNotificationRead = async (req, res) => {
    try {
        const { userId } = req.user; // Get the user ID from the request's user object

        const { isReadType, id } = req.query; // Get the isReadType and id from the request's query parameters..this query parametres passed
        // with the url when frontend make the api call to the backend's any url so this query object is attached with that url..
        // user?isReadType=false..like wise

        if (isReadType === "all") { // If isReadType is "all"
            await Notice.updateMany(
                // this is find all the notification document in the data base and update them all by pushing the current userId into the isRead array of the notification documents
                { team: userId, isRead: { $nin: [userId] } }, // Find notifications for the user's team that are unread
                { $push: { isRead: userId } }, // Push the user's ID to the isRead array for those notifications
                { new: true } // Return the updated documents
            );
        } else { // If isReadType is not "all"
            await Notice.findOneAndUpdate(
                // this is find the particular notification by id and in that notification document push the current userId into the isRead array..
                { _id: id, isRead: { $nin: [userId] } }, // Find the specific notification by ID that is unread
                { $push: { isRead: userId } }, // Push the user's ID to the isRead array for that notification
                { new: true } // Return the updated document means it is update the document in the data base
            );
        }

        res.status(201).json({ status: true, message: "Done" }); // Send a success response
    } catch (error) {
        console.log(error); // Log any errors
        return res.status(400).json({ status: false, message: error.message }); // Send an error response
    }
};

export const changeUserPassword = async (req, res) => {
    try {
        const { userId } = req.user; // Get the user ID from the request's user object

        const user = await User.findById(userId); // Find the user by ID

        if (user) { // If the user exists
            user.password = req.body.password; // Update the user's password with the new password from the request body

            await user.save(); // Save the updated user

            user.password = undefined; // Remove the password from the user object before sending the response..remove this password
            // after saving the user into the database with it's new password...

            res.status(201).json({ status: false, message: "Password changed successfully." }); // Send a success response
        } else {
            res.status(404).json({ status: false, message: "User not found" }); // Send a user not found response
        }
    } catch (error) {
        console.log(error); // Log any errors
        return res.status(400).json({ status: false, message: error.message }); // Send an error response
    }
};

export const activateUserProfile = async (req, res) => {
    try {
        const { id } = req.params; // Get the user ID from the request's URL parameters...means at the frontend side when we make the 
        // request on the specific URL then with this URL params is passed with denote with the (:) colon..
        // ex. For example, in a route like /users/:userId, req.params.userId would give you the value of userId from the URL.

        const user = await User.findById(id); // Find the user by ID

        if (user) { // If the user exists
            user.isActive = req.body.isActive; // Update the user's isActive status with the value from the request body

            await user.save(); // Save the updated user

            res.status(201).json({
                status: true,
                message: `User account has been ${user?.isActive ? "activated" : "disabled"}`, // Send a success response with a message based on isActive status
            });
        } else {
            return res.status(400).json({ status: false, message: "User not found" }); // Send a user not found response
        }
    } catch (error) {
        console.log(error); // Log any errors
        return res.status(400).json({ status: false, message: error.message }); // Send an error response
    }
};

export const deleteUserProfile = async (req, res) => {
    try {
        const { id } = req.params; // Get the user ID from the request's URL parameters...like above req.params we take the id
        // and on this URL request made by the frontend side..

        await User.findByIdAndDelete(id); // Find and delete the user by ID

        res.status(200).json({ status: true, message: "User deleted successfully." }); // Send a success response
    } catch (error) {
        console.log(error); // Log any errors
        return res.status(400).json({ status: false, message: error.message }); // Send an error response
    }
};
