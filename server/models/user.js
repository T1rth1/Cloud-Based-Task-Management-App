import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        name:{type:String,required:true},
        title:{type:String,required:true},
        role:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        password:{type:String,required:true},
        isAdmin : {type: Boolean,required:true,default:false}, // if we not provide this field in the time of creation of the user document then by default this field remain false...this field is still remain 
        // in that user schema even if we not provided when we create this user document/schema
        tasks:[
            {
                type:Schema.Types.ObjectId,
                ref:"Task",
            }
        ], // this is the tasks array which is refer to the "Task" model...for that this type of initialization is needed..array of Task model or Tasks
        isActive:{type:Boolean,required:true,default:true},
    },
    {
        timestamps:true // means it is automatically create the date based on when task is created and when it is updated
    }
);

userSchema.pre("save", async function (next){
    // this means before the saving the user document it (!this.isModified("password")) checks if the password field is modified. If not, it skips the hashing process and calls next() to proceed.
    if(!this.isModified("password")){
        next();
    }
    try{
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    // const salt = await bcrypt.genSalt(10) generates a salt with 10 rounds, 
    // and this.password = await bcrypt.hash(this.password, salt) hashes the password with the generated salt.
    next();
    }catch(err){
        next(err);
    }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
    // (matchPassword Method) This method takes the entered password as an argument and uses bcrypt.compare to compare it with the hashed password stored in the database. 
    // It returns a boolean indicating whether the passwords match.
};
const User = mongoose.model("User", userSchema); // now create the User document in the data base by using this created userSchema....

export default User;