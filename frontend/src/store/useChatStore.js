import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({  // Zustand store for managing chat state
    //   state
    messages: [], // list of messages
    users: [],    // list of users
    selectedUser: null, // currently selected user
    onlineUsers: [], // list of online users
    isUsersLoading: false,  
    isMessagesLoading: false,   



    getUsers : async () => {
        set({isUsersLoading: true});
        try {
            const res = await axiosInstance.get("/messages/users");
            set({users: res.data})
        } catch (error) {
            toast.error(error.response.data.message);   
        } finally{
            set({isUsersLoading: false});
        }
    },

    getMessages : async (userId) => {
        set({isMessagesLoading: true});
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({messages: res.data})
        } catch (error) {
            toast.error(error.response.data.message);   
        } finally{
            set({isMessagesLoading: false});
        }
    },

    sendMessage : async(messageData) => {
        const {selectedUser, messages} = get();  // destructuring selectedUser and message from the state
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData); // sending message to the server
            set({messages:[...messages, res.data]});  // updating the messages state with the new message
        } catch (error) {
            toast.error(error.response.data.message);  // showing error message
        }
    },

    subscribeToMessage : () => {
        const {selectedUser} = get();
        if(!selectedUser) return;

        const socket = useAuthStore.getState().socket

        socket.on("newMessage", (newMessage) => {

            const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
            if (!isMessageSentFromSelectedUser) {    //   for sending the message to correct person.
                return;
            }

            set({
                messages : [...get().messages, newMessage ]   // spreading the existing messages and adding the new message so that it can be displayed in the chat
            })
        })
    },

    unsubscribeFromMessage: () => {
        const socket = useAuthStore.getState().socket  // getting the socket from the auth store
        socket.off("newMessage");  // removing the event listener for newMessage
    },

    setSelectedUser : (selectedUser) => set({selectedUser})  // setSelectedUser is a function that sets the selected user
}));

