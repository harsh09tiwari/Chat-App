import React from "react";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore"; //  //  import signUp and isSigningUp from useAuthStore for signing up the user
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPages = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { signUp, isSigningUp } = useAuthStore(); // //  import signUp and isSigningUp from useAuthStore for signing up the user



  const validateForm = () => {

    if (!formData.fullName.trim()) {
      return toast.error("Full Name is required"); //  //  check if the full name is empty
    }

    if (!formData.email.trim()) {
      return toast.error("Email is required"); //  //  check if the email is empty
    }
    if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)){
      return toast.error("Email is not valid") //  //  check if the email is valid
    }

    if (!formData.password.trim()) {
      return toast.error("Password is required"); //  //  check if the password is empty
    }
    if (formData.password.length < 8) {
      return toast.error("Password must be at least 8 characters long"); //  //  check if the password is less than 6 characters
    }

    return true; //  //  if all the fields are valid then return true

  }; //  //  validate the form data before signing up the user



  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm(); //  //  validate the form data before signing up the user
    if (isValid == true) {
      signUp(formData); //  //  call signUp with formData if the form is valid
    }
    
  }; //  //  handle the change in the form data



  return (  
   <div className="min-h-screen grid lg:grid-cols-2">   
  {/* Left side */}
  <div className="flex flex-col justify-center items-center p-6 sm:p-12">
    <div className="w-full max-w-md space-y-8">
      {/* LOGO */}
      <div className="text-center mb-8">
        <div className="flex flex-col items-center gap-2 group">
          <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <MessageSquare className="size-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mt-2">Create Account</h1>
          <p className="text-base-content/60">Get started with your free account</p>
        </div>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Full Name</span>
          </label>
          <div className="relative">
            <div className="absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="w-5 h-5 text-base-content/40" />
            </div>
            <input
              type="text"
              placeholder="Harsh Tiwari"
              className="input input-bordered w-full pl-10"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>
        </div>

        {/* Email */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Email</span>
          </label>
          <div className="relative">
            <div className="absolute  z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="w-5 h-5 text-base-content/40" />
            </div>
            <input
              type="email"
              placeholder="you@email.com"
              className="input input-bordered w-full pl-10"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </div>

        {/* Password */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Password</span>
          </label>
          <div className="relative">
            <div className="absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="w-5 h-5 text-base-content/40" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input input-bordered w-full pl-10"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button
              type="button"
              className="absolute  inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5 text-base-content/40" />
              ) : (
                <Eye className="w-5 h-5 text-base-content/40" />
              )}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
          {isSigningUp ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Loading...
            </>
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      {/* Link to login */}
      <div className="text-center">
        <p className="text-base-content/60">
          Already have an account?{" "}
          <Link to="/login" className="link link-primary">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  </div>

  {/* Right side (Optional - commented out) */}
  

  <AuthImagePattern
    title="Join our community"
    subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
  /> 
 
</div>

  );
};

export default SignUpPages;
