import React from 'react'
import clsx from "clsx";
const Textbox = ({type,placeholder,label,className,register,name,error}) => {
  // deprop the props which is passing in the component Textbox....
  return (
    <div className='w-full flex flex-col gap-1'>
        {label && <label htmlFor={name} className='text-slate-800'>{label}</label>}
        <div className=''>
            <input 
                type={type}
                name={name}
                placeholder={placeholder}
                {...register}
                aria-invalid={error ? "true" : "false"}
                className={clsx("bg-transparent px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300",className)}
            />
            {/* The spread operator (...) is used to apply all the properties from the register function to the <input> element
            When you call register(name, options), it returns an object with properties like onChange, onBlur, ref, and more,
             which are needed to manage the input's value and validation state. Using {...register} spreads these properties onto the <input> element, effectively "registering" the input field with the form and enabling react-hook-form to handle it.
             {...register} is equivalent to " onChange={register.onChange} onBlur={register.onBlur} ref={register.ref} "
             */}
             {/* aria-invalid="true": Indicates that the value entered in the input field does not conform to the expected format or is invalid in some way.
                 aria-invalid="false": Indicates that the value entered in the input field is valid.
                 so if error is there then we set the aria-invalid to true means value entered in the input field is not valid
                  */}
        </div>
        {error && (
          <span className='text-xs text-red-500 mt-0.5'>{error}</span>
        )}
    </div>
  )
}

export default Textbox