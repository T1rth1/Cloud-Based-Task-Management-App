import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from '../utils';
import TaskDialog from './task/TaskDialog';
import { BiMessageAltDetail } from "react-icons/bi";
import { MdAttachFile, MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp } from 'react-icons/md';
import clsx from 'clsx';
import { FaList } from 'react-icons/fa';
import UserInfo from './UserInfo';
import { IoMdAdd } from 'react-icons/io';
import AddSubTask from './task/AddSubTask';

const ICONS = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
  };

const TaskCard = ({task}) => {
    const {user} = useSelector((state) => state.auth);
    const [open, setOpen] = useState(false);
    const subtasks = task?.subTasks;
  return (
    <>

    <div className='w-full h-fit bg-white shadow-2xl p-4 rounded-xl'>
        <div className='w-full flex justify-between'>
        <div className={clsx("flex flex-1 gap-1 items-center text-sm font-medium",PRIOTITYSTYELS[task?.priority])}>{/* for different prority we render the diffent color styles */}
            <span className='text-lg'>{ICONS[task?.priority]}</span>{/*render the ICON for the different priority based */}
            <span className='uppercase'>{task?.priority} Priority</span>{/* render the priority of each Task */}
        </div>
            {true && <TaskDialog task={task}/>} {/* if user is not admin then it can access the only openTask button otherwise if the user is admin then it can access the all functionality depending on this
            we make the button disabled in TaskDialog component */}
        </div>
        <>
            <div className='flex items-center gap-2'>
                <div className={clsx("w-4 h-4 rounded-full",TASK_TYPE[task.stage])}/> {/* color for differnt task */}
                <h4 className='line-clamp-1 text-black'>{task?.title}</h4>{/* title of the each task */}
            </div>
            <span className='text-sm text-gray-600'>
                {formatDate(new Date(task?.date))} {/* use the formatDate function to get the formated date */}
            </span>
        </>
        <div className='w-full border-t border-gray-200 my-2'/>{/* render the underline(like a border) */}
        <div className='flex items-center justify-between mb-2'>
             {/* render the differnt icon for differnt functionality */}
            <div className='flex items-center gap-3'>
                <div className='flex gap-1 items-center text-sm text-gray-600'>
                    <BiMessageAltDetail/>
                    <span>{task?.activities?.length}</span>
                </div>
                <div className='flex gap-1 items-center text-sm text-gray-600'>
                    <MdAttachFile/>
                    <span>{task?.assets?.length}</span>
                </div>
                <div className='flex gap-1 items-center text-sm text-gray-600'>
                    <FaList/>
                    <span>{task?.subTasks?.length}</span>
                </div>                
            </div>
            <div className='flex flex-row-reverse'>
                {task?.team?.map((m,index) => (
                    // render the all user which is in the team there...with the userIcon for this already we created <UserInfo> component..imported it here
                    <div
                        key={index}
                        className={clsx("w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",BGS[index % BGS?.length])}
                    >
                        <UserInfo user={m} />
                    </div>
                ))}
            </div>
        </div>
        {/* {console.log("subtasks new",subtasks)} */}
        {/* sub tasks */}
        {subtasks.length > 0 ? ( 
            // if there is subTask exist then this component rendered..
            subtasks.map((task,id) => (
                <div className='py-2 border-t border-gray-200 ml-2'>
                    <h5 className='text-base line-clamp-1 text-black'>
                        {task?.title} {/* subtask's title */}
                    </h5>
                    <div className='py-2 space-x-8'>
                        <span className='text-sm text-gray-600'>
                            {formatDate(new Date(task?.date))} {/* substask's created date using the formatDate function imported form the index.js file */}
                        </span>
                        <span className='bg-blue-600/10 px-3 py-1.5 rounded-xl text-blue-700 font-medium'>
                            {task?.tag} {/* tag of the subTask */}
                        </span>
                    </div>
                </div>
            ))
            ):
        (
            <>
                <div className='py-4 border-t border-gray-200'>
                    <span className='text-gray-500'>No Sub Task</span>{/* is there is no subtask then render this div */}
                </div>
            </>
        )}
        <div className='w-full pb-2'>
            <button 
                onClick={() => setOpen(true)} // this function's work later on implemented...
                disabled={user?.isAdmin ? false : true} // if user is admin then this disabled false means button is working otherwise button is not working it show cursor-not-allowed css
                className='w-full flex gap-4 items-center text-sm
                text-gray-500 font-semibold disabled:cursor-not-allowed
                disabled::text-gray-300'
                >
                <IoMdAdd className='text-lg'/>{/* + icon rendered */}
                <span>ADD SUBTASK</span>
            </button>
        </div>
    </div>
     {/* so when user click on the above AddTask then it set the state variable open=true and this "open" state variable is passed to this <AddSubTask> component */}
        <AddSubTask open={open} setOpen={setOpen} id={task._id}/>
    </>
  )
}

export default TaskCard