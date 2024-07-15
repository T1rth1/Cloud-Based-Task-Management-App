import React, { useEffect, useState } from 'react'
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {app} from "../../utils/firebase.js";
import ModalWrapper from '../ModalWrapper.jsx'
import { useForm } from 'react-hook-form';
import { Dialog } from '@headlessui/react';
import Textbox from '../Textbox.jsx';
import UserList from './UserList.jsx';
import SelectList from '../SelectList.jsx';
import Button from "../Button.jsx";
import { toast } from 'sonner'
import { BiImages } from 'react-icons/bi';
import { useCreateTaskMutation, useUpdateTaskMutation } from '../../redux/api/taskApiSlice.js';
// import { useParams } from 'react-router-dom';
import { dateFormatter } from '../../utils/index.js';
import Loader from '../Loader.jsx';
const LISTS=["TODO", "IN-PROGRESS", "COMPLETED"];
const PRIORITY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

const uploadedFileURLs = [];

const AddTask = ({ open, setOpen,task }) => {
    // const task = "";
    // console.log("vedo hao",task);
    // so when admin click on the create task then no task has been passed os it's default values should be empty by default that we create below..
    const toastStyle = {
        padding: '16px 24px',
        borderRadius: '8px',
        minHeight: '60px',
        display: 'flex',
        fontSize: '16px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      };

    const defaultValues = {
        title: task?.title || "",
        date: dateFormatter(task?.date || new Date()),
        team : task?.team || [],
        stage: "", // this is no need to provide because we created the differnt state to take care of this stage is remain that when we click on the edit button
        // like wise for the priority ans assets we already created state and handle the case when user click on the edit button then it need to be as it is this values and after he can change it this values
        priority: "",
        assets: "",
    }
    const {
        register,handleSubmit,formState:{errors},} = useForm({defaultValues}); // we pass the default value object inot this useForm so all the field is automatically filled with this default values
        const [team, setTeam] = useState(task?.team || []); //  we initialize the team array by the task.team
        // console.log("team from addtask",task?.team);
    const[stage,setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
    const [priority,setPriority] = useState(task?.priority?.toUpperCase() || PRIORITY[0]);
    const [assets, setAssets] = useState([]);
    const [uploading, setUploading] = useState(false);

    // const params = useParams();
    // const status = params?.status || "";
    // const{data,refetch} = useGetAllTaskQuery({
    //     strQuery:status,
    //     isTrashed:"",
    //     search:"",
    // }) // this is i used to refetch() function to refresh the database without reloading the page...but it is not used for me now
    // becuase it is changed at tasks page withour reloading page but when i go to the page like completed,in-progress,todo where the this task
    // belongs then it is not update that particular task a different page so i have to reload the page..so that's why i use the
    // window.location.reload() to reload the page instead of this refetch() function...

    // these below two is the create and update task mutation..see the taskApiSlice.js and this is make the api call on the particular backend route with the appropiate
    //  data as a body and perform required operation in data base and send back to the response to the frontend
    const [createTask, {isLoading}] = useCreateTaskMutation(); 
    const [updateTask,{isLoading : isUpdating}] = useUpdateTaskMutation(); // here we change the name of the isLoading to isUpdating direct into the state..
    const URLS = task?.assets ? [...task.assets] : []; // if task's assets is already exist then simply spread out this assets to the url array..measn simply assign the URL array..
    if(isLoading || isUpdating){
        return(
            <div className='py-2'>
                <Loader/>
            </div>
        )
    }
    const submitHandler = async (data) => { // Async function to handle form submission
        // when form is submited means when admin click on the submit button( which has the behaviour as the "submit") then this function is called
        for(const file of assets){ // Loop through each file in the assets array whcich is the react state which is stored the all assets which is selected by the admin/user
            setUploading(true); // Set uploading state to true..to show the assets are uploading message
            try {
                await uploadFile(file); // Attempt to upload the file..this is the function to upload the images in the firebase to better storage purpose and user data safety
            } catch (error) {
                console.log("Error uploading file:",error.message); // Log error message if upload fails
                return; // Exit the function if there's an error
            } finally {
                setUploading(false); // Set uploading state to false
            }
        }
        try {
            const newData = { // Create new data object
                ...data, // Spread the form data
                assets:[...URLS,...uploadedFileURLs], // Combine URLS( which has the already existing assets if we edit the task ) and uploadedFileURLs(which has the assets which is newly uploaded)  into assets array
                team, // Add team data
                stage, // Add stage data
                priority, // Add priority data
            };
            const res = task?._id  // Check if task already exists
            ? await updateTask({...newData,_id:task._id}).unwrap() // If it exists, update the task so call the updateTask mutation function and pass the current task id and spread the newData array
            // we send the taskId becuase in backend we required the task id to find the task and update that particular task so it is easy for me to find the task if i send the task id from  this frontend side
            : await createTask(newData).unwrap(); // If it doesn't exist, create a new task
    
            // refetch();
            toast.success(res.message,{style:toastStyle}); // Show success message with toast
            setOpen(false); // Close the form/modal
            setTimeout(() => { // Reload the page after a delay
                window.location.reload();
            }, 800);
        } catch (error) {
            console.log(error); // Log error if task creation/update fails
            toast.error(error?.data?.message || error.error,{style:toastStyle}); // Show error message with toast
        }
    };
    
    const handleSelect = (e) => {
        // console.log(e); //  see console logging
        setAssets(e.target.files); // when we upload any assets then this function is called and it set the setAssets state to all the images i/admin uploaded...
        // and above in submit handler function this assets array is used...
      };

      const uploadFile = async (file) => { // Define an async function to handle file uploads
        const storage = getStorage(app); // Get Firebase storage instance
    
        const name = new Date().getTime() + file.name; // Generate a unique file name using the current timestamp and the file name
        const storageRef = ref(storage, name); // Create a reference to the storage location
    
        const uploadTask = uploadBytesResumable(storageRef, file); // Start uploading the file to the storage location
    
        return new Promise((resolve, reject) => { // Return a new Promise
            uploadTask.on(
                "state_changed", // Monitor the state of the upload
                (snapshot) => { // Called during the upload process
                    console.log("Uploading"); // Log uploading state
                },
                (error) => { // Handle upload errors
                    reject("hii eror", error); // Reject the Promise with an error
                },
                () => { // Handle successful upload
                    getDownloadURL(uploadTask.snapshot.ref) // Get the download URL of the uploaded file
                        .then((downloadURL) => { // Once the URL is obtained
                            uploadedFileURLs.push(downloadURL); // Add the URL to the uploaded file URLs array
                            resolve(); // Resolve the Promise
                        })
                        .catch((error) => { // Handle errors while getting the download URL
                            reject(error); // Reject the Promise with an error
                        });
                }
            );
        });
    }
    
      // this whole component rendered when we click on the "Create Task" button this button there is in the "Tasks.jsx" file
  return (
    //  here we use the Dialog component of the headless UI...go to the ModalWrapper Component which i created
    <ModalWrapper open={open} setOpen={setOpen}> {/* we pass the open and setOpen state to make sure when should render the Dialog box */}
        <form onSubmit={handleSubmit(submitHandler)}> {/* if this onSubmit is not there then it not showing validation error not this */}
        <Dialog.Title
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4"
            >
            {task ? "UPDATE TASK" : "ADD TASK"} {/*  if task is already exist then we render the title UPDATE TASK otherwise render the ADD TASK title  */}
        </Dialog.Title>
        {/* now below is the content we want to render when the Dialog box is open... */}
        <div className='mt-2 flex flex-col gap-6 rounded-full'>
            <Textbox  // this Textbox is already created component by me
                placeholder="Task Title" 
                type="text" 
                name="title" 
                label="Task Title" 
                className="w-full rounded-lg shadow-lg"
                register={register("title",{required: "Title is required!",})} // this is method register and errors is exported from the React-hook-form..and this is used to 
                // make this field required and so the message "Title is required"
                error={errors.title ? errors.title.message : ""} // to show the error related to this field
            />
            <UserList setTeam={setTeam} team={team}/> {/* to render the UserList field when multiple user is shown up as the List and to whom we want to assign the task we can select multiple user from this..
            go to the UserList component.. */}
            <div className='flex gap-4'>
             {/* now we render the Task Stage and Task Date side by side so these two inside the one div */}
                <SelectList // once we obtained the data from the backend we simply passed on to this "selectList" component
                 // we also created the same SelectList like UserList component for the Task Stage.
                    label="Task Stage" 
                    lists={LISTS} // we pass the LISTS array(once we created above) as a lists prop.... 
                    selected={stage} //  we pass the stage state which has the current stage if the task.stage exist if not then stage = LISTS[0] check the above where this useState is declared..
                    setSelected={setStage} // and this stage and setStage passed as the prop selected and setSelected to the SelectList component...
                />
                <div className='w-full'>
                    <Textbox 
                     // by using this Textbox(already created component by me) we render the date input field...
                        placeholder="Date"
                        type="date"
                        name="date"
                        label="Task Date"
                        className="w-full rounded-lg shadow-lg"
                        register={register("date",{required:"Date is required!",})}
                        error={errors?.date ? errors?.date?.message : ""} // which also show the error if the input field is not filled...
                    /> 
                </div>
            </div>
            <div className='flex gap-4'>
                <SelectList
                    label="Priority Level"
                    lists={PRIORITY}
                    selected={priority}
                    setSelected={setPriority}
                 /> {/* now we want to render the another List for the priority of the task so we passed the "useState priority" and passed the PRIORITY array as the lists prop to this component.. */}
                <div className='w-full flex items-center justify-center mt-4'>
                    <label className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4"
                            htmlFor="imgUpload">
                                <input
                                // we render the one input field which has the type=file means it accept the files..which has .jpg , .jpeg , .png...
                                    type="file"
                                    className='hidden'
                                    id="imgUpload"
                                    onChange={(e) => handleSelect(e)}
                                    accept=".jpg, .png, .jpeg"
                                    multiple={true}
                                />
                                <BiImages/> 
                                <span>Add Assets</span>
                    </label>
                </div>
            </div>
            <div className='bg-white py-6 sm:flex sm:flex-row-reverse gap-4'>
            {/* now if the uploading is true then we show this red color text "Uploading assets" */}
                {uploading ? (
                    <span className='text-sm py-2 text-red-500'>
                        Uploading assets
                    </span>
                ) : (
                    <Button 
                        label="Submit"
                        type="submit"
                        className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto"/>
                         //{/* also render the "submit" button which has the type="submit" */}
                ) 
                }
                <Button 
                    type="button"
                    className="bg-gray-200 px-6 text-sm font-semibold text-gray-900 sm:w-auto"
                    onClick={() => setOpen(false)}
                    label="Cancel"
                /> {/* also we render the "cancel" button which has the type=button..so when user click on this cancle button then
                    it make the state variable "open" as false so this Dialog box is closed because it is open when this "open" state is become true
                    and this useState "open" is passed from the <ModalWrapper> component and that open variable is used to close the Dialog box by setting the
                    "open" variable as false  */}
                {/* {console.log(open)} */}
            </div>
        </div>
    </form>
</ModalWrapper>
  )
}

export default AddTask