import React from 'react'
import clsx from 'clsx'
const Button = ({icon,type,label,className, onClick = () => { }}) => {
  return (
    <button
     type={type || "button"}
     onClick={onClick}
     className={clsx("px-3 py-2 outline-none rounded-xl",className)}
     // "clsx" is used to combine the classes more then 1..here we combine the className of the Button element which is passed previously and added new classes here also
    >
        <span>{label}</span>
        {icon && icon}
    </button>
  )
}

export default Button