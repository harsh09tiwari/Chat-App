import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore"
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeleton/MessageSkeleton";

const ChatContainer = () => {

    const {messages, getMessages, isMessageLoading, selectedUser} = useChatStore();

    //   for loading the message of user when we open any chat
    useEffect(() => {
        getMessages(selectedUser._id)
    },[selectedUser._id, getMessages])

    if(isMessageLoading) return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader/>
            <MessageSkeleton/>
            <MessageInput/>
        </div>
    )

    return (
        <div className="flex-1 flex-col overflow-auto p-15">
            <ChatHeader/>

            <p>message..</p>

            <MessageInput/>
        </div>
    )
}

export default ChatContainer;