import React from 'react'
import TaskCard from './TaskCard.jsx'

const BoardView = ({tasks}) => {
  // here we deprop the tasks data array which is passed from the Tasks.jsx file...
  return (
    <div className='w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10'>
      {
        tasks?.map((task,index) => (
          <TaskCard task={task} key={index} />
        ))
        // we go through a loop and render the TaskCard for each task...go to TaaskCard.jsx file..in this file i write what should be there  in each card  
      }
    </div>
  )
}

export default BoardView