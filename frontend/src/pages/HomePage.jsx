import { useChatStore } from "../store/useChatStore.js"
import NoChatSelected from "../components/NoChatSelected"
import ChatContainer from "../components/ChatContainer"
import Sidebar from "../components/Sidebar.jsx"

const HomePage = () => {
  
  const {selectedUser} = useChatStore()

  return (
    <div className="h-screen bg-base-200 pt-16">
      <div className="flex items-center justify-center w-full h-full ">
        <div className="bg-base-100 rounded-lg shadow-cl w-full  h-full">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            
            {!selectedUser ? <NoChatSelected/> : <ChatContainer/>}

          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage 