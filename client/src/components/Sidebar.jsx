import React, { useState } from 'react';
import {
    MdDashboard,
    MdOutlineAddTask,
    MdOutlinePendingActions,
    MdSettings,
    MdTaskAlt,
  } from "react-icons/md";
  import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { setOpenSidebar } from '../redux/slices/authSlice.js';
import clsx from 'clsx';
import AddUser from './AddUser.jsx';

const linkData = [
    {
      label: "Dashboard",
      link: "dashboard",
      icon: <MdDashboard />,
    },
    {
      label: "Tasks",
      link: "tasks",
      icon: <FaTasks />,
    },
    {
      label: "Completed",
      link: "completed/completed",
      icon: <MdTaskAlt />,
    },
    {
      label: "In Progress",
      link: "in-progress/in-progress",
      icon: <MdOutlinePendingActions />,
    },
    {
      label: "To Do",
      link: "todo/todo",
      icon: <MdOutlinePendingActions />,
    },
    {
      label: "Team",
      link: "team",
      icon: <FaUsers />,
    },
    {
      label: "Trash",
      link: "trashed",
      icon: <FaTrashAlt />,
    },
  ];
const Sidebar = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const location = useLocation(); // this is used to determine the current endpoint(means location)
    const path = location.pathname.split("/")[1]; // now location.pathname give you whole current location with the localhost:3000/Dashboard
    // but we want only path after the "localhost:3000/" so we split at the "/" and take the 2nd element of the path array...."
    // this path = ["", "todo", "todo"]..like this resulting in the array and we take the 2nd means path[1] element which is "todo"
    const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0,5);
    // const sidebarLinks = user?.isAdmin? linkData : linkData.slice(0,5);

    // temporary here i do the user?.isAdmin = true because i want to work upon the 5(Team) and 6(Trash) element of the linkData array
    // if user is admin then it can access all links within the sidebar so we assign the whole linkData array to the "sidebarLinks" constant but 
    // when user is not admin it can access only 0 to 4 element of the linkData array...

    const closeSidebar = () => {
        dispatch(setOpenSidebar(false)); // use the state "setOpenSidebar" to make the "isSidebar" state to true or false which is by default false 
        // which we crated in the initial state in authSlice.js file
    }
    const[open,setOpen] = useState(false);
    const NavLink = ({el}) => {
        return (
            <Link to={el.link} onClick={closeSidebar}
            // this link is generate the link which is passed over el.link and so when we click on any element of the sidebar then
            // this Link is send we to that particular endpoint(route) based on that endpoint we render the different components of the react from App.jsx file
             className={clsx("w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-[#555aff2d]",path === el.link.split("/")[0] ? "bg-blue-700 text-white hover:text-gray-800" : ""
             )}> {/* when current element is selected from the sideBar then we compare the current selected element and the path we have as a endpoints..
              and if both are same then we make it's color as a blue and text as a white...
//************concept related how .split("/") works****************
            => el.link.split("/")[0] resulting in the array which is for example :  ["todo","todo"] if el.link = "todo/todo" so take the first element of this array..
             in the case of the el.link = "dashboard" then there is no forwardSlash("/") so resultant array has only one element which is original string which is "dashboard" */}

                {el.icon} {/* we de-prop the "el" and access el.icon and el.link */}
                <span className='hover:text-blue-700'>{el.label}</span>
             </Link>
        )
    }
 return (
    <div className='w-full h-full flex flex-col gap-6 p-5'>
        <h1 className='flex gap-1 items-center'>
            <p className='bg-blue-600 p-2 rounded-full'>
                <MdOutlineAddTask className='text-white text-2xl font-black'/>
            </p>
            <span className='text-2xl font-bold text-black'>Taskly </span>
        </h1>
        <div className='flex-1 flex flex-col gap-y-5 py-8'>
            {
                sidebarLinks?.map((link) => (
                    <NavLink el={link} key={link.label}/>
                    // now this run through whole array and create the NavLink component
                    // and it pass the prop as a whole one element of the array as a "el"...
                    // ex. el = {
                    //       label: "Dashboard",
                    //        link: "dashboard",
                    //        icon: <MdDashboard />,
                    //     } 
                ))
            }
        </div>
        <div className=''>
            <button className='w-full flex gap-2 p-2 items-center text-lg text-gray-800' onClick={() => {setOpen(true)}}>
                <MdSettings/>
                <span> Settings</span>
            </button>
        </div>
        {/* {console.log("user",user)} */}
        <AddUser open={open} setOpen={setOpen} userData={user}/>
    </div>
  )
}

export default Sidebar