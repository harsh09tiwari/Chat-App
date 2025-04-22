import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import SignUpPage from './pages/SignUpPage'
import ProfilePage from './pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore'


const App = () => {

  const {authUser, checkAuth} = useAuthStore()

  useEffect(() => {
    checkAuth()
  },[checkAuth])  //  //  checkAuth will be called when the component is mounted and authUser is changed

  console.log({authUser});
  

  return (
    <div>
      <Navbar/>

      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/signUp" element={<SignUpPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/settings" element={<SettingsPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
      </Routes>

    </div>
  )
}

export default App
