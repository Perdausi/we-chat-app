import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from '../../zustand/useConversation' 
import useGetConvo from '../../hooks/useGetConvo'
import toast from "react-hot-toast";

const SearchUser = () => {
  const [search, setSearch] = useState("");
  const {setSelectedConversation} = useConversation(); 
  const {conversations} = useGetConvo();

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!search) return;
    if (search.length < 3) {
      return  toast.error("Search term at least 3 characters long");
    }

    const conversation = conversations.find((c) => c.fullname.toLowerCase().includes(search.toLocaleLowerCase()));

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    }else toast.error("User not found!");
  }
  
  return (
    <form onSubmit={handleSubmit} className="flex mb-3 items-center gap-2 backdrop-blur-md bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 p-1 rounded-full shadow-md transition-all duration-300">
      <input
        type=""
        placeholder="Search..."
        className="flex-1 bg-transparent text-white placeholder:text-gray-300 focus:outline-none  pl-2"
        value={search}
        onChange={(e)=> setSearch(e.target.value)}
      />
      <button
        type="submit"
        className="btn btn-circle backdrop-blur-md bg-white/10 border shadow-none border-white/20 
        text-black hover:bg-white/20 hover:scale-105 transition-all duration-300 -ml-10"
      >
        <IoSearchSharp />
      </button>
    </form>
  )
}

export default SearchUser
