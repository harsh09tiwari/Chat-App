import React, { useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

//  components
import Navbar from './components/Navbar'

//  pages
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import SignUpPage from './pages/SignUpPage'
import ProfilePage from './pages/ProfilePage'


//  icons
import {Loader} from "lucide-react"
import { Toaster } from 'react-hot-toast'

//   stores
import { useAuthStore } from './store/useAuthStore.js'
import { useThemeStore } from './store/useThemeStore.js'


const App = () => {

  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()

  const {theme} = useThemeStore()

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
    <div data-theme={theme} >

      <Navbar/>   {/* // its a navbar component which is used in all the pages */}

      <Routes>
        <Route path="/" element={authUser?<HomePage/>:<Navigate to="/login"/>}/>  {/*//  if the user is not authenticated then redirect to login page  */}
        <Route path="/signUp" element={!authUser?<SignUpPage/>:<Navigate to="/"/>}/>  {/* //  if the user is authenticated then redirect to home page */}
        <Route path="/login" element={!authUser?<LoginPage/>:<Navigate to="/"/>}/>  {/* //  if the user is authenticated then redirect to home page */}
        <Route path="/settings" element={<SettingsPage/>}/>
        <Route path="/profile" element={authUser?<ProfilePage/>:<Navigate to="/login"/>}/> 
      </Routes>

      <Toaster/> {/* show toast notifications */}

    </div>
  )
}

export default App
