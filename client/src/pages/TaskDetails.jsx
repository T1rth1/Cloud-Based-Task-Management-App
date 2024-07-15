import React, { useState } from 'react'
import { FaBug, FaTasks, FaThumbsUp, FaUser } from 'react-icons/fa';
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp, MdOutlineDoneAll, MdOutlineMessage, MdTaskAlt } from 'react-icons/md';
import { GrInProgress } from "react-icons/gr";
import { RxActivityLog } from "react-icons/rx";
import { useParams } from 'react-router-dom';
import { tasks } from '../assets/data';
import Tabs from '../components/Tabs';
import { PRIOTITYSTYELS, TASK_TYPE, formatDate, getInitials } from '../utils';
import clsx from 'clsx';
import Loader from '../components/Loader';
import Button from "../components/Button"
import moment from 'moment';
// import Logo from "../assets/cyber-security-risk-management-abstract-concept-vector-illustration_107173-25769.avif"
import { useGetSingleTaskQuery, usePostTaskActivityMutation } from '../redux/api/taskApiSlice';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
// const assets = [
//   // tempoory which is of no use
//   "https://images.pexels.com/photos/2418664/pexels-photo-2418664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//   "https://images.pexels.com/photos/8797307/pexels-photo-8797307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//   "https://images.pexels.com/photos/2534523/pexels-photo-2534523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//   "https://images.pexels.com/photos/804049/pexels-photo-804049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",

// ];

const toastStyle = {
  padding: '16px 24px',
  borderRadius: '8px',
  minHeight: '60px',
  display: 'flex',
  fontSize: '16px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
};

const ICONS = {
  // icons for the high,medium and low priority
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const bgColor = {
  high: "bg-red-200",
  medium: "bg-yellow-200",
  low: "bg-blue-200",
};

const TABS = [
  // this is icons for the Task Detail and Activities/Timeline  tab...
  { title: "Task Detail", icon: <FaTasks /> },
  { title: "Activities/Timeline", icon: <RxActivityLog /> },
];

const TASKTYPEICON = {
  // this is the array of to add the different activity in activities/timeline tab...
  commented: (
    <div className='w-10 h-10 rounded-full bg-violet-500 flex items-center justify-center text-white'>
      <MdOutlineMessage />
    </div>
  ),
  started: (
    <div className='w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white'>
      <FaThumbsUp size={20} />
    </div>
  ),
  assigned: (
    <div className='w-6 h-6 flex items-center justify-center rounded-full bg-gray-500 text-white'>
      <FaUser size={14} />
    </div>
  ),
  bug: (
    <div className='text-red-600'>
      <FaBug size={24} />
    </div>
  ),
  completed: (
    <div className='w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white'>
      <MdOutlineDoneAll size={24} />
    </div>
  ),
  "in progress": (
    <div className='w-8 h-8 flex items-center justify-center rounded-full bg-violet-600 text-white'>
      <GrInProgress size={16} />
    </div>
  ),
};

const act_types = [
  // diferent activity types in Activities/Timeline tab...
  "Started",
  "Completed",
  "In Progress",
  "Commented",
  "Bug",
  "Assigned",
];

// this page is rendered when we headover to the /task/:id route...
const TaskDetails = () => {
  const {id} = useParams(); // /task/:id here we have this route on which we render this TaskDetails.jsx file so using useParam we can get this dynamic :id from this route..
  const [selected,setSelected] = useState(0);
  // const task = tasks[3]; // temporary take the static data which is fourth element of the task array...
  // console.log("id",id);
  const {user} = useSelector((state) => state.auth); // get the current logged in user from the local storage...

  const {data,isLoading,refetch} = useGetSingleTaskQuery(id); 
  // here we use the getSingleTask mutation by passing the id to this function..and this id coming from the browser url and got byusing the params() function...
  const task = data?.task;

  // console.log("undefined" ,data);

  if(isLoading){
    return(
      <div className='py-10'>
        <Loader/>
      </div>
    )
  }
  return (
    <div className='w-full flex flex-col gap-3 mb-4 overflow-y-hidden'>
      <h1 className='text-2xl text-gray-600 font-bold ml-2'>{task?.title}</h1>
      <Tabs tabs={TABS} setSelected={setSelected}> {/* here we use already created Tab component which is responsible to set the selected state by 0 or 1 based on when user click on the
      Task Detail or Activities/TimeLine tab and it also render these two tabs */}
        {selected === 0 ?  // now if selected===0 means Task Detail is selected then what should we render when user click on the TaskDetail that is inside this below div
        <>
          <div className='w-full flex flex-col md:flex-row gap-5 2xl:gap-8 bg-white rounded-2xl shadow-xl p-8 overflow-y-auto'>
            {/* Left Part Rendered */}
            <div className='w-full md:w-1/2 space-y-8'>
              <div className='flex items-center gap-5'>
                <div className={clsx("flex gap-1 items-center text-base font-semibold px-3 py-1 rounded-full",PRIOTITYSTYELS[task?.priority],bgColor[task?.priority])}>
                {/* here we use the different icon for the different priority and apply the background color and text color for different priority also  */}
                    <span className='text-lg'>{ICONS[task?.priority]}</span> {/* render the icon based on the priority */}
                    <span className='uppercase'>{task?.priority} priority</span> {/* render the priority like normal,medium,high... */}
                </div>
                <div className={clsx("flex items-center gap-2")}>
                  <div className={clsx("w-4 h-4 rounded-full",TASK_TYPE[task.stage])}/> {/* render the circle with differnt color based on differnt stage like completed,in-progress or todo */}
                  <span className='text-black uppercase'>{task?.stage}</span> {/* render the stage(text) */}
                </div>
              </div>
              <p className='text-gray-500'>
                Created At : {formatDate(new Date(task?.date))}{/* render the date */}
              </p>
              <div className='border-y flex items-center gap-8 p-4 border-gray-200'>
                <div className='space-x-2'> {/*space-x-2 means margin-left : 0.5rem (8px)...space-y-2 means margin-top : 0.5rem (8px) */}
                  <span className="font-semibold">Assets :</span>
                  <span>{task?.assets?.length}</span> {/* render the length of assets menas count */}
                </div>
                <span className='text-gray-400'> | </span>
                  <div className='space-x-2'>
                      <span className='font-semibold'>Sub-Task :</span>
                      <span>{task?.subTasks?.length}</span> {/* render the subTask's length means count of the subTask */}
                  </div>
              </div>
              <div className='space-y-4 py-6'>
                <p className='text-gray-600 fonr-semibold text-sm'>
                  TASK TEAM
                </p>
                <div className='space-y-3'>
                  {task?.team.map((m,index) => (
                    // just render the task team with it;s blue icon with first two letter capital..
                    <div key={index} className='flex gap-4 py-2 items-center border-t border-gray-200'>
                        <div className='w-10 h-10 rounded-full text-white flex items-center justify-center text-sm -mr-1 bg-blue-600'>
                          <span className='text-center'>{getInitials(m?.name)}</span>
                        </div>
                        <div>
                          <p className='text-lg font-semibold'>{m?.name}</p>{/* name of the user */}
                          <span className='text-gray-500'>{m?.title}</span>{/* title of the user(like ex. UX Designer) */}
                        </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className='space-y-4 py-6'>
                <p className='text-gray-500 font-semibold text-sm'>
                  SUB-TASKS
                </p>
                <div className='space-y-8'>
                  {task?.subTasks?.map((el, index) => (
                    // render the all subTask through loop and render the icon "MdtaskAlt" and render the Date and Tag(like ex. Website App)and below this we render the title like ex.Blog App Admin Dashboard
                    <div key={index} className='flex gap-3'>
                        <div className='w-10 h-10 flex items-center justify-center rounded-full bg-violet-200'>
                          <MdTaskAlt className='text-violet-600' size={26} />
                        </div>
                        <div className='space-y-1'>
                          <div className='flex gap-2 items-center'>
                            <span className='text-sm text-gray-500'>
                              {new Date(el?.date).toDateString()}
                            </span>
                            <span className='px-2 py-0.5 text-center text-sm rounded-full bg-violet-100 text-violet-700 font-semibold'>
                              {el?.tag}
                            </span>
                          </div>
                          <p className='text-gray-700'>{el?.title}</p>
                        </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* RIGHT Part rendered with the same page*/}
            <div className='w-full md:w-1/2 space-y-8'>
              <p className='text-lg font-semibold'>ASSETS</p>
              <div className='w-full grid grid-cols-2 gap-4 overflow-y-auto h-[600px] overflow-x-auto'> {/* here we set the fixed height for this because we want to make this scroll when it overflow from this height..so use "overflow-y-auto" */}
                {task?.assets?.map((el,index) => (
                  // loop through the assets associated with the task and render the img tag with beutiful transition...
                  <img key={index} src={el} alt={task?.title} className='w-full rounded-lg h-28 md:h-36 2xl:h-52 cursor-pointer transition-all duration-500 hover:scale-95 '/> // explore the hover:scale-95 if we use the scale greater then the 100 then it popout 
                  //and if we use the scale less then 100 then it pop-in.
                ))}
              </div>
            </div>
          </div>
        </> :
        <>
        {/* now for render the Activities/Timeline tab we render this below component go there and see concept */}
          {(task.team.some(member => member._id === user._id)==true && user.isAdmin==false) || (user.isAdmin) ? <Activities activity={task?.activities} task={task} id={id} refetch={refetch}/> : 
            <div className='flex items-center justify-center mt-52'>
              <span className='bg-blue-600/10 px-3 py-1.5 rounded-xl text-blue-700 font-medium'>You don't have permission to access this page/tab! 😐 </span>
            </div>
          }
          {/*  how this is works when user is there in the team for that particular task and he is not admin then it can access
          this activity page or if user is admin then obvisiosly he can access this page but if user is not admin and not part of the team of that task then he can not access the activity tab for that task
          so for that render the different page which show that you are not allow to see this page 
          (task.team.some(member => member._id === user._id)==true && user.isAdmin==false) || (user.isAdmin)  so for this we use this method
          */}
          
        </>
        }
      </Tabs>
    </div>
  )
}

const Activities = ({activity,id,refetch,task}) => {
  const [selected, setSelected] = useState(act_types[0]); // first of all we set the selected state with the first element fo the act_type array which is started..
  const [text, setText] = useState("");
  // const isLoading = false;
  const[postTaskActivity,{isLoading}] = usePostTaskActivityMutation(); // to post the task activity we use the postTaskActivityMutation which we created already in the taskApiSlice.js
  // so in backend we create the task that time we already append the default text and type=assigned to the activity array.

  const {user} = useSelector((state) => state.auth);

  const handleSubmit = async () => {
    // now when user click on the Add activity button then this function is called out..
    try {
      const activityData = {
        type: selected?.toLowerCase(),
        activity:text,
      }; // here we create the activityData by passing the type which is user selected and activity to text which user entered..
      // and these type is stored in the selected state and text of the textArea also stored in the text state
      
      const result = await postTaskActivity({data:activityData,id}).unwrap(); // now pass the activityData as a data to the backend as a request's body...

      setText(""); // and set text to empty for new text...
      toast.success(result?.message,{style:toastStyle});
      refetch(); // refresh the data base and this refethc is coming from the "usegetSingleTaskQuery" mutation
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error,{style:toastStyle});
    }
  };
  // inside this component we render the Card component....which is for the render the left side of this Activities tab..
  // to show the commented,completed,started activities... 
 const Card = ({ item,isConnected }) => {
  return (
    <div className='flex space-x-4'>
      <div className='flex flex-col items-center flex-shrink-0'>
        <div className='w-10 h-10 flex items-center justify-center'>
          {TASKTYPEICON[item?.type]} {/* render the icon based on different icon */}
        </div>
          {isConnected && <div className='w-0.5 bg-gray-200 h-full'/>} {/* responsible for to render the staight line between two activities when isConnected=true */}
      </div>
      <div className='flex flex-col gap-y-1 mb-8'>
          <p className='font-semibold'>{item?.by?.name}</p> {/* name of the user who is commented */}
          <div className='text-gray-500 space-y-2'>
            <span className='capitalize'>{item?.type}</span>{/*like started,commented,completed render this */}
            <span className='text-sm'> {moment(item?.date).fromNow()}</span>{/* render the human readable date */}
          </div>
          <div className='text-gray-700'>{item?.activity}</div>{/* what user commented is showing in this div... */}
        </div>
    </div>
  );
  };
// {console.log("task from taskdetail",task,user._id)}
// {console.log("hinata",task.team.includes(user._id))}
// {console.log("find",)}
 return(
    <div className='w-full flex gap-10 2xl:gap-20 h-full px-10 py-8 bg-white shadow-xl rounded-2xl justify-bewtween'>
      <div className='w-full md:w-1/2 h-[500px] overflow-y-auto'>
        <h4 className='text-gray-700 bg-gray-50 py-3 rounded-xl pl-3 bg-opacity-95 font-bold text-xl mb-5 sticky top-0'>Activities</h4> {/* render the title Activities */}
        <div className='w-full'>
         {/* now go through the loop by each activity and render the Card component which we created for the render the left side of the Activities tab  */}
          {activity?.map((el,index) => (
            <Card key={index} item={el} isConnected={index < activity.length - 1}/> 
            // let's consider the out activity length is 3 then we want to render the 2 straight line to connect these three activities 
            // and our max index is 2(0 base indexing)...now when we on last element of this activity array means at index=2 then it check
            // index(2) < activity.length(3) - 1 which is false so for the last element it is no rendered this straight line..and render only 2 straight line
            // when index < activity.length - 1 become true so isConnected become true and when it true then we render this staright lines...
          ))}
        </div>
      </div>
      {/* to render the right part of the Activities timeline */}
      <div className='w-full md:w-1/2'>
        <h4 className='text-gray-600 font-semibold text-lg mb-5'>
          Add Activity{/* first render the title Add Activity */}
        </h4>
        <div className='w-full flex flex-wrap gap-5'> {/* flex-wrap automatically wrap the child content if the content goes outside the main div and content go to the next line automatically  */}
          {act_types?.map((item,index) => (
            // go through the different activities type and for each types of activity render the one check box with it's name(like Started,Completed,In Progress, etc...)
            <div key={item} id={index} className='flex gap-2 items-center'>
              <input type="checkbox" className='w-4 h-4'
                      checked={selected === item ? true : false}
                      onChange={(e) => setSelected(item)}/> 
                      {/* The onChange event is triggered when the user clicks on the checkbox.
                          This event handler sets the selected state to the current item.
                          As a result, the condition selected === item becomes true.
                          When this condition is true, checked is set to true, which causes the checkbox to be checked automatically. */}
              <p>{item}</p>
            </div>
          ))}
          <textarea
            rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)} // render the textArea and onChange means whatever user type this onchange event is triggered and it set the state variable text by this text which is written inside this text-box
             // and this text is used as value={text} for this text-area
            placeholder='Type ......'
            className='bg-white w-full mt-10 border border-gray-300 outline-none p-4 rounded-2xl focus:ring-2 ring-blue-300'/>
            { isLoading ? (
              // if isLoadin is true then render this Loader component which we created already...otherwise render the Submit Button useing the Button Component which we also already created..
              <Loader/>
            ) : (
              <Button type="button" label="Submit" onClick={handleSubmit} className="bg-blue-600 text-white rounded"/> 
              // we call the handleSubmit button when we click on this submit button.
            )}
        </div>
      </div>
    </div>
  );
}

export default TaskDetails