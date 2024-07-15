import React, { useState } from 'react'
import { MdAttachFile, MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp } from 'react-icons/md';
import clsx from "clsx";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from '../../utils';
import UserInfo from '../UserInfo';
import moment from 'moment';
import { BiMessageAltDetail } from 'react-icons/bi';
import { FaList } from 'react-icons/fa';
import Button from '../Button';
import ConfirmatioDialog from '../Dialogs';
import AddTask from './AddTask';
import { useTrashTaskMutation } from '../../redux/api/taskApiSlice';
import { toast } from 'sonner';
const ICONS = { // this is the ICONS array to show the differnt arrow based on priority of the task
    high: <MdKeyboardDoubleArrowUp/>,
    medium:<MdKeyboardArrowUp/>,
    low:<MdKeyboardArrowDown/>,
}
const toastStyle = {
    padding: '16px 24px',
    borderRadius: '8px',
    minHeight: '60px',
    display: 'flex',
    fontSize: '16px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  };
// this whole Table component is same as we created at the Dashboard.jsx file and only differnce is we added 2 more column assets and edit and delete button...
  const Table = ({tasks}) => {
    const [openDialog,setOpenDialog] = useState(false);
    const [selected, setSelected] = useState(null);
    const [openEdit,setOpenEdit] = useState(false);
    const [msg, setMsg] = useState(null);
    const [type, setType] = useState(null);
    const deleteClicks = (id) => {
        setType("delete");
        setMsg("Are you sure? you want to delete the selected record?");
        setSelected(id);
        setOpenDialog(true);
    }
    const editClicks = (el) => {
        setSelected(el);
        setOpenEdit(true);
    }

    const [trashTask, {isLoading}] = useTrashTaskMutation();
    const deleteHandler = async () => {
        try {
            const result = await trashTask({
                id:selected,
                isTrash:"trash",
            }).unwrap();

            toast.success(result?.message,{style:toastStyle});
            setOpenDialog(false);
            setTimeout(() => {
                window.location.reload();
            },500)
        } catch (err) {
            console.log(err);
            toast.error(err?.data?.message || err.error,{style:toastStyle});
        }
    };
    const TableHeader = () => (
      // creating a table header using the <thead> tag and give a title to this table  
      <thead className="border-b border-gray-300">
      {/* this border-b used to do the line at the bottom of the each row */}
        <tr className='text-black text-left'>
         {/* here we have 5 column so we render the 5 different <th> tag */}
          <th className='py-2'>Task Title</th>
          <th className='py-2'>Priority</th>
          <th className='py-2 line-clamp-1'>Created At</th>
          <th className='py-2'>Assets</th>
          <th className='py-2'>Team</th>
        </tr>
      </thead>
    );
const TableRow = ({task}) => (
// this is the function to create the only one row with three differnt data cell <td>...and these three <td> comes inside only single <tr> tag table row...
        <tr className='border-b border-gray-300 text-gray-600 hover:bg-gray-300/10'>
        <td className='py-2'>
            <div className='flex items-center gap-2'>
            <div className={clsx("w-4 h-4 rounded-full",TASK_TYPE[task.stage])}/>
            {/* in our data we have the stage property which contain the type of the task and based on the type of the task we render the differnt color from the "TASK_TYPE" json */}
            <p className='w-full line-clamp-2 text-base text-black'>{task?.title}</p> {/* this is the title of the task... */}
            </div>
        </td>
        <td className="py-2">
            <div className='flex gap-1 items-center'>
            <span className={clsx('text-lg',PRIOTITYSTYELS[task.priority])}>{ICONS[task.priority]}</span>
            {/* also we have the PRIORITYSTYLE json which contain the differnt color of the arrows based on the priority..make sure you import the PRIORITYSTYELS import from the data.js file */}
            {/* based on priority we render the differnt icon which is already defined in the ICONS array */}
            <span className='capitalize'>{task?.priority}</span> {/* task Prority like medium,high,low */}
            </div>
        </td>
        <td className='py-2 '>
            <span className='text-sm text-gray-600'>
                {formatDate(new Date(task?.date))} {/* Create a date using already reated function which is "formatDate" in index.js file*/}

            </span>
        </td>
        <td className='py-2'>
        {/* this is for the assets column we render the ICON and it's legth means counts */}
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
                    <span>0/{task?.subTasks?.length}</span>
                </div>
            </div>
        </td>
        <td className='py-2'>
            <div className='flex'>
            {task?.team?.map((m,index) => (
                <div className={clsx("w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",BGS[index%BGS.length])}>
                {/* we consider the four diffent color to render the user icon consecutively with differnt color so we take the mod with the index of the user...
                so index is consequitive for the consequtive users and this index after taking the mod the value of the "index%BGS.length" is from 0 to 3
                so it render the differnt color for all consequitive user*/}
                <UserInfo user={m}/> {/* how many user assosiated with this task we go through the loop and render all of the user in form of the icon  */}
                </div>
            ))}
            </div>
        </td>
        <td className='py-2 flex gap-2 md:gap-4 justify-end'>
            {/* render the Edit and Delete button in one column of the table */}
            <Button
            className='text-blue-600 hover:text-blue-500 sm:px-0 text-sm md:text-base'
            label='Edit'
            type='button'
            onClick={() => editClicks(task)}
            // now when user click on the Edit button then it call this function editClicks in which we set the "openEdit" state as a true...and when it become true it render the AddTask.jsx file
            />

            <Button
            className='text-red-700 hover:text-red-500 sm:px-0 text-sm md:text-base'
            label='Delete'
            type='button'
            onClick={() => deleteClicks(task._id)} // when user click on the Delete button in the "ListView" of the "Tasks"...then it call the deleteClicks() function..
            // in which function we set the state variable "msg" and "type" as per my requirement..
            />
      </td>
        </tr>
);
return (
    <>
        <div className='bg-white px-2 md:px-4 pt-4 pb-9 shadow-xl rounded-2xl'>
        {/* here we already showing the last 10 task so no need of scrollbar here */}
            <div className='overflow-x-auto'>
                <table className='w-full'>
                    <TableHeader /> {/* render the TableHeader component first as per the hierarchy in the <table> tag */}
                    <tbody>
                    {tasks?.map((task, id) => (
                        // we run a loop for each task and render the TableRow for the each task...with different unique id and passing over a task as a prop to the <TableRow> component
                        <TableRow key={id} task={task} />
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
         {/* TODO */} 
        <ConfirmatioDialog
            open={openDialog}
            setOpen={setOpenDialog}
            msg={msg}
            onClick={deleteHandler}
            setMsg={setMsg}
            type={type}
            setType={setType}
        />{/* now here we pass the "openDialog" state as the "open" state as a prop...and also pass the "msg" and "type" as a prop also to this ConfirmationDialog component
            now in that <ConfirmationDialog> function we simply use this msg and type to display the different message and type(like ex. restore and delete) there
        */}
    <AddTask
      open={openEdit}
      setOpen={setOpenEdit}
      task={selected}
      key={new Date().getTime()}
    /> {/* here we pass the "openEdit" state as the "open" state and use this "open" state variable to open the AddTask's dialog box */}
   
    </>
    );
    
};

export default Table