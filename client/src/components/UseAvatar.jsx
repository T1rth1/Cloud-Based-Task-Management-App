import React from 'react'
import { Menu, Transition } from "@headlessui/react";
import { FaUser, FaUserLock } from "react-icons/fa";
import{ Fragment, useState } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getInitials } from '../utils/index.js';
import { useLogoutMutation } from '../redux/api/authApiSlice.js';
import { toast } from 'sonner';
import AddUser from "./AddUser.jsx"
import { logout } from '../redux/slices/authSlice.js';
import ChangePassword from './ChangePassword.jsx';
const UseAvatar = () => {
    const [open, setOpen ] = useState(false);
    const[openPassword,setOpenPassword] = useState(false);
    const { user } = useSelector((state) => state.auth);
    // const[logoutUser] = useLogoutMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // const name="camp";
    const toastStyle = {
        padding: '16px 24px',
        borderRadius: '8px',
        minHeight: '60px',
        display: 'flex',
        fontSize: '16px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    };
    const [logoutUser] = useLogoutMutation(); {/* using the logout mutation one which we created already */}
    const logoutHandler = async () => {
        try {
            await logoutUser().unwrap(); // simply call the logout mutation and it is send the request from that authApiSlice.js file to the backend and related to this
            // in backend logout function is called
            dispatch(logout()); // also we called the logout() reducer which is responsible to removeItem from the localstorage...
            toast.success("Logout Successfully.",{style:toastStyle}) // success message
            navigate("/log-in");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong !",{style:toastStyle});
        }
    }
return (
    <>
    <div className=''>
    {/* this Menu is used from the headlessUi to create the dropDown menu */}
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="w-10 h-10 items-center justify-center rounded-full bg-blue-600">
                    <span className='text-white font-semibold'>
                        {/* {getInitials(user?.name)} */}
                        {getInitials(user?.name)}
                    </span>
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            > 
            {/*this transition for the when user clicked on the profile button then open the dropdown menu with transition effect */}
                <Menu.Items className="absolute right-0 z-15 mt-2 w-60 origin-top-right rounded-3xl bg-white shadow-3xl ring-1 ring-black/5 focus:outline-none">
                    <div className='p-4'>
                        <Menu.Item>
                            {({ active }) => (
                                <button onClick={() => setOpen(true)}
                                    className='text-gray-700 flex w-full items-center rounded-md px-2 py-2 text-base'
                                >
                                    <FaUser className='mr-2' aria-hidden="true"/>
                                    Profile
                                </button>
                            )}
                            {/*here what ever we want to add into the dropdown menu we should write as a "Menu.Item" tag */}
                            {/*here when it click on this profile button(one of the menu item) then it make the state "open" as a true */}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button onClick={() => setOpenPassword(true)} // when user clicked on the change password then we set the openPassword as true
                                // and because of this it open the dialog box which is there in the ChangePassword.jsx file..because we pass this state as a prop to this .jsx file
                                // and use it there
                                    className='text-gray-700 flex w-full items-center rounded-md px-2 py-2 text-base'
                                >
                                    <FaUserLock className='mr-2' aria-hidden="true"/>
                                    Change Passowrd
                                </button>
                            )}
                            {/* same as above it make the  "openPassword" state as a true */}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button onClick={logoutHandler}
                                    className='text-red-600 group flex w-full items-center rounded-md px-2 py-2 text-base'
                                >
                                    <IoLogOutOutline className='mr-2' aria-hidden="true"/>
                                    Logout
                                </button>
                                // when it click on the log-out button from dropdown menu then it call the one function
                                // logoutHandler which has the logic for the logout the user.
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    </div>
    <AddUser open={open} setOpen={setOpen} userData={user}/> {/* here we pass the userData because we want to saw the existing user data into form when user click on the profile button */}
    <ChangePassword open={openPassword} setOpen={setOpenPassword}/>
   </>
  )
}

export default UseAvatar