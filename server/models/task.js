import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
    {
        title:{type:String,required:true},
        date:{type:Date,default: new Date()},
        priority : {
            type:String,
            default:"normal",
            enum:["high","medium","normal","low"],
        },
        stage : {
            type:String,
            default:"todo",
            enum:["todo","in-progress","completed"], // this means in these 3 option there should be not any other field should be there as a stage
        },
        activities:[
            {
                type:{
                    type:String,
                    default:"assigned",
                    enum:[
                        "assigned",
                        "started",
                        "in progress",
                        "bug",
                        "completed",
                        "commented",
                    ], // same for the activities should from among these enum array if there are other then this then it show error and default activity is assigned
                },
                activity:String,
                date:{type:Date,default: new Date()}, // if date is not providede then it take the today's date by creating the new data by using this new Date() function...
                by:{type:Schema.Types.ObjectId,ref:"User"},
            },
        ],
        subTasks:[
            {
                title:String,
                date:Date,
                tag:String,
            },
        ],
        assets:[String],
        team:[
            {
                type:Schema.Types.ObjectId,
                ref:"User"
            }
        ],
        isTrashed:
        {
            type:Boolean,
            default:false
        },
    },
    {
        timestamps:true
    },
);

const Task = mongoose.model("Task",taskSchema);
 export default Task;