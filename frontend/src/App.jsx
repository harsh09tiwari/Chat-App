import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import SignUpPage from './pages/SignUpPage'
import ProfilePage from './pages/ProfilePage'

import { useAuthStore } from './store/useAuthStore.js'

import { Navigate } from 'react-router-dom'

import {Loader} from "lucide-react"


const App = () => {

  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()

  useEffect(() => {
    checkAuth()
  },[checkAuth])  //  //  checkAuth will be called when the component is mounted and authUser is changed

  console.log({authUser});

  if (isCheckingAuth && !authUser) {  //  //  if the auth is checking and there is no authUser then show loading
    return <div className="flex items-center justify-center h-screen">
      <Loader className="size-8 animate-spin"/>
    </div>  //  //  if the auth is checking then show loading
    
  }
  

  return (
    <div>
      <Navbar/>

      <Routes>
        <Route path="/" element={authUser?<HomePage/>:<Navigate to="/login"/>}/>   //  //  if the user is not authenticated then redirect to login page 
        <Route path="/signUp" element={!authUser?<SignUpPage/>:<Navigate to="/"/>}/>  //  //  if the user is authenticated then redirect to home page
        <Route path="/login" element={!authUser?<LoginPage/>:<Navigate to="/"/>}/>  //  //  if the user is authenticated then redirect to home page
        <Route path="/settings" element={<SettingsPage/>}/>
        <Route path="/profile" element={authUser?<ProfilePage/>:<Navigate to="/login"/>}/> 
      </Routes>

    </div>
  )
}

export default App
