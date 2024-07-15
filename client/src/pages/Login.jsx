import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {useForm} from "react-hook-form";
import { useEffect } from 'react';
import Textbox from '../components/Textbox';
import Button from '../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../redux/api/authApiSlice';
import { toast } from 'sonner';
import { setCredentials } from '../redux/slices/authSlice';
import Loader from '../components/Loader';
import ChangePassword from '../components/ChangePassword';
const Login = () => {
    const { user } = useSelector((state) => state.auth);
    //**********what is this above line do is written over below!***********
    //  This is a selector function that takes the entire Redux store state as an argument and returns the part of the state that you are interested in.
    //  In this case, it returns state.auth from the authSlice.js file.
    //  const { user } = ...:This is destructuring assignment. It extracts the user property from the object returned by useSelector.
    //  state.auth is expected to be an object with having a "user" property.
    //  When you use useSelector to access state.auth, you're accessing the state managed by authSlice.js file.
    //  The user property comes from the "initial state" which we created in the authSlice.js file and can be updated by the actions[actions means reducers] which we defined in the authSlice.js file which is the setCredentials and logout.
    // and in these 2 reducers we use localStorage to store the "user" and remove the "user" using the "userInfo" object...
    const{register,handleSubmit,formState:{errors},} = useForm();
    const[openPassword,setOpenPassword] = useState(false);

    const toastStyle = {
        padding: '16px 24px',
        borderRadius: '8px',
        minHeight: '60px',
        display: 'flex',
        fontSize: '16px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ login, {isLoading} ] = useLoginMutation(); // here this is the loginMutation once we created on the authApiSlice.js file
    // A function to trigger the mutation (login).This function is used to initiate the login mutation. When you call login with the required data (e.g., user credentials), it sends a request to the server on the perticular route
    // which we define in the login mutation and when it make the request on this particular route then we call the function related to this login operation at the server side.
    // An object containing metadata about the mutation's state ({ isLoading }).If isLoading is true, it means the mutation request is ongoing. If false, the request is either complete or has not started yet.
    const submitHandler = async (data) => {
        try {
            const result = await login(data).unwrap();
            // data is the argument passed to the login function, which typically contains the login credentials (e.g., username and password).
            // and with this data we call the login mutation and it make the api request with this data at the backend(server).
            //.unwrap(): Extracts the actual response data if the request was successful or throws an error if the request failed.

            dispatch(setCredentials(result)); // here we dispatch the one function for which we already  created a slice...so it call the setCredentials function
            // and pass this login user's data..and this function store this data into local storage see the implemention of this function in authSlice.js file..
        
          navigate("/"); // now navigate to home route means /dashboard route see App.jsx component render path..<Route path='/' element={<Navigate to='/dashboard'/>}/>

            window.location.reload(); // this is for the reload of whole application
            // console.log("result from frontend",result);
            toast.success("Login Succesfull.",{style:toastStyle}) // toasting with the successful message with custom toast styles...
        } catch (error) {
            console.log(error);
            // toast.error('My error toast');
            toast.error(error?.data?.message || error.message,{style:toastStyle});
        }
    };
    useEffect(() => {
        user && navigate("/dashboard");
    },[user]) // call this useEffect when the current user get changed and if the user exist then navigate to the dashboard means if the user exist then it can not go directly to the log-in
    // page without logout..
return (
    <>
    <div className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row'>
        <div className='w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center'>
             {/* this below whole "div" is for the left side rendering of the login page */}
            <div className='h-full w-full lg:w-2/3 flex flex-col items-center justify-center'>
                <div className='w-full md:max-w-lg 2xl:max-w-xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:mt-20'>
                    <span className='flex gap-1 py-2 border px-3 rounded-full text-sm md:text-base border-gray-300 text-gray-600'>
                        Manage all your task in one place!
                    </span>
                    <p className='flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700'>
                        <span>Cloud-Based</span>
                        <span>Task Manager</span>
                    </p>
                    <div className='cell'>
                        <div className='circle rotate-in-up-left'></div>
                    </div>
                </div>
            </div>
            {/* this below whole "div" is for the right side rendering of the login page */}
            <div className='w-full md:w-1/3 p-4 md:p-1 flex flex-col jusitfy-center items-center'>
                <form onSubmit={handleSubmit(submitHandler)} className='form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 py-14'>
                {/* when we submit the form then it called this submit handler function which has make the request on the server with the required user credentials */}
                    <div className=''>
                        <p className='text-blue-600 text-3xl font-bold text-center'>
                            Welcome back!
                        </p>
                        <p className='text-center text-base text-gray-700'>
                        Kepp all your credential safe!</p>
                    </div>
                    <div className='flex flex-col gap-y-5'>
                        <Textbox
                            placeholder="email@example.com"
                            type="email"
                            name="email"
                            label="Email Address"
                            className="w-full rounded-full"
                            register={register("email",{
                                required:"Email Address is required!",
                            })}
                            error={errors.email ? errors.email.message:""}
                        />
                        {/* register("email", {...}) registers the input field with the form. 
                        It tells react-hook-form to track the value, validation, and any errors related to the "email" field. */}
                        <Textbox
                            placeholder="your password"
                            type="password"
                            name="password"
                            label="Password"
                            className="w-full rounded-full"
                            register={register("password",{
                                required:"Password is required!",
                            })}
                            error={errors.password ? errors.password.message:""}
                        />
                        <span className='text-sm text-gray-500
                            hover:text-blue-600 hover:underline cursor-pointer'>Forgot Passowrd?</span>
                            {isLoading ? <Loader/> : <Button
                            type="submit"
                            label="Submit"
                            className='w-full h-10 bg-blue-700 text-white'
                        />}
                    </div>
                </form>
            </div>
        </div>
    </div>
    {/* <ChangePassword open={openPassword} setOpen={setOpenPassword}/> */}
    </>
    // css information : 
    // 2xl:max-w-xl: Sets the maximum width to xl size on extra-large screens and above.
    // flex: Applies flexbox layout.
    // flex-col: Arranges child elements in a column (vertically).
    // flex-row: Arranges child elements horizontally in a row.
    // items-center: Centers items vertically.
    // justify-center: Centers items horizontally.
    // lg:w-2/3: Sets the width to 2/3 of the container on large screens and above
    // gap-5: Adds a gap of 5 units between flex items.
    )

}

export default Login