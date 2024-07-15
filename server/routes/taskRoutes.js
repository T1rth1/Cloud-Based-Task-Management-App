import express from "express";
import { isAdminRoute, protectRoute } from "../middlewares/authMiddleware.js";
import { 
    createSubTask, 
    createTask, 
    dashboardStatistics,
    deleteRestoreTask, 
    duplicateTask, 
    getTask, 
    getTasks, 
    postTaskActivity, 
    trashTask, 
    updateTask 
} from "../controllers/taskController.js";


const router = express.Router();

router.post("/create", protectRoute, isAdminRoute, createTask); // in frontend side when we make the api request on this api/task/create route then it is render this createTask function or middleware which is created for doing the specific task...
router.post("/duplicate/:id", protectRoute, isAdminRoute, duplicateTask);
// this is for the /duplicate/:id..means dynamic id..so when we make the api request from the client side then we should pass this id as a dynamic...
// and we use this id here to do the some operation in the duplicateTask function
router.post("/activity/:id", protectRoute, postTaskActivity);

router.get("/dashboard", protectRoute, dashboardStatistics);
router.get("/", protectRoute, getTasks);
router.get("/:id", protectRoute, getTask);

router.put("/create-subtask/:id", protectRoute, isAdminRoute, createSubTask);
router.put("/update/:id", protectRoute, isAdminRoute, updateTask);
router.put("/:id", protectRoute, isAdminRoute, trashTask);

router.delete("/delete-restore/:id?",protectRoute,isAdminRoute,deleteRestoreTask);

// here we make the every route as a protect route means user must need to be authenticated or verified...if he/she real or not
// and we pass the isAdminRoute middlware at some routes on which some admin activity would be performed...
//  this all routes export as a router and make use of them in the index.js file...to understand the logic of these all functions go to the controller folder
export default router;
