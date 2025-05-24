import React from 'react'
import SearchUser from './SearchUser'
import Conversations from './Coversations'

const Sidebar = () => {
  return (
    <div className="bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-md rounded-2xl p-4 w-full md:w-[35%] lg:w-[30%] shadow-lg transition-all duration-300">
      <SearchUser />
      <Conversations />
    </div>
  )
}

export default Sidebar
