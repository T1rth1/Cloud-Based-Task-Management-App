import React from 'react'
import { Dialog } from "@headlessui/react";
import ModalWrapper from './ModalWrapper';
import { FaQuestion } from 'react-icons/fa';
import Button from "./Button.jsx"
import clsx from 'clsx';


export default function ConfirmatioDialog({ open,setOpen,msg,setMsg = () => {},onClick = () => {},type,setType = () => {},}) 
{
  // here we deprop the many onClick function and state variables.....
  const closeDialog = () => {
    setOpen(false);
    // setMsg(null);
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
       {/* we use the same ModalWrapper component to open the dialog box.. */}
        <div className='py-4 w-full flex flex-col gap-4 items-center justify-center'>
          <Dialog.Title as="h3" className="">
            <p className={clsx("p-3 rounded-full",type === "restore" || type==="restoreAll" ? "text-yellow-600 bg-yellow-100" : "text-red-600 bg-red-200")}>
            {/* if the type is the restore or restoreAll then we set the color of the question mark to yellow otherwise the color o the question mark set to red.. */}
              <FaQuestion size={60}/> {/* Question Mark icon */}
            </p>
          </Dialog.Title>
          <p className='text-center text-gray-500'>
            {msg} {/*this is the message passed to the <ConfirmationDialog> component and we deproped here and displayed here*/}
          </p>
          <div className='bg-white py-3 sm:flex sm:flex-row-reverse gap-4'>
            <Button
              type="button"
              className={clsx("px-8 text-sm font-semibold text-white sm:w-auto",type === "restore" || type==="restoreAll" ? "bg-yellow-600" : "bg-red-600 hover:bg-red-500")}
              onClick={onClick} // so when user click on this button then it called the deleteHandler one which we created at the Users.jsx file or TaskDialog.jsx file
              label={type === "restore" || type==="restoreAll" ? "Restore" : "Delete"}
            /> {/* here also we check the type==restore then label=="Restore" and set the button color to the yellow otherwise text==Delete and color is red */}
            <Button
              type="button"
              className="bg-gray-200 px-8 text-sm font-semibold text-gray-900 mr-1 sm:w-auto border"
              onClick={() => closeDialog()}
              label="Cancel"
            />{/* when user click on cancel button then it call the closeDialog() function in which we set the "open" state to false so it close the dialog box.. */}
          </div>
        </div>

      </ModalWrapper>
    </>
  );
}

// this below component is not used yet...
export function UserAction({open,setOpen,onClick = () => {}}){
 const closeDialog = () => {
  setOpen(false);
 }
 return (
  <>
    <ModalWrapper open={open} setOpen={closeDialog}>
    <div className='py-4 w-full flex flex-col gap-4 items-center justify-center'>
          <Dialog.Title as='h3' className=''>
            <p className={clsx("p-3 rounded-full ", "text-red-600 bg-red-200")}>
              <FaQuestion size={60} />
            </p>
          </Dialog.Title>
          <p className='text-center text-gray-500'>
            {"Are you sure? you want to activate or deactivate this account?"}
          </p>
          <div className='bg-white py-3 sm:flex sm:flex-row-reverse gap-4'>
            <Button
              type="button"
              className={clsx("px-8 text-sm font-semibold text-white sm:w-auto0","bg-red-600 hover:bg-red-500")}
              onClick={onClick}
              label={"Yes"} // when admin click on the yes button then it called the function userActionHandler one which we created on the users.jsx file
              // in this function we make the request to the backend with the body:data and perform operation and send back to frontend and use this data to update the user
              // profile from the activate to disable and disable to activate 
            />
            <Button
              type="button"
              className="bg-white px-8 text-sm font-semibold mr-1 text-gray-900 sm:w-auto border"
              onClick={() => closeDialog()}
              label="No"
            />
          </div>
        </div>
    </ModalWrapper>
  </>
 )
}

