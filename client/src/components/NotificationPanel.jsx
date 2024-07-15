import React from 'react'
import { Popover, Transition } from "@headlessui/react";
import moment from "moment";
import{ Fragment, useState } from "react";
import { BiSolidMessageRounded } from "react-icons/bi";
import { HiBellAlert } from 'react-icons/hi2';
import { IoIosNotificationsOutline } from "react-icons/io";
import {Link} from "react-router-dom";
import ViewNotification from "./ViewNotification.jsx"
import { useGetNotificationsQuery, useMarkNotiAsReadMutation } from '../redux/api/userApiSlice';

// this is the tempory data nothing more then that
// const data = [
//     {
//       _id: "65c5bbf3787832cf99f28e6d",
//       team: [
//         "65c202d4aa62f32ffd1303cc",
//         "65c27a0e18c0a1b750ad5cad",
//         "65c30b96e639681a13def0b5",
//       ],
//       text: "New task has been assigned to you and 2 others. The task priority is set a normal priority, so check and act accordingly. The task date is Thu Feb 29 2024. Thank you!!!",
//       task: null,
//       notiType: "alert",
//       isRead: [],
//       createdAt: "2024-02-09T05:45:23.353Z",
//       updatedAt: "2024-02-09T05:45:23.353Z",
//       __v: 0,
//     },
//     {
//       _id: "65c5f12ab5204a81bde866ab",
//       team: [
//         "65c202d4aa62f32ffd1303cc",
//         "65c30b96e639681a13def0b5",
//         "65c317360fd860f958baa08e",
//       ],
//       text: "New task has been assigned to you and 2 others. The task priority is set a high priority, so check and act accordingly. The task date is Fri Feb 09 2024. Thank you!!!",
//       task: {
//         _id: "65c5f12ab5204a81bde866a9",
//         title: "Test task",
//       },
//       notiType: "message",
//       isRead: [],
//       createdAt: "2024-02-09T09:32:26.810Z",
//       updatedAt: "2024-02-09T09:32:26.810Z",
//       __v: 0,
//     },
//   ];
  // this is the ICONS array based on the tag "alert" and "message" it generate the icon with proper classes
const ICONS = {
    alert: (
      <HiBellAlert className='h-5 w-5 text-gray-600 group-hover:text-indigo-600' />
    ),
    message: (
      <BiSolidMessageRounded className='h-5 w-5 text-gray-600 group-hover:text-indigo-600' />
    ),
  };
const NotificationPanel = () => {
    const [open, setOpen] = useState(false);
    const [selected, setselected] = useState(null);

    const { data,refetch } = useGetNotificationsQuery(); // we get the data from the backend using this getNotification query function...
    const [markAsRead] = useMarkNotiAsReadMutation(); // also we get the marknotification mutation for to mark the notification as a read

    const readHandler = async (type,id) => {
        await markAsRead({ type, id}).unwrap(); // when user click on the mark as all read or any notification then this function is called out
        // in this function i pass the notifiacation id if user click on the particular notification and pass the id="" if user click on the mark as all read so in this case this user is added all the notification document's isRead array at the backend side

        refetch();
    }; 
    const viewHandler = async (el) => {
      // when user click on the notification button then we open the popover panel..and in this panel if we click on the any notification then
      // i make the open state to true which is open the another dialog box and pass the current notification id to the read handler...
        setselected(el); // set the selected state with the current notification details...
        readHandler("one", el._id);
        setOpen(true);
    };

    // this is the array of to render the cancel and mark all read button
    const callsToAction = [
        {
            name:"Cancel",
            href:"#",
            icon:""
        },
        {
            name:"Mark All Read",
            href:"#",
            icon:"",
            onClick:() => readHandler("all",""), // this is the function to read the all notification
        }
    ]
  return (
  <>
    <Popover className="relative">
        <Popover.Button className="inline-flex items-center outline-none"> {/*this is the notification button so used Popover.Button headless UI class */}
        <div className='w-8 h-8 flex items-center justify-center text-gray-800 relative'>
            <IoIosNotificationsOutline className='text-2xl' />
            {data?.length > 0 && (
              <span className='absolute text-center top-0 right-1 text-sm text-white font-semibold w-4 h-4 rounded-full bg-red-600'>
                {data?.length} {/*this span is for to show the notification count */}
              </span>
            )}
          </div>
        </Popover.Button>
        <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
              // apply some transition while open the NotificationPanel...
            >
            <Popover.Panel className='absolute -right-16 md:-right-2 z-10 mt-5 flex w-screen max-w-max  px-4'>
            {/* this is the popover panel to show the relative notification in the panel */}
                {({ close }) => // this is the close function provided by the headless UI
                // when user click on the notification button then it automatically open the PopoverPanel with it's content
                // and this close function is used to close the panel programatically when you needed...but when user click on the notification button then 
                // it also close the PopoverPanel this functionality is provided by the headless UI internally...
                data?.length > 0 && (
                    <div className='w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5'>
                    <div className='p-4'>
                        {data?.slice(0, 5).map((item, index) => (
                            // we run through 5 element of the data array...and take it item and index
                        <div
                            key={item._id + index}
                            className='group relative flex gap-x-4 rounded-lg p-4 hover:bg-gray-50'
                        >
                            <div className='mt-1 h-8 w-8 flex items-center justify-center rounded-lg bg-gray-200 group-hover:bg-white'>
                            {ICONS[item.notiType]} {/*it is the notificationType property of the every element of the data array and based on this
                            string(notiType) we have the ICONS array and it render the button from this ICONS array...means if it is the item.notitype = "alert" then render the alert icon from
                            the ICONS array */}
                            </div>

                            <div
                            className='cursor-pointer'
                            onClick={() => viewHandler(item)} // implementaion remaining
                            >
                            <div className='flex items-center gap-3 font-semibold text-gray-900 capitalize'>
                                <p> {item.notiType}</p>
                                <span className='text-xs font-normal lowercase'>
                                {moment(item.createdAt).fromNow()} {/*is used to display a human-readable representation of how long ago the notification was created, based on its createdAt timestamp.
                                how : it take the createdAt poperty of the array's json element  and this is parse into the moment object and it called the fromNow() function which is responsible
                                to create human readable time like 2 min ago,2 hours ago from consider the gap betwwen the current time and created time */}
                                </span>
                            </div>
                            <p className='line-clamp-1 mt-1 text-gray-600'>
                            {/*line-clamp-1 is  to truncate a block of text after a specific number of lines.here it show only "1" line */}
                                {item.text} {/*one of the json element property of the data array */}
                            </p>
                            </div>
                        </div>
                        ))}
                    </div>

                    <div className='grid grid-cols-2 divide-x bg-gray-50'> {/* className = "divide-x" */}
                        {callsToAction.map((item) => (
                        <Link
                            key={item.name} // render the name of the current item whether it is the "cancel" or "MarkAllRead"
                            onClick={
                            item?.onClick ? () => item.onClick() : () => close() // now it check if the item has the "onclick" function when user click on the one of item from these two 
                            // if yes then call that onClick() function
                            // otherWise call the close() function which close the PopoverPanel..this is the point where i can use this "close" function(as per my need) 
                            // because i want to close this panel when user click on the "cancel" button because it has not the onClick function to read the messages..
                            }
                            className='flex items-center justify-center gap-x-2.5 p-3 font-semibold text-blue-600 hover:bg-gray-100'
                        >
                            {item.name}
                        </Link>
                        ))}
                    </div>
                    </div>
                )
                }
        </Popover.Panel>
    </Transition>
    </Popover>
    <ViewNotification open={open} setOpen={setOpen} el={selected}/> {/* we passed the "selected" prop as the "el" 
      
    */}
  </>
  )
}

export default NotificationPanel