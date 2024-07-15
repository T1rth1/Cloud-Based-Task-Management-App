import express from "express";
import userRoutes from "./userRoutes.js";
import taskRoutes from "./taskRoutes.js";



const router = express.Router();

router.use("/user",userRoutes); // => /api/user/login
router.use("/task",taskRoutes); // => /api/user/taskRoutes

// here we create a two router with it's different route coming from the userRoutes and taskRoutes

export default router;