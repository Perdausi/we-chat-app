import { useState } from 'react'
import {BsSend} from 'react-icons/bs'
import useSendMessage from '../../hooks/useSendMessage'

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const {loading, sendMessage} = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!message) return;
    await sendMessage(message);
    setMessage("");
  }
  return (
    <form className='px-4' onSubmit={handleSubmit}>
        <div className='w-full relative'>
            <input type="text" className='border rounded-lg text-sm w-full p-2.5 block bg-black border-primary text-white focus:outline-secondary outline-none placeholder:text-secondary' 
            placeholder='Send a message'
              value={message}
              onChange={(e)=> setMessage(e.target.value)}
            />
            <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3 text-primary text-xl hover:scale-75 transition-all duration-300 ease-in-out'>
                {loading ? <div className='loading loading-spinner'></div> : <BsSend />}
            </button>
        </div>
    </form>
  )
}
export default MessageInput

