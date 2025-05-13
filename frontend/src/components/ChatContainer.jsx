import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore"
import ChatContainerSkeleton from "./skeleton/ChatContainerSkeleton";

const ChatContainer = () => {

    const {message, getMessages, isMessageLoading, selectedUser} = useChatStore();

    //   for loading the message of user when we open any chat
    useEffect=(() => {
        getMessages(selectedUser._id)
    },[selectedUser._id, getMessages])

    if(isMessageLoading) return <ChatContainerSkeleton/>

    return (
        <div className="flex-1 flex-col overflow-auto">
            <ChatHeader/>
        </div>
    )
}

export default ChatContainer