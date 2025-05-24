import React from 'react'

const MessageSkeleton = () => {
  return (
    <>
    <div className='flex md:flex-row items-center justify-between flex-col'>
      {/* left side */}
      <div className="flex gap-3 items-center">
              <div className="skeleton h-10 w-10 rounded-full shrink-0 bg-gray-500"></div>
              <div className='flex flex-col gap-1'>
                  <div className="skeleton h-4 w-40 bg-gray-500"></div>
                  <div className="skeleton h-4 w-40 bg-gray-500"></div>
              </div>
          </div>

    {/* right side */}
      <div className="flex gap-3 items-end mt-5">
          <div className='flex flex-col gap-1'>
              <div className="skeleton h-4 w-40 bg-gray-500"></div>
          </div>
          <div className="skeleton h-10 w-10 rounded-full shrink-0 bg-gray-500"></div>
      </div>
    </div>
    </>
  )
}

export default MessageSkeleton

{/*  */}