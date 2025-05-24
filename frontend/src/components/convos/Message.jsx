import { useEffect, useRef } from 'react';
import useGetmessage from '../../hooks/useGetmessage'
// import MessageSkeleton from '../skeletons/MessageSkeleton'
import Messages from './Messages';

const Message = () => {
  const {messages, loading} = useGetmessage();
  const lastMessageRef = useRef();
  console.log(messages)


  useEffect(()=> {
    setTimeout(()=> {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth"});
    },100);
  },[messages]);
  return (
    <div className="flex flex-col w-full">
        {!loading && messages.length > 0 && messages.map((message) => (
          <div key={message._id} 
            ref={lastMessageRef}
          >
            <Messages message={message}/>
          </div>
        ))}

        {loading && (
        <div className="flex justify-center items-center h-full py-4">
          <span className="loading loading-spinner loading-lg" />
        </div>
      )}
        {!loading && messages.length === 0 && (
          <p className='text-center text-lg text-white'>Send a message to start conversation</p>
        )}

    </div>
  )
}

export default Message
