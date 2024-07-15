import React from 'react'

const Loader = () => {
  return (
    <div className='dots-container'> {/* here i used already created classes in index.css file */}
        <div className='dot'></div>
        <div className='dot'></div>
        <div className='dot'></div>
        <div className='dot'></div>
        <div className='dot'></div>
    </div>
  )
}

export default Loader;