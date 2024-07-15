import React from 'react'
import ModalWrapper from './ModalWrapper'
import { Dialog } from '@headlessui/react'
import Button from './Button'

const viewNotification = ({ open,setOpen,el}) => {
  return (
    <>
        {/* this dialog box is opened when user click any individual notification  */}
        <ModalWrapper open={open} setOpen={setOpen}>
            <div className='py-4 w-full flex flex-col gap-4 items-center justify-center'>
                <Dialog.Title as="h3" className="font-semibold text-lg">
                    {el?.task?.title} {/* we saw the selected notification title which we pass from the NotificationPanel.jsx */}
                </Dialog.Title>

                <p className='text-start text-gray-500'>{el?.text}</p> {/* we saw the task */}

                <Button
                    type="button"
                    className="bg-white hover:bg-gray-200 px-8 mt-3 text-sm font-semibold text-gray-900 sm:w-auto border "
                    onClick={() => setOpen(false)}
                    label="Ok"
                />
            </div>
        </ModalWrapper>
    </>
  )
}

export default viewNotification