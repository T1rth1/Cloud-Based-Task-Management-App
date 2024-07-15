import React, { useEffect } from 'react'
import {
  MdAdminPanelSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu";
import { FaNewspaper,FaUsers } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import moment from "moment";
import { summary } from '../assets/data';
import clsx from "clsx";
import Chart from '../components/Chart';
import { BGS, PRIOTITYSTYELS, TASK_TYPE, dateFormatter, formatDate, getInitials } from '../utils';
import UserInfo from '../components/UserInfo';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetDashboardStatsQuery } from '../redux/api/taskApiSlice';
import Loader from '../components/Loader';


// this is for the left side task table...
const TaskTable = ({tasks}) => {
  // const { user } = useSelector((state) => state.auth);

  const ICONS = { // this is the ICONS array to show the differnt arrow based on priority of the task
    high: <MdKeyboardDoubleArrowUp/>,
    medium:<MdKeyboardArrowUp/>,
    low:<MdKeyboardArrowDown/>,
  }
  const TableHeader = () => (
    // creating a table header using the <thead> tag and give a title to this table  
    <thead className="border-b border-gray-300">
    {/* this border-b used to do the line at the bottom of the each row */}
      <tr className='text-black text-left'>
        <th className='py-2'>Task Title</th>
        <th className='py-2'>Priority</th>
        <th className='py-2'>Team</th>
        <th className='py-2 hidden md:block'>Created At</th>
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
              <p className='text-base text-black'>{task.title}</p> {/* this is the title of the task... */}
            </div>
          </td>
          <td className="py-2">
            <div className='flex gap-1 items-center'>
              <span className={clsx('text-lg',PRIOTITYSTYELS[task.priority])}>{ICONS[task.priority]}</span>
              {/* also we have the PRIORITYSTYLE json which contain the differnt color of the arrows based on the priority..make sure you import the PRIORITYSTYELS import from the data.js file */}
              {/* based on priority we render the differnt icon which is already defined in the ICONS array */}
              <span className='capitalize'>{task.priority}</span> {/* task Prority like medium,high,low */}
            </div>
          </td>
          <td className='py-2'>
            <div className='flex'>
              {task.team.map((m,index) => (
                <div className={clsx("w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",BGS[index%BGS.length])}>
                {/* we consider the four diffent color to render the user icon consecutively with differnt color so we take the mod with the index of the user...
                so index is consequitive for the consequtive users and this index after taking the mod the value of the "index%BGS.length" is from 0 to 3
                so it render the differnt color for all consequitive user*/}
                  <UserInfo user={m}/> {/* how many user assosiated with this task we go through the loop and render all of the user in form of the icon  */}
                </div>
              ))}
            </div>
          </td>
          <td className='py-2 hidden md:block '>
              <span className='text-base text-gray-600'>
                {/* {alert(task?.createdAt)} */}
                {/* {dateFormatter(task?.date)} */}
                {moment(task?.createdAt).fromNow()} {/* to create the human readable format from the current date to passing the crating date of the task..like ex: 5 days ago,2 hours ago */}
              </span>
          </td>
        </tr>
 );
 return (
    <>
      <div className='w-full md:w-2/3 bg-white px-2 md:px-4 pt-4 pb-4 shadow-md rounded-2xl'>
      {/* here we already showing the last 10 task so no need of scrollbar here */}
        <table className='w-full'>
          <TableHeader /> {/* render the TableHeader component fisr as per the hierarchy in the <table> tag */}
          <tbody>
            {tasks?.map((task, id) => (
              // we run a loop for each task and render the TableRow for the each task...with different unique id and passing over a task as a prop to the <TableRow> component
              <TableRow key={id} task={task} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

// this is for the right side user table...
const UserTable = ({users}) => {
  const TableHeader = () => (
    // creating a table header using the <thead> tag and give a title to this table  
    <thead className="border-b border-gray-300">
      <tr className='text-black text-left'>
        <th className='py-2'>Full Name</th>
        <th className='py-2'>Status</th>
        <th className='py-2'>Created At</th>
      </tr>
    </thead>
  );
  const TableRow = ({user}) => {
    // creating the one row of the user table...
    // and in this <tr> tag we have the <td> tag which has userIcon following to it's first two letter of tne user name
    // and we have the stats user active or not and last we have the created date..and we use moment to form a human readable format of the date
    return(
    <tr className='border-b border-gray-300 text-gray-600 hover:bg-gray-400/10'>
      <td className='py-2'>
        <div className='flex items-center gap-3'>
          <div className='w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-violet-700'>
            <span className='text-center'>{getInitials(user?.name)}</span>
          </div>
        </div>
      </td>
      <td>
        <p className={clsx("w-fit px-3 py-1 rounded-full text-sm",user?.isActive ? "bg-blue-200" : "bg-yellow-100")}>
          {user?.isActive ? "Active" : "Disabled"}
          {/* here if user is active then it render the active button or tag and it's color is blue and if user is disabled then
          it render the disabled button or tag and it's color is yellow */}
        </p>
      </td>
      <td className='py-2 text-sm'>{moment(user?.createdAt).fromNow()}</td>
    </tr>
    );
  }
  return (
    <>
      <div className='w-full md:w-1/3 bg-white h-[400px] overflow-y-auto px-2 md:px-6 py-4 shadow-md rounded-2xl'>
      {/* to add scrolling functionality we should define the height so here we define the height of this UserTable so if it is go
      beyond this height then scrollbar is appeared..no-scrollbar is a own made css in index.css file */}
        <table className='w-full mb-5'>
          <TableHeader /> {/* render the TableHeader component fisr as per the hierarchy in the <table> tag */}
          <tbody>
            {users?.map((user, index) => (
              // we run a loop for each task and render the TableRow for the each task...with different unique id and passing over a task as a prop to the <TableRow> component
              <TableRow key={index + user?.id} user={user} />
              // we run go through each user using a loop and render the all user which present in our backend data
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
{/* 
// this structure is used to create the whole above table and followed below heierachy for creating above 

table here..
// "thead" is the tableHead
// "tr" is stands for tableRow
//  "th" is stands for table head cell
// "td" stands for table data cell
<table>
  <thead>
    <tr>
      <th>Task Title</th>
      <th>Priority</th>
      <th>Team</th>
      <th>Created At</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Design Homepage</td>
      <td>High</td>
      <td>Design Team</td>
      <td>2024-01-01</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="4">End of Tasks</td>
    </tr>
  </tfoot>
</table> */}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth); // to understand this concept see the Login.jsx file
  useEffect(() => {
    !user && navigate("/log-in");
},[]) // it check if the user don't exist in the local storage then navigate to the log-in route back..

  const {data,isLoading} = useGetDashboardStatsQuery(); // this is the get query for Dashboard staticstics which we already created and this query 
  // make the api request on the particular backend path to get the data and in backend on this path if any api call occurs frm the frontend then we call th 
  // function in which we have the logic for to get the dashboard related data
  // console.log("from dashboard",data);
  if(isLoading){
    // if the current api call in process then this isLoading state is true then we load this loader..and this isLoading is provided by the redux tool kit it self...
    return (
      <div className='py-10'>
        <Loader/>
      </div>
    )
    };
    // so now totals become the array which has the three strings with it's count..
    // see the tasks array element by console logging the data
    // console.log(data?.tasks)
  const totals = data?.tasks; // take the data from the data we get from the backend
  // {console.log("from dashboard",data?.tasks)}
  const stats = [
    {
      _id: "1",
      label: "TOTAL TASK",
      total:  data?.totalTasks,
      icon: <FaNewspaper />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "COMPLTED TASK",
      total: totals?.["completed"] || 0,
      icon: <MdAdminPanelSettings />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "3",
      label: "TASK IN PROGRESS ",
      total:  totals?.["in-progress"] || 0,
      icon: <LuClipboardEdit />,
      bg: "bg-[#f59e0b]",
    },
    {
      _id: "4",
      label: "TODOS",
      total: totals?.["todo"] || 0, // this total is a numaric value come from the data.js file from summary json object
      icon: <FaArrowsToDot />,
      bg: "bg-[#be185d]",
    },
  ];
  const Card = ({label,count,bg,icon}) => {
  // const total = totals["completed"] + totals["in-progress"] + totals["todo"]
    return (
      <div className='w-full h-32 bg-white p-5 shadow-md rounded-2xl flex items-center justify-between'>
        <div className='h-full flex flex-1 flex-col justify-between'>
          <p className='text-base text-gray-600'>{label}</p>
          <span className='text-2xl font-semibold'>{count}</span>
          <span className='text-sm text-gray-400'>{`${count} last month`}</span>
        </div>
        <div className={clsx("w-10 flex items-center h-10 rounded-full justify-center text-white",bg)}>
        {/*what is background color passed for that particular icon is combined with this css classes and 
        for different icon different bg are there like wise it has differnt count and label also which we passed as a prop
        and deprop here and making use of it */}
          {icon}
        </div>
      </div>
    )
  }
  return (
    <div className='py-4'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
        {
          stats?.map(({icon, bg, label, total }, index ) => (
            // here we go through each element of the stats..and generate the 4 different card
            // which contain the icon,bg,label,count...based on this we created one card
            <Card 
              key={index}
              icon={icon}
              bg ={bg}
              label={label}
              count={total}
              />
          ))
        }
      </div>
      <div className='w-full bg-white my-16 p-4 rounded-2xl shadow-md'>
        <h4 className='text-xl text-gray-600 font-semibold'> Chat by Priority</h4>
        <Chart data={data?.graphData}/> {/* also we create the graphData at the backend side see the dashboardStatictics function in the taskController.jsx */}
      </div>
      <div className='w-full flex flex-col md:flex-row gap-4  2xl:gap-10  py-8'>
        {/*left */}
        <TaskTable tasks={data?.last10Task}/> {/* now here it create the table by passing the las10Task as a tasks prop to the TaskTable component and this data also we prepare at the backend side see that function 
        for logic how we get this data from the data base */}
        {/*right*/}
        {/* {console.log("from dashboar",data)} */}
        <UserTable users={data?.users}/>{/* same for this */}
      </div>
    </div>
  )
}

export default Dashboard

// coming to the chart part to make a chart....continue.....