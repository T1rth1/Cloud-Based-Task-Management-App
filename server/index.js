import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import  { dbConnection } from "./utils/index.js";
import { errorHandler, routeNotFound } from "./middlewares/errorMiddlewares.js";
import routes from "./routes/index.js"
dotenv.config();

dbConnection();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(
    cors({
        origin:["http://localhost:5173","http://localhost:3000","https://taassklyy.netlify.app"],
        methods: ["GET", "POST", "DELETE", "PUT"],
        credentials:true,
    }),
); // this is for handle the get,post,delete and put request from localhost:3000 or localhost:5173 on which our frontend run

app.use(express.json());
//This middleware function is used to parse incoming JSON payloads. 
// It allows your Express application to handle requests with Content-Type set to application/json. 
// Without this, your app wouldn't be able to understand JSON payloads in the body of incoming requests.
app.use(express.urlencoded({extended : true})) // This middleware function is used to parse incoming URL-encoded payloads (form submissions). The extended: true option allows for rich objects and arrays to be encoded into the URL-encoded format
app.use(cookieParser()) // This middleware function is used to parse cookies attached to the client request object. It makes the cookies accessible via req.cookies
app.use(morgan("dev")) // morgan is a logging middleware for Node.js. The "dev" option specifies the format of the logs,
//  which provides concise output colored by response status for development use. 
// It logs HTTP requests to the console, helping with debugging and monitoring.
app.use("/api",routes); // now we specify the base route /api on which we render the routes coming from the routes/index.js

app.use(routeNotFound);
app.use(errorHandler); // this is created by me these two function as the errorMiddleware

app.listen(PORT, () => console.log(`Server listning on ${PORT}`));
