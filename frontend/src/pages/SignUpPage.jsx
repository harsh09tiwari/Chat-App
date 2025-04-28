import React from 'react'
import { useState } from 'react'

const SignUpPages = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const {signUp, isSigningUp} = useAuthStore()  // //  import signUp and isSigningUp from useAuthStore for signing up the user

  const validateForm = () => {}  //  //  validate the form data before signing up the user

  const handleSubmit = (e) => {
    e.preventDefault()

  }  //  //  handle the change in the form data

  
  return (
    <div>SignUpPages</div>
  )
}

export default SignUpPages