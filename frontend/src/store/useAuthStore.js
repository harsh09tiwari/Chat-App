import {create} from 'zustand';
import { axiosInstance } from '../lib/axios.js';


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
        try {
            
        } catch (error) {
            
        }
    }
}))