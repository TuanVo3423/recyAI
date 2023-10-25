import React from 'react'

function Story({img,username}) {
  return (
    <div>
        <img className='h-20 w-20 rounded-full p-[1.5px] border-red-500 border-2 object-contain cursor-pointer hover:scale-110 transition transform duration-200 ease-out' src={img} alt=""/>
        <p className='text-lg w-20 truncate text-center '>{username}</p>
    </div>
  )
}

export default Story