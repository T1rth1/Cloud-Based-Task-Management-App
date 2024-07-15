import React, { useState } from 'react'
import clsx from "clsx";
import { MdDelete, MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp, MdOutlineRestore } from 'react-icons/md';
import { tasks } from '../assets/data';
import Title from '../components/Title';
import Button from '../components/Button';
import { PRIOTITYSTYELS, TASK_TYPE, formatDate } from '../utils';
import AddUser from '../components/AddUser';
import ConfirmatioDialog from '../components/Dialogs';
import { useDeleteRestoreTaskMutation, useGetAllTaskQuery } from '../redux/api/taskApiSlice';
import Loader from '../components/Loader';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';

const ICONS = { // this is the ICONS array to show the differnt arrow based on priority of the task
  high: <MdKeyboardDoubleArrowUp/>,
  medium:<MdKeyboardArrowUp/>,
  low:<MdKeyboardArrowDown/>,
  }
  const Trash = () => {
    const toastStyle = {
      padding: '16px 24px',
      borderRadius: '8px',
      minHeight: '60px',
      display: 'flex',
      fontSize: '16px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    };
    const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState(null);
  const [type, setType] = useState(null);
  const [selected, setSelected] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { data,isLoading,refetch} = useGetAllTaskQuery({
    strQuery:"",
    isTrashed:"true", // here we  pass the isTrashed=true so it find the all tasks which has isTrashed=true and for all stages(whether it is comoleted,in-progress or todo)
    search:"",
  });

  // console.log("data from trash",data);
  const [deleteRestoreTask] = useDeleteRestoreTaskMutation(); // this is the mutation for the delete and restore the task and it is make the request on the 
  // particular endpoint of the backend and in backend we call the function which is responsible to delete and restore the task

  const deleteRestoreHandler = async () => {
    try {
      let result;

      switch (type) {
        case "delete":
          result = await deleteRestoreTask({
            id:selected,actionType:"delete", // here we pass the id as a selected state in which we store the id of the task..when user click on the edit or delete button that 
            // time we set this selected state as the task's id and also we pass the actionType which is required ot perform operation at the backend side
          }).unwrap();
          break;
        case "deleteAll":
          result = await deleteRestoreTask({
            id:selected,actionType:"deleteAll",
          }).unwrap();
          break;
        case "restore":
          result = await deleteRestoreTask({
            id:selected,actionType:"restore",
          }).unwrap();
          break;
        case "restoreAll":
          result = await deleteRestoreTask({
            id:selected,actionType:"restoreAll",
          }).unwrap();
          break;
      }
      // so here for the restoreAll and deleteAll we dont set the selected state as the task's id so it is automatically delete all and restore all the tasks..see the backend logic
      // deleteRestoreTask function at the backend side

      toast.error(result?.message,{style:toastStyle}); // in last we have the result.message from the backend and we show that message
      // toast.success(res.message,{style:toastStyle});

      refetch(); // this function from the "getAllTaskQuery" mutation
      setOpenDialog(false);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err?.error,{style:toastStyle});
    }
  }
  const deleteAllClick = () => {
    setType("deleteAll");
    setMsg("Do you want to permenantly delete all items?");
    setOpenDialog(true);
  };

  const restoreAllClick = () => {
    setType("restoreAll");
    setMsg("Do you want to restore all items in the trash?");
    setOpenDialog(true);
  };

  const deleteClick = (id) => {
    setType("delete");
    setMsg("Are you sure? you want to delete the selected record?");
    setSelected(id); // here we set the selected state by the task's id which admin want to delete and this selected state is used to passed to the backend and based on the find the task
    // and delete that particular task same for the resore the task
    setOpenDialog(true);
  };

  const restoreClick = (id) => {
    setSelected(id);
    setType("restore");
    setMsg("Do you want to restore the selected item?");
    setOpenDialog(true);
  };

  if(isLoading){
    return(
      <div className='py-10'>
        <Loader/>
      </div>
    )
  }
  // this is the exactly same as the Table.jsx component only some minor changes are there....
  const TableHeader = () => (
    <thead className='border-b border-gray-300'>
      <tr className='text-black  text-left'>
        <th className='py-2'>Task Title</th>
        <th className='py-2'>Priority</th>
        <th className='py-2'>Stage</th>
        <th className='py-2 line-clamp-1'>Modified On</th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => (
    <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-400/10'>
      <td className='py-2'>
        <div className='flex items-center gap-2'>
          <div
            className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
          />
          <p className='w-full line-clamp-2 text-base text-black'>
            {task?.title}
          </p>
        </div>
      </td>

      <td className='py-2 capitalize'>
        <div className={"flex gap-1 items-center"}>
          <span className={clsx("text-lg", PRIOTITYSTYELS[task?.priority])}>
            {ICONS[task?.priority]}
          </span>
          <span className=''>{task?.priority}</span>
        </div>
      </td>

      <td className='py-2 capitalize text-center md:text-start'>
        {task?.stage}
      </td>
      <td className='py-2 text-sm'>{formatDate(new Date(task?.date))}</td>

      <td className='py-2 flex gap-1 justify-end'>
       {/* render two icon for restore button and delete button */}
       {/* when user click on these button then it called the two function in which it set the "msg" and "type" state variable and also set the "openDialog" state to true..
       and when it become true it open up the ConfirmationDialog box  */}
        <Button
          icon={<MdOutlineRestore className='text-xl text-gray-500' />}
          onClick={() => restoreClick(task._id)}
        />
        <Button
          icon={<MdDelete className='text-xl text-red-600' />}
          onClick={() => deleteClick(task._id)}
        />
      </td>
    </tr>
  );

  return (
    <>
    <div className='w-full md:px-1 px-0 mb-6'>
      <div className='flex items-center justify-between mb-8'>
        <Title title='Trashed Tasks' /> {/* we render the title "Trashed Tasks" using we created component "Title" */}

        <div className='flex gap-2 md:gap-4 items-center'>
         {/* render the two button "Restore All" and "Delete All" with the two different buttons */}
         {/* these two button also called the different function and set the "msg" and "type" state variable with different messages and type required and also set the openDialog=true..
         see the above function to see on each button click which message and type is shown up to user */}
          <Button
            label='Restore All'
            icon={<MdOutlineRestore className='md:text-lg text-3xl md:flex' />}
            className='flex flex-row-reverse gap-1 items-center  text-black text-sm md:text-base rounded-md 2xl:py-2.5'
            onClick={() => restoreAllClick()}
          />
          <Button
            label='Delete All'
            icon={<MdDelete className='md:text-lg text-3xl md:flex' />}
            className='flex flex-row-reverse gap-1 items-center  text-red-600 text-sm md:text-base rounded-md 2xl:py-2.5'
            onClick={() => deleteAllClick()}
          />
        </div>
      </div>
      <div className='bg-white px-2 md:px-6 py-4 shadow-xl rounded-3xl'>
        <div className='overflow-x-auto'>
          <table className='w-full mb-5'>
            <TableHeader />
            <tbody>
              {data?.tasks.map((tk, id) => (
                // we run through a loop in tasks array and render the TableRow component...
                <TableRow key={id} task={tk} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <AddUser open={open} setOpen={setOpen} userData={user}  />

    <ConfirmatioDialog
      open={openDialog}
      setOpen={setOpenDialog}
      msg={msg}
      setMsg={setMsg}
      type={type}
      setType={setType}
      onClick={() => deleteRestoreHandler()}
    /> {/* when the openDialog==true so it is passed as the "open" state as a prop so it open the dialog box with passed message and type(like ex.restore and delete)  */}
  </>
  )
}

export default Trash