import Message from './Message'
import MessageInput from './MessageInput'
import { TiMessages } from 'react-icons/ti'
import useConversation from '../../zustand/useConversation'
import { useEffect } from 'react'
import { useAuthContext } from '../../context/AuthContext'

const Conversation = () => {
  const { selectedConversation, setSelectedConversation } = useConversation()
  const { authUser } = useAuthContext()

  useEffect(() => {
    return () => setSelectedConversation(null)
  }, [setSelectedConversation])

  return (
    <div className="flex-1 min-w-0 flex flex-col rounded-2xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-md shadow-lg p-4 transition-all duration-500 overflow-hidden">
      {!selectedConversation ? (
        <NoChatSelected user={authUser} />
      ) : (
        <>
          {/* Header */}
          <div className="flex items-center gap-2 pb-2 border-b border-white/30 dark:border-white/10">
            <div className="avatar">
              <div className="w-10 md:w-14 rounded-full">
                <img
                  src={selectedConversation.profilePic}
                  alt="avatar"
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <h2 className="text-md md:text-xl font-bold text-white dark:text-white">
                {selectedConversation.fullname}
              </h2>
            </div>
          </div>

          {/* Message container */}
          <div className="flex-1 min-h-0 overflow-y-auto scroll-smooth px-1 sm:px-4 pt-2">
            <Message />
          </div>

          {/* Input */}
          <div className="">
            <MessageInput />
          </div>
        </>
      )}
    </div>
  )
}

export default Conversation

const NoChatSelected = ({ user }) => {
  const firstName = user.fullname.split(' ')[0]
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4">
      <p className="text-2xl md:text-4xl font-bold text-white dark:text-white">
        {`Welcome ${firstName}👋`}
      </p>
      <p className="text-base md:text-xl font-medium text-gray-200 dark:text-gray-400 mt-2">
        Select a person you want to chat with 😊
      </p>
      <TiMessages className="text-secondary text-[100px] mt-6" />
    </div>
  )
}
