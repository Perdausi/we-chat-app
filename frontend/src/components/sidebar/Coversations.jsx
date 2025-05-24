
import useGetConvo from '../../hooks/useGetConvo'
import Convo from './Convo'

const Coversations = () => {
  const {loading, conversations} = useGetConvo();
  return (
    <div className='flex md:flex-col overflow-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent max-h-[70vh]'>
      {conversations.map((conversation, idx) => (
        <Convo 
          key={conversation._id}
          conversation={conversation}
          lastIdx={idx === conversations.length - 1}
        />
      ))}

      {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
    </div>
  )
}

export default Coversations
