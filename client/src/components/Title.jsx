import clsx from 'clsx'
import React from 'react'

const Title = ({title}) => {
  return (
    <h2 className={clsx("text-2xl font-semibold capitalize")}>{title}</h2>
  )
}

export default Title