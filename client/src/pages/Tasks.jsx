import React, { useEffect, useState } from "react";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { useParams } from "react-router-dom";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import Tabs from "../components/Tabs";
import TaskTitle from "../components/TaskTitle";
import BoardView from "../components/BoardView";
// import { tasks } from "../assets/data";
import Loader from "../components/Loader.jsx"
import { TASK_TYPE } from "../utils";
import Table from "../components/task/Table";
import AddTask from "../components/task/AddTask";
import { useGetAllTaskQuery } from "../redux/api/taskApiSlice";
import { useSelector } from "react-redux";
// import Table from "../components/task/Table";
// import AddTask from "../components/task/AddTask";

const TABS = [
  {title:"Board View",icon:<MdGridView/>},
  {title:"List View",icon:<FaList/>},
];

const Tasks = () => {
  const searchText = useSelector((state) => state.search.text);
  // The useSelector hook from react-redux is used to access the state from the Redux store. In this line, 
  // it retrieves the "text" property from the "search"(which we given the name as search in the seachSlice) slice of the state and assigns it to the searchText constant. 
  // This allows the component to use the current value of text from the Redux store. 
  // Whenever the text property in the search slice changes, the component will automatically re-render to reflect the new value.
  // this value changes in the navbar.jsx file using the reducer function provided by the redux store and based on this we passed this search query
  // to the getAllTask mutation as a body of the requests and in backend we have the logic to search the task based on this query and return the response to 
  // the frontend...
  // console.log("text",searchText);

  // if(searchText === undefined) searchText="";
  const params = useParams();

  const [selected,setSelected] = useState(0);
  const[open,setOpen] = useState(false);
  // const [loading, setloading] = useState(false);
  // console.log(params);
  // we have route like in-progress/:status,todo/:status,completed/:status...
  // so when user click on the any button from among these 3 the he/she headover to the
  // in-progress/in-progress,completed/completed,todo/todo so our status becomes in-progress,completed,todo accordingly 
  //so that status we use it here...and if status is not there like "/tasks" this route then simply return the empty string..
  const status = params?.status || "";

  // {console.log(params)}
  const{data,isLoading,refetch} = useGetAllTaskQuery({
    strQuery: status, // status is like the todo,completed or in-progress
    // {TASK_URL}?stage=${strQuery}&isTrashed=${isTrashed}&search=${search} on this URL status(strQuery) passed as the stage which is deproped at the backend side from the URL as a query..
    // and related to this it find the tasks and render the tasks..if we at the complete/complete page then it render only comoleted task measn it find the task in the
    // data base which has the isTrashed=false and stage=complete..like wise it works

    isTrashed:"", // here if we pass the false as a boolean and backend if we assume that it treat this value as the false then no it is not treated as a false...which we used logic
    // so here if we pass the empty string then if we passed to the backend as a body:data then it is treated as the false and which task has the isTrashed=false that should be rendered and send back
    // to frontend this tasks has the isTrashed=false and also there is task which has the isTrashed:true is also there in the data base but it is not shown here
    // it is shown at the trashed page
    search:searchText, // this is not used
    });
    // so we pass the status
    return isLoading ? ( 
    <div className="py-10">
      <Loader/> {/* if isLoading is true then we load the <loader> component... */}
    </div> 
  ) : (
    // if loading is false then we should render the whole below content..
  <div className="w-full">
    <div className="flex items-center justify-between mb-4">
      <Title title={status ? `${status} Tasks` : "Tasks"} /> {/* we render the title for different dynamic status like completed Tasks,in-progress Tasks,etc.. */}
      {
        !status && <Button onClick={() => setOpen(true)} label="Create Task" icon={<IoMdAdd className="text-lg"/>} // when user click on this createTask button then it make the open state to "true"...
        // which is also passed over to the Button component..and when that button got clicked this open state become true...
          className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-xl pr-5 py-2 2xl:py-2.5"
        /> 
        // if status is not there means we on the "/Tasks" page then render this button "createTask"..using already created Button Component..
        // here this <Tasks> component render for the only this routes : /Tasks,/in-progress/:status,/todo/:status,/completed/:status
        // for "/team" and "/trash" route we render the differnt .jsx file
      }
    </div>
    <div>
      <Tabs tabs={TABS} setSelected={setSelected}> {/* this component is created to give functionality when board view get clicked i render the
      Boardview.jsx component and when user click on the listview then Table.jsx file rendered.. */}
        {!status && (
          // also if status is not there means we at the "/Tasks" route which has no dynamic "/:status" there..then render this three titles...
          <div className="w-full flex flex-row gap-3 md:gap-x-12 py-4 justify-between">
            <TaskTitle label="To Do" className={TASK_TYPE.todo}/> {/* here we pass the addition css as a prop which is needed for different type of task */}
            <TaskTitle label="In Progress" className={TASK_TYPE["in-progress"]}/>
            <TaskTitle label="Completed" className={TASK_TYPE.completed}/>
          </div>
        )}
        {/* so for boardview and listview above three title remain static and rendered the same as it is */}
        {selected === 0 ? <div><BoardView tasks={data?.tasks}/></div> : <div><Table tasks={data?.tasks}/></div>}
        {/* when selected==0 when user click on the BoardView Tab then we call this setSelected function and make it's value=0 so that time
        we should render the <BoardView> component and other vise when selected==1 then render the <Table>(for "ListView") component */}
      </Tabs>
      <AddTask open={open} setOpen={setOpen} />
      {/* so when this open state become true then it open the Dialog box which is written over in the DialogWrapper.jsx file.. */}
    </div>
  </div>
  )
}

export default Tasks