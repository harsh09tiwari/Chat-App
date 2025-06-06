import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

import SidebarSkeleton from "./skeleton/SidebarSkeleton";
import { Users } from "lucide-react";
import { useState } from "react";

const Sidebar = () => {

    const { getUsers, users, selectedUser, setSelectedUser, isUserLoading } = useChatStore()

    const {onlineUsers} = useAuthStore();   // getting online users from the auth store   for showing online status in the sidebar
    
    //   showing online users
    const [showOnlineOnly, setShowOnlineOnly] = useState(false);

    useEffect(() => {  
        getUsers() 
    },[getUsers])  // this is used to get the users when the component is mounted so that we can show the users in the sidebar


    const filteredUsers = showOnlineOnly ? users.filter(user => onlineUsers.includes(user._id)) : users;

    if(isUserLoading) return <SidebarSkeleton/>

    return (
        <aside className="h-full pt-16 w-60 lg:w-140 border-r border-base-500 flex flex-col transition-all dur">
            <div className="border-b border-base-500 w-full p-5">
                <div className="flex items-center gap-2">
                    <Users className="size-6"/>
                    <span className="font-medum hidden lg-black">Contacts</span>
                </div>

                {/* ONLINE filter toggle */}
                <div className="mt-3 hidden lg:flex items-center gap-2">
                  <label className="cursor-pointer flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={showOnlineOnly}
                      onChange={(e) => setShowOnlineOnly(e.target.checked)}
                      className="checkbox checkbox-sm"
                    />
                    <span className="text-sm">Show online only</span>
                  </label>
                </div>

              </div>
            <div className="overflow-y-auto w-full py-3">
              {filteredUsers.map((user) => (
              <button
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className={`
                  w-full p-3 flex items-center gap-3
                  hover:bg-base-300 transition-colors
                  ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
                `}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.name}
                  className="size-12 object-cover rounded-full"
                />
                {onlineUsers.includes(user._id) && (
                  <span
                    className="absolute bottom-0 right-0 size-3 bg-green-500 
                    rounded-full ring-2 ring-zinc-900"
                  />
                )}
              </div>

              {/* User info - only visible on larger screens */}
              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate">{user.fullName}</div>
                <div className="text-sm text-zinc-400">
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                  </div>
                </div>
                </button>
              ))}

            {users.length === 0 && (
              <div className="text-center text-zinc-500 py-4">No online users</div>
            )}

            {filteredUsers.length === 0 && (
              <div className = "text-center text-zinc-500 py-4">No Online Users</div>
            )}

          </div>
        </aside>
    )
}

export default Sidebar