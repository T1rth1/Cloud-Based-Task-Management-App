import Login from './pages/Login'
import TaskDetails from './pages/TaskDetails'
import Dashboard from "./pages/Dashboard"
import Tasks from "./pages/Tasks"
import Trash from "./pages/Trash"
import Users from "./pages/Users"
import {Toaster} from "sonner"
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import { setOpenSidebar } from './redux/slices/authSlice'
import { Fragment, useRef } from 'react'
import { IoMdClose } from "react-icons/io";
import clsx from 'clsx'
import { Transition } from '@headlessui/react'

function Layout (){
  const { user } = useSelector((state) => state.auth);

  const location = useLocation();
  return true ? (
    <div className='w-full h-screen flex flex-col md:flex-row'>
      <div className='w-1/5 h-screen bg-white sticky top-0 hidden md:block'>
      {/* The sidebar is hidden on small screens (hidden) and on medium and larger screens it's display is block(md:block) and takes up the 1/5 width..  */}
        <Sidebar/>
      </div>
        <MobileSidebar/> 
        {/* when it goes in this element then it display the whole div when the screen size is small
        because we apply the md:hidden means on medium and large screen size this MobileSidebar is hidden */}
      <div className='flex-1 overflow-y-auto no-scrollbar'>
        <Navbar/>
        <div className='p-4 2xl:px-10'>
          <Outlet /> {/*it render the routes dynamically when we headover to the different endPoints which is mentioned below..
          but sideBar is remain static only right side pages will rendered differentlly based on your different end points */}
        </div>
      </div>
    </div>
  ):(
    <Navigate to='/log-in' state={{ from: location }} replace />
    // this is very usefull concept if user is not authenticated and it tries to the access protected route
    //then it redirects to the login page and passes that protected route's or page's location in the state.
    // after the user logs in, i can use this state to naviaget them back to the intended page( protected route or page)
  );
}
const MobileSidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.auth);
  // const mobileMenuRef = useRef(null);
  const dispatch = useDispatch();

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  }; // this is the function to make the state "isSidebarOpen" value to false

  return (
    <>
      <Transition
        show={isSidebarOpen} // when isSidebarOpen is true then this transition happen
        as={Fragment} // it load the below fragment which is "{ }" this bracket called the fragment
        enter="transition-opacity transition-transform duration-700" // this is the duration for the opening transition
        enterFrom="opacity-0 translate-x-full" // enter into the transition from
        enterTo="opacity-100 translate-x-0" // enter to sidebar then transition
        leave="transition-opacity transition-transform duration-500" // Increased duration for closing transition
        leaveFrom="opacity-0 translate-x-0"
        leaveTo="opacity-100 translate-x-full"
      >
          {<div
            className={clsx(
              "md:hidden w-full h-full bg-black/40",
              isSidebarOpen ? "translate-x-0" : "translate-x-full"
            )}
            onClick={() => closeSidebar()}
          >
          {/*on larger and medium screen size this MobileSidebar is hidden */}
            <div className='bg-white w-3/4 h-full'>
              <div className='w-full flex justify-end px-5'>
                <button
                  onClick={() => closeSidebar()}
                  className='flex justify-end items-end mt-2'
                >
                  <IoMdClose size={25} />
                </button>
              </div>

              <div className='-mt-10'>
                <Sidebar />
              </div>
            </div>
          </div>
          }
      </Transition>
    </>
  );
};
function App() {

  return (
  <main className='w-full min-h-screen bg-[#f3f4f6]'>
    <Routes>
        <Route element={<Layout/>}>
          <Route path='/' element={<Navigate to='/dashboard'/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/tasks' element={<Tasks/>}/>
          <Route path='/completed/:status' element={<Tasks/>}/>
          <Route path='/in-progress/:status' element={<Tasks/>}/>
          <Route path='/todo/:status' element={<Tasks/>}/>
          <Route path='/team' element={<Users/>}/>
          <Route path='/trashed' element={<Trash/>}/>
          <Route path='/task/:id' element={<TaskDetails/>}/>
        </Route>
        <Route path='/log-in' element={<Login/>}/>
    </Routes>
        <Toaster richColors  />
  </main>
  )
}

export default App
