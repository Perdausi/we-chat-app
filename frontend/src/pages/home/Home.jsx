import React from 'react'
import Conversation from '../../components/convos/Conversation'
import Sidebar from '../../components/sidebar/Sidebar'

const Home = () => {
  return (
    <div className="h-full w-full bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 px-4 sm:px-6 lg:px-8 py-4 md:py-6 flex flex-col md:flex-row gap-3 sm:gap-4 md:gap-6 transition-all duration-500 ease-in-out">
      <Sidebar />
      <Conversation />
    </div>
  )
}

export default Home
