import mongoose from "mongoose";
import jwt from "jsonwebtoken";

export const dbConnection = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("DB connection established");
    }catch(error){
        console.log("DB Error: " + error);
    }
}; // this function for the data base connection and we use it in the index.js file

// this below need to be understand
export const createJWT = (res,userId) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"1d",
    });
    // jwt.sign() is a function from the jsonwebtoken library used to create a JSON Web Token (JWT).
    // { userId } is the payload of the token, which includes the user's ID.
    // The payload is the object { userId }. This payload is encoded within the JWT and 
    // can later be decoded and verified by the server to retrieve the user's ID and any other relevant information.
    // change same site from strict to none when you deploy your app

    res.cookie("token",token,{ // it is set the cookie by above created token with the name of the "token"
        httpOnly:true,
        secure:true, // secure:true when we at "production" phase 
        // secure:process.env.NODE_ENV !== "development",
        sameSite:"none", // prevent CSRF attack
        // prevents the browser from sending the cookie along with cross-site requests, which helps prevent cross-site request forgery (CSRF) attacks.
        //  (Note: The comment suggests changing this to "none" when deploying the app, likely because of specific requirements for cross-origin requests.)
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
    })
}
