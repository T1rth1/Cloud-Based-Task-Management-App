import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protectRoute = async (req,res,next) => {
    try {
        let token = req.cookies?.token;
        // we take the token from the browser cookie section...
        if(token){
            const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
            // verify the decoded token with the actual undecoded token which is there in the env file..

            const resp = await User.findById(decodedToken.userId).select("isAdmin email");
            //  and we find the user after decoded the token by it's id which is we pass to the token when we created the token and store as a cookie..
            // and select the particular field "isAdmin" and "email" of the user

            req.user = {
                email:resp.email,
                isAdmin:resp.isAdmin,
                userId:decodedToken.userId,
            }; // now update the user's data which is requested with email and isAdmin and userId field..
            next(); // go to the next() middlware which is coming next to this
        }else{
            return res.status(401).json({status:false,message:"Not authorized. Try login again."})
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({status:false,message:"Not authorized. Try login again."});
        
    }
};

const isAdminRoute = (req,res,next) => {

    // which user requested the some data that user is admin or not we checked by req.user.isAdmin...
    if(req.user && req.user.isAdmin){
        next(); // if yes user is admin then go to the next middlware means whatever user trying to access that provide
    }else{
        return res.status(401).json({
            status:false,
            message:"Not authorized as admin. Try login as admin.",
        });
        // otherwise show the error message you are not authorized...
    }
}

export { isAdminRoute, protectRoute};