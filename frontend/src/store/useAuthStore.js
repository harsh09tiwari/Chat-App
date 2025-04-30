import {create} from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';


export const useAuthStore = create((set) => ({
    authUser : null,
    isSigningUp : false,
    isLoggingIn : false,
    isUpdatingProfile : false,

    isCheckingAuth : true,


    checkAuth : async () => {
        try {
            const res = await axiosInstance.get("/auth/check")  //  it will give reponse back where we can set the authUser state

            set({authUser: res.data})
        } catch (error) {
            console.log("Error in checkAuth", error);
            set({authUser: null})  // //  if there is an error in checking the auth then set the authUser to null
        }finally {
            set({isCheckingAuth: false})   //  //  set isCheckingAuth to false after checking the auth
        }
    },


    signUp : async (data) => {
        set({isSigningUp: true})   //  set isSigningUp to true when signing up the user
        try {
            const res = await axiosInstance.post("/auth/signup", data)  //  //  post request to sign up the user
            toast.success("Account created successfully")  //  //  show success message when user is signed up successfully
            set({authUser: res.data})  //  //  set the authUser to the response data
            
        } catch (error) {
            toast.error(error.response.data.message)  //  //  show error message when there is an error in signing up the user
            //  //  error.response.data.message will give the error message from the server
            console.log("Error in signing up", error.message);
        } finally {
            set({isSigningUp: false})  //  //  set isSigningUp to false after signing up the user
        }
    },

    logout : async () => {
        try {
            await axiosInstance.post("/auth/logout")  //  //  post request to log out the user
            set({authUser: null})  //  //  set the authUser to null after logging out the user
            toast.success("Logged out successfully")  //  //  show success message when user is logged out successfully
        } catch (error) {
            toast.error(error.response.data.message)  //  //  show error message when there is an error in logging out the user
            //  //  error.response.data.message will give the error message from the server
            console.log("Error in logging out", error.message);
        }
    },
}))