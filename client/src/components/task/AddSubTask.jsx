import React from 'react'
import { useForm } from 'react-hook-form'
import ModalWrapper from '../ModalWrapper.jsx';
import Button from "../Button.jsx";
import { Dialog } from '@headlessui/react';
import Textbox from '../Textbox.jsx';
import { toast } from 'sonner';
import { useCreateSubTaskMutation } from '../../redux/api/taskApiSlice.js';

const AddSubTask = ({ open, setOpen, id}) => {
    const toastStyle = {
        padding: '16px 24px',
        borderRadius: '8px',
        minHeight: '60px',
        display: 'flex',
        fontSize: '16px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      };
    const {
        register,handleSubmit,formState:{errors},} = useForm();

        const [addSubTask] = useCreateSubTaskMutation(); //create a mutation for the addsubtask in taskApiSlice.js

        // console.log("id",id);
        const handleOnSubmit = async (data) => {
            // when we submit the form for the add sub task then this data contain the form input field's values...
            try {
                const res = await addSubTask({data,id}).unwrap();
                // so we pass the this form's current data as a body:data and id of the current task to the backend with the requests and in backend after performing
                // some operation it response back to the result which we stored here in the res..
                toast.success(res.message,{style:toastStyle}); // res.message means what ever message we send back to the frontend from the backend with the message that message
                // shown up here when we write the res.message
                setTimeout(() => {
                    setOpen(false); // we close the dilog box and after some time we reload the page so what ever changes applied to this page also shown up to the other related page... 
                },20);
                setTimeout(() => {
                    window.location.reload();
                },800);

            }catch(err){
                console.log(err);
                toast.error(err?.data?.message || err.error,{style:toastStyle});
            }
        };
  return (
    <>
        <ModalWrapper open={open} setOpen={setOpen}>
        {/* so when this "open" state become true from the TaskCard.jsx file then this "open" state varialbe is passed to the <ModalWrapper> component and in that
        component we have the logic for open the dialog box when this open=true  */}
            <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
                <Dialog.Title
                    as="h2"
                    className="text-base font-bold leading-6 text-gray-900 mb-4">
                        ADD SUB-TASK
                </Dialog.Title> {/* this is the title for the Button */}
                <div className='mt-2 flex flex-col gap-6'>
                    <Textbox 
                        placeholder="Sub-Task title"
                        type="text"
                        name="title"
                        label="Title"
                        className="w-full rounded-lg shadow-lg"
                        register={register("title",{required:"Title is required!",})}
                        error={errors.title ? errors.title.message : ""}
                    /> {/* this text box is for the title of the subTask and we validate this input box using the react-hook-form */}
                    <div className='flex items-center gap-4'>
                        <Textbox 
                            placeholder="Date"
                            type="date"
                            name="date"
                            label="Task Date"
                            className="w-full rounded-lg shadow-lg"
                            register={register("date",{required:"Date is required!",})}
                            error={errors.date ? errors.date.message : ""}
                        /> {/* this is the date input field */}
                        <Textbox 
                            placeholder="Tag"
                            type="text"
                            name="tag"
                            label="Tag"
                            className="w-full rounded-lg shadow-lg"
                            register={register("tag",{required:"Tag is required!",})}
                            error={errors.tag ? errors.tag.message : ""}
                        /> {/* this is the text input field */}
                    </div>
                </div>
                <div className='py-4 mt-4 flex sm:flex-row-reverse gap-4'>
                    <Button 
                        type="submit"
                        className="bg-blue-600 px-6 shadow-xl text-sm font-semibold text-white hover:bg-blue-700 sm:ml-3 sm:w-auto"
                        label="Add Task"    
                    />{/* this is the submit button to add the subTask */}
                    <Button 
                        type="button"
                        className="bg-gray-200 shadow-xl border px-6 text-sm font-semibold text-gray-900 sm:w-auto"
                        onClick={() => setOpen(false)}
                        label="Cancel"
                    /> {/* when user click on the cancel button then this "open" state variable is become false so dialog box is closed..becuase it is depended on the "open" state variable.. */}
                </div>
            </form>
        </ModalWrapper>
    </>
  )
}

export default AddSubTask