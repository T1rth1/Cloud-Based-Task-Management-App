import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiTwotoneFolderOpen } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { HiDuplicate } from "react-icons/hi";
import { MdAdd, MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Menu, Transition } from "@headlessui/react";
import AddTask from "./AddTask";
import AddSubTask from "./AddSubTask";
import ConfirmatioDialog from "../Dialogs";
import { useDuplicateTaskMutation, useTrashTaskMutation } from "../../redux/api/taskApiSlice";
import { toast } from "sonner";
import { useSelector } from "react-redux";
const toastStyle = {
  padding: '16px 24px',
  borderRadius: '8px',
  minHeight: '60px',
  display: 'flex',
  fontSize: '16px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
};
const TaskDialog = ({task}) => {
  // this is the component it is open up when the user(admin) click on the three dots in the tasks section on any taskCard
  const [open, setOpen] = useState(false);
  const [openEdit,setOpenEdit] = useState(false);
  const [openDialog,setOpenDialog] = useState(false);
  const [msg, setMsg] = useState(null);
  const [type, setType] = useState(null);

  const navigate = useNavigate();
  const {user} = useSelector((state) => state.auth); //  we get the current log-in/register user in my app
  // console.log("sakura",task.title);

  const[deleteTask] = useTrashTaskMutation(); // use the Trash taks mutation one we created already and this mutation make the api call on the backend
  // on the specific route and call the trashtask function which is responsible for to send the task into trash...
  const[duplicateTask] = useDuplicateTaskMutation(); // same for this it is make the api request on the backend route and this route is assosiated with the
  // some function which has the logic for to duplicate the task

  const duplicateHandler = async () => {
    try {
      const res = await duplicateTask(task._id).unwrap();
      // duplcateTask mutation function is called and we pass the task id as body of the request and using this task id we duplicate the task at the backend and save
      // the task in the data base...

      toast.success(res?.message,{toast:toastStyle});  // success message

      setOpenDialog(false);
      setTimeout(() => {
        window.location.reload();
      }, 600);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error,{toast:toastStyle});
    }
  };
  const deleteClicks = () => {
    setOpenDialog(true); // when click on the delete button then it pen the dilog box by making this openDilog state as a "true"...
    setType("delete");
    setMsg("Are you sure? you want to delete this selected task?");
  };
  const deleteHandler = async () => {
    try {
      const res = await deleteTask({
        id:task._id,
        isTrashed:"trash",
      }).unwrap(); // here same to delete the task we pass the task id and isTrashed as the random string measn it is treated as the false value because isTrashed is the boolean 
      // so by using this information in backend we make the isTrashed=true of those tasks which admin want to delete

      toast.success(res?.message,{style:toastStyle}); // res?.message which is we pass from the backend as a success message is shown up here
      setOpenDialog(false); // close the dialog box
      setTimeout(() => {
        window.location.reload(); // reload the page to see the changes on the page
      }, 800);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error,{toast:toastStyle});
    }
  };
  console.lo
  const items = [
    // this is the array in which we have the icons and onclick function...
    {
      label: "Open Task",
      icon: <AiTwotoneFolderOpen className='mr-2 h-5 w-5' aria-hidden='true' />,
      onClick: () => navigate(`/task/${task._id}`),
    },
    {
      label: "Edit",
      icon: <MdOutlineEdit className='mr-2 h-5 w-5' aria-hidden='true' />,
      onClick: () => setOpenEdit(true),
    },
    {
      label: "Add Sub-Task",
      icon: <MdAdd className='mr-2 h-5 w-5' aria-hidden='true' />,
      onClick: () => setOpen(true),
    },
    {
      label: "Duplicate",
      icon: <HiDuplicate className='mr-2 h-5 w-5' aria-hidden='true' />,
      onClick: () => duplicateHandler(),
    },
  ];

  return (
    <>
      <div className="">
      {/* here we use the <Menu> component of the headless UI */}
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-600">
            <BsThreeDots/> {/*  this is the button with the three dots icon */}
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
        > {/* transition appear when user(Admin) click on the this three dots button */}
          <Menu.Items className="absolute z-50 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-xl bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1 space-y-2">
              {items?.map((el,ind) => (
                // i map through the items array and render the all items which should be there when admin click on the three dots///
                ((el.label=="Open Task" && user?.isAdmin==false) || (user?.isAdmin==true)) && (
                  // if user is not admin and current element is "open task" then he/she render this below menu.item means for this user only one option is there "Open Task"
                  // or is user is admin then render the all the items which is there in the items array..
                  // so go to the TaskDetail page to see the remaining logic...
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={el?.onClick} // this is the onclick function...
                      // how it works when user click on these any of it's items explained below
                      // when user click on the "Open Task" button then it navigate to the "/task/:id" so open up the TaskDetails.jsx component...
                      // when user click on the "Edit" button then it set the state variable "openEdit" as true..and this variable passed as "open" and "setOpen" prop to the <AddTask> component
                      // so is open that dialog box which is written for the Add Task in the AddTask.jsx file
                      // when user click on the "Add Sub-Task" button then we make the open=true and this state is passed to the <AddSubTask> component and open up the DialogBox which is written
                      // for to add the sub task in the AddSubTask.jsx file.
                      id={ind} // unique id by item's indexes
                      className={`${
                        active ? 'bg-blue-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {el.icon} {/* this is the icon and label for these items */}
                      {el.label}
                    </button>
                  )}
                </Menu.Item>
                )
              ))}
            </div>
            {
              user?.isAdmin && (
                // same if user is admin then render this below delete icon otherwise not..because normal user can not delete any task which is not an admin
            <div className='px-1 py-1'>  
              <Menu.Item>
              {/* now we render the last item which is the "Delete" button to delete the task */}
                {({ active }) => (
                  <button
                    onClick={() => deleteClicks()}
                    disabled={user?.isAdmin ? false : true}
                    className={`${
                      active ? 'bg-blue-500 text-white' : 'text-gray-900' // when active==true means we hover at this Delete button then we change the bgcolor=blue and text=white..
                      // so like wise these "active" sate is used provided by the headless UI
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <RiDeleteBin6Line
                        className='mr-2 h-5 w-5 text-red-400'
                        aria-hidden='true'
                      /> {/* render the Delete button */}
                    Delete
                  </button>
                )}
              </Menu.Item>
            </div>
              )
            }
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
    <AddTask
      open={openEdit}
      setOpen={setOpenEdit}
      task={task} // so when user click on the edit task then this is pass the current data which need to be already filled to the text fields so pass the existing task data
      key={new Date().getTime()}
    />
    <AddSubTask open={open} setOpen={setOpen} id={task._id}/> {/* here we also pass the id which we use in the AddSubTask.jsx component */}
    <ConfirmatioDialog
        open={openDialog}
        type={type}
        setType={setType}
        msg={msg}
        setMsg={setMsg}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      /> {/* this concept is remaining when user click on the delete button then we render this ConfirmationDialog box to confirm the action of the user */}
    </>
  )
}

export default TaskDialog