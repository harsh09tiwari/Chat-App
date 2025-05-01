import { Camera, Mail, User } from 'lucide-react'
import  { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'

const ProfilePage = () => {
  const {authUser, updateProfile, isUpdatingProfile} = useAuthStore()//  //  //  import authUser and updateProfile from useAuthStore for updating the profile of the user

  const [selectedImage, setSelectedImage] = useState(null) //  //  //  state to store the selected image

  const handleImageUpload = async (e) => {
    const file = e.target.files[0] //  get the file from the input
    if (!file) return // if there is no file then return

    const formData = new FileReader() //  create a new form data object

    formData.readAsDataURL(file) //  read the file as a data url

    formData.onload = async () => {
      const base64Image = formData.result //  get the base64 image from the file reader
      setSelectedImage(base64Image) //  set the selected image to the base64 image
      await updateProfile({ profilePic: base64Image }) //  //  update the profile with the selected image
    }
  }
  

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* avatar upload section */}

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImage || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 "
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

        {/* profile information section */}
        
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p >{authUser?.fullName}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p >{authUser?.email}</p> {/* Displaying email address */}
            </div>
          </div>

    {/* account information section */}
    
          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium  mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage