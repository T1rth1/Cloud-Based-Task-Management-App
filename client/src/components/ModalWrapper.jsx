import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";

const ModalWrapper = ({ open, setOpen, children }) => {
  
 // here what we passed in the <ModalWrapper>{content}</ModalWrapper>..that content is 
 // deproped here as a {children} so that whole content passed as a children which is inside this <ModalWrapper> tag...
  return (
    // this is the whole inbuilt code imported from the headless UI and make changes as per my need...
    // see Dialog component of the headless UI
    <Transition.Root show={open} as={Fragment}>
     {/* when open=true then this transition root was executed...rest of the css and component is copy from the headless UI */}
      <Dialog
        as='div'
        className='relative z-10 w-full'
        onClose={() => setOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-60 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex h-full items-center justify-center p-4 text-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='w-full relative transform overflow-hidden rounded-3xl bg-white text-left shadow-xl transition-all pb-0 sm:my-8 sm:w-full sm:max-w-lg'>
                <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                  <div className='sm:flex sm:items-start'>
                    <div className='w-full mt-3  sm:ml-4 sm:mt-0 sm:text-left'>
                      {children} {/* here that part should come which is inside the <ModalWrapper>{content}</ModalWrapper> component..and 
                      based on the headless UI documentation here we should render the Dialogue title so we render at the AddTask.jsx file 
                      where this ModalWrapper component is used */}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalWrapper;