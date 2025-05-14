import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

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
        const {selectedUser, message} = get();  // destructuring selectedUser and message from the state
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData); // sending message to the server
            set({messages:[...messages, res.data]});  // updating the messages state with the new message
        } catch (error) {
            toast.error(error.response.data.message);  // showing error message
        }
    },

    setSelectedUser : (selectedUser) => set({selectedUser})  // setSelectedUser is a function that sets the selected user
}));

