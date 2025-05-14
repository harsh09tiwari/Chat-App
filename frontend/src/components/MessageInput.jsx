import { useRef, useState } from "react"
import { useChatStore } from "../store/useChatStore"
import { Image, Send } from "lucide-react"

function MessageInput() {

    const [text, setText] = useState("")
    const [mediaPreview, setMediaPreview] = useState(null)
    const fileInputRef = useRef(null)  // Reference to the file input element which means we can access the file input element directly and manipulate it, such as triggering a click event or resetting its value.
    const {sendMessage} = useChatStore()

    const handleMediaChange = () => {}

    const removeMedia = () => {}

    const handleSendMessage = async () => {}

  return (
     <div className="p-4 w-full">
      {mediaPreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={mediaPreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeMedia}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
            <input
                type="text"
                className="w-full input input-bordered rounded-3xl input-md sn:input-md"
                value={text}
                placeholder="Type a message..."
                onChange={(e) => setText(e.target.value)}   // capture the input value
            />
            <input
                type="file"
                accept="image/*,video/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleMediaChange}  // handleMediaChange function will be called when a file is selected
            />

            <button
                type="button"
                className={`hidden sm:flex btn btn-circle bg-blue-400 ${mediaPreview ? "text-emerald-500" : "text-white"}`}
                onClick={() => fileInputRef.current?.click()}
            >
                <Image size={20} />
            </button>
        </div>
        <button
            type="submit"
            className="sm:flex btn btn-circle !bg-blue-400 hover:!bg-green-400 text-white"
            disabled={!text.trim() && !mediaPreview}
        >
          <Send size={20} />
        </button>
      </form>
      </div>
    
  )
}

export default MessageInput