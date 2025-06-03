import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore"
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeleton/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {

    const {messages, getMessages, isMessageLoading, selectedUser, subscribeToMessage, unsubscribeFromMessage} = useChatStore();
    const {authUser}= useAuthStore()

    const messageEndRef = useRef(null)

    //   for loading the message of user when we open any chat
    useEffect(() => {
        getMessages(selectedUser._id)

        subscribeToMessage(); //  subscribing to the new message event

        return () => {
            unsubscribeFromMessage(); //  unsubscribing from the new message event
        }
    },[selectedUser._id, getMessages, subscribeToMessage, unsubscribeFromMessage]);


    useEffect(() => {
        if(messageEndRef.current && messages){
            messageEndRef.current.scrollIntoView({ behaviour: "smooth"});
        }
    },[messages])  //  whenever messages change, it will scroll to the bottom of the chat container
    
    if(isMessageLoading) return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader/>
            <MessageSkeleton/>
            <MessageInput/>
        </div>
    )

    return (
        <div className="flex flex-col  h-full pt-16">
            <ChatHeader/>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    //  mathcing the message with the sender id and authUser id 
                    <div key={message._id} 
                    className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
                    ref={messageEndRef}
                    >
                        <div className="chat-image avatar">
                            <div className="size-12 rounded-full border">
                                <img 
                                src={message.senderId === authUser._id 
                                    ? authUser.profilePic || "/avatar.png"
                                    : selectedUser.profilePic || "/avatar.png"
                                }
                                alt="profile pic" />
                            </div>
                        </div>
                        <div className="chat-header mb-1">
                            <time className="text-xs opacity-70 ml-`">
                                {formatMessageTime(message.createdAt)}
                            </time>
                            <div className="chat-bubble flex flex-col">
                                {message.image && (
                                    <img 
                                    src={message.image}
                                    alt="Attachment"
                                    className="sm:max-w-[250px] rounded-md mb-2" 
                                    />
                                )}
                                {message.video && (
                                    <video 
                                    controls 
                                    className="sm:max-w-[250px] rounded-md mb-2"
                                    >
                                    <source src={message.video} type="video/mp4" />
                                    </video>
                                )}
                                {message.text && <p className="text-xl">{message.text}</p>}
                            </div>
                        </div>
                    </div>   
                ))}
            </div>

            <div className="sticky bottom-0  shadow-md"> {/* Fix MessageInput at the bottom */}
                <MessageInput />
            </div>
        </div>
    )
}

export default ChatContainer;