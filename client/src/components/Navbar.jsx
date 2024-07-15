import React, { useState } from 'react'
import { MdOutlineSearch } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { setOpenSidebar } from '../redux/slices/authSlice';
import UseAvatar from './UseAvatar';
import { setSearchText } from '../redux/slices/searchSlice';
import NotificationPanel from './NotificationPanel';

const Navbar = () => {
const { user } = useSelector((state) => state.auth);
const dispatch = useDispatch();

const handleChange = (e) => {
  // when any change happen on the search bar then this function got triggered and is dispatch one function which we created in the redux slice..see that function
  // searchSlice.js
    dispatch(setSearchText(e.target.value));
};

  return (
    <>
    <div className='flex w-full justify-between items-center bg-white px-4 py-3 2xl:py-4 sticky z-10 top-0 rounded-xl'>
        <div className='flex gap-4'>
            <button
              onClick={() => dispatch(setOpenSidebar(true))} // here when user click on this three line then we set the setOpenSidebar=true which we created in the authSlice.js file
              // and if we changed here then it is change for the entire app so redux tool kit used for the effective state management
              className='text-2xl text-gray-500 block md:hidden'
              >
                ☰
              </button>
              <div className='w-56 2xl:w-[400px] flex items-center py-2 px-3 gap-2 rounded-full bg-[#f3f4f6]'>
                <MdOutlineSearch className='text-gray-500 text-xl' />
                <input type="text" placeholder='search....' className='flex-1 outline-none bg-transparent placeholder:text-gray-500  text-gray-800' 
               // Set the value of the input to the state variable
                onChange={handleChange} // Add an onChange event handler to update the redux state variable
                />
                {/* The flex-1 utility class in Tailwind CSS makes an element flexible, allowing it to grow and fill the remaining available space in its flex container. 
                It ensures the element shares space equally with other flexible items and adapts dynamically to the container's size changes(like in mobile or laptop devices). */}    
              </div>
        </div>
        <div className='flex items-center gap-2'>
            <NotificationPanel/>
            <UseAvatar/>
        </div>
    </div>
    </>
  )
}

export default Navbar