import useConversation from '../../zustand/useConversation'
import { useAuthContext } from '../../context/AuthContext'
import { extractTime } from '../../utils/extractTime.js'

const Messages = ({message}) => {
  // check if the message is from me or others // use AuthContext to get the message from authenticated user
      const {authUser} = useAuthContext();
  // useConversation global hook to get the selected Convo
      const {selectedConversation} = useConversation();
  // get the message depending on from who // we just need to compare the id of the sender and the current authenticated user id
      const fromMe = message.senderID === authUser._id;
  // next is the Chatclass for chat start/end
      const chatClass = fromMe ? "chat-end" : "chat-start";
  // chat profile 
      const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  // chat bubble
      const chatBubbleColor = fromMe ? "bg-primary" : "bg-black";
      const formattedTime = extractTime(message.createdAt);

  return (
    <>
      <div className={`chat ${chatClass}`}>
        <div className='chat-image avatar'>
            <div className='w-6 md:w-10 rounded-full'>
            <img src={profilePic} alt='avatar'/>
            </div>
        </div>
        <div className={`chat-bubble text-white ${chatBubbleColor} rounded-xl break-words max-w-[85%] whitespace-pre-line`}>{message.message}</div>
        <p className='chat-footer'>{formattedTime}</p>
    </div>
    </>
  )
}

export default Messages