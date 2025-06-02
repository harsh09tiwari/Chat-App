import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:5000";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check"); //  it will give reponse back where we can set the authUser state

      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth", error);
      set({ authUser: null }); // //  if there is an error in checking the auth then set the authUser to null
    } finally {
      set({ isCheckingAuth: false }); //  //  set isCheckingAuth to false after checking the auth
    }
  },

  signUp: async (data) => {
    set({ isSigningUp: true }); //  set isSigningUp to true when signing up the user
    try {
      const res = await axiosInstance.post("/auth/signUp", data); //  //  post request to sign up the user
      toast.success("Account created successfully"); //  //  show success message when user is signed up successfully
      set({ authUser: res.data }); //  //  set the authUser to the response data

      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message); //  //  show error message when there is an error in signing up the user
      //  //  error.response.data.message will give the error message from the server
      console.log("Error in signing up", error.message);
    } finally {
      set({ isSigningUp: false }); //  //  set isSigningUp to false after signing up the user
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true }); //  //  set isLoggingIn to true when logging in the user
    try {
      const res = await axiosInstance.post("/auth/login", data); //  //  post request to log in the user
      set({ authUser: res.data }); //  //  set the authUser to the response data
      toast.success("Logged in successfully"); //  //  show success message when user is logged in successfully

      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message); //  //  show error message when there is an error in logging in the user
      //  //  error.response.data.message will give the error message from the server
      console.log("Error in logging in", error.message);
    } finally {
      set({ isLoggingIn: false }); //  //  set isLoggingIn to false after logging in the user
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout"); //  //  post request to log out the user
      set({ authUser: null }); //  //  set the authUser to null after logging out the user
      toast.success("Logged out successfully"); //  //  show success message when user is logged out successfully
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message); //  //  show error message when there is an error in logging out the user
      //  //  error.response.data.message will give the error message from the server
      console.log("Error in logging out", error.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true }); //  //  set isUpdatingProfile to true when updating the profile
    try {
      const res = await axiosInstance.put("/auth/update-profile", data); //  //  put request to update the profile
      set({ authUser: res.data }); //  //  set the authUser to the response data
      toast.success("Profile updated successfully"); //  //  show success message when profile is updated successfully
    } catch (error) {
      toast.error(error.response.data.message); //
      console.log("Error in updating profile", error.message);
    } finally {
      set({ isUpdatingProfile: false }); //  //  set isUpdatingProfile to false after updating the profile
    }
  },

  connectSocket: () => {
    const { authUser } = get();

    if (!authUser || get().socket?.connected) return; // for checking if user is logged in or not and is it already connected or not

    const socket = io(BASE_URL);
    socket.connect();
    set({ socket:socket })
  },

  disconnectSocket: () => {
    if (get().socket?.connected) {
        get().socket.disconnect();
    }
  },
}));
