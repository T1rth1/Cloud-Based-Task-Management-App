import React from 'react'
import { useForm } from 'react-hook-form';
import { useChangePasswordMutation } from '../redux/api/userApiSlice';
import { toast } from 'sonner';
import ModalWrapper from './ModalWrapper';
import { Dialog } from '@headlessui/react';
import Textbox from './Textbox';
import Loader from './Loader';
import Button from './Button';

const ChangePassword = ({open,setOpen}) => {
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
    const [changeUserPassword,{isLoading}] = useChangePasswordMutation(); 

    const handleOnSubmit = async (data) => {
        // when user click on the submit button then this function is called...
        //  and we check if the password entered in the both the textbox is same or not if not then we saw the error...
        if(data.password !== data.cpass){
            toast.error("Password doesn't match",{style:toastStyle});
            return;
        }
        try {
            // and if password match with the both text box then we call the changePassword mutation function which made the request at the backend side and pass 
            //  current form's data...and we used this data in the backend to update the password in the data base
            const res = await changeUserPassword(data).unwrap();
            // refetch();
            toast.success("Password changed successfully.",{style:toastStyle});

            setTimeout(() => {
                setOpen(false); // close the dialog box ( which has the two input field)
            }, 30);
        } catch (error) {
            console.log(error);
            toast.error(error?.data?.message || error.data);
        }
    };
  return (
    <>
        <ModalWrapper open={open} setOpen={setOpen}>
            <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
                <Dialog.Title as="h2" className="text-base font-bold leading-6 text-gray-900 mb-4">
                    Change Passowrd
                </Dialog.Title>
                <div className='mt-2 flex flex-col gap-6'>
                    <Textbox
                        placeholder="New Password"
                        type="password"
                        name="password"
                        label="New Password"
                        className="w-full rounded-lg shadow-lg"
                        register={register("password",{
                            required:"New Password is required!",
                        })}
                        error={errors.password ? errors.password.message : ""}
                    />
                    <Textbox
                        placeholder="Confirm New Password"
                        type="password"
                        name="password"
                        label="Confirm New Password"
                        className="w-full rounded-lg shadow-lg"
                        register={register("cpass",{
                            required:"Confirm New Password is required!",
                        })}
                        error={errors.cpass ? errors.cpass.message : ""}
                    />
                </div>
                { isLoading ? (
                    <div className='py-5'>
                        <Loader/>
                    </div>
                ) : (
                    <div className='py-3 mt-4 sm:flex sm:flex-row-reverse gap-4'>
                        <Button
                            type="submit"
                            className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto shadow-xl"
                            label="Save"
                        />
                        <Button
                            type="button"
                            className="bg-gray-200 px-5 text-sm font-semibold text-gray-900 sm:w-auto shadow-xl"
                            onClick={() => setOpen(false)}
                            label="Cancel"
                        />
                    </div>
                )}
            </form>
        </ModalWrapper>
    </>
  )
}

export default ChangePassword