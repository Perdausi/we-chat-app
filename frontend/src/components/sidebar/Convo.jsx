import useConversation from "../../zustand/useConversation"
import {useSocketContext} from '../../context/SocketContext'

const Convo = ({conversation, lastIdx}) => {
      const {selectedConversation, setSelectedConversation} = useConversation();
      const isSelected = selectedConversation?._id === conversation._id;

      const {onlineUsers} = useSocketContext();
      const isOnline = onlineUsers.includes(conversation._id);


  return (
    <>
    <div className={`mb-3 flex-row md:flex items-center cursor-pointer md:hover:bg-primary rounded
      ${isSelected ? "md:bg-primary" : ""}
      `} onClick={()=> setSelectedConversation(conversation)}>
      <div className="flex flex-col md:flex-row items-center gap-2 w-full">
        {/* Avatar */}
        <div className={`avatar ${isOnline ? "avatar-online" : ""}`}>
            <div className="w-8 md:w-12 lg:w-20 rounded-full">
            <img
                src={conversation.profilePic}
                alt="avatar"
            />
            </div>
        </div>

        {/* Info container */}
        <div className="flex flex-col md:flex-row md:items-center justify-between w-full px-4 md:px-0">
          {/* Name + Message */}
          <div className="flex flex-col">
            {/* First name on small screens */}
            <p className="text-white font-normal text-sm md:hidden whitespace-nowrap">
              {conversation.fullname.split(" ")[0]}
            </p>

            {/* Full name on medium+ screens */}
            <p className="text-white font-semibold text-lg md:text-md lg:sm hidden md:block whitespace-nowrap">
              {conversation.fullname}
            </p>  
            
          </div>

          {/* Time (hidden on mobile) */}
            {/* <div className="md:flex flex-none items-center justify-center gap-2">
              <div className="status status-error md:block hidden"></div>
              <p className="text-xs text-warning  md:block hidden">Unread messages</p>
            </div> */}
        </div>

      </div>
    </div>
    {!lastIdx && <div className='divider my-0 py-0 h-5'></div>}
    </>
  )
}

export default Convo