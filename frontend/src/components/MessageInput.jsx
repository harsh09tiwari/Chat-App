import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

function MessageInput() {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [video, setVideo] = useState(null);
  const fileInputRef = useRef(null); //Reference to the file input element which means we can access the file input element directly and manipulate it, such as triggering a click event or resetting its value.
  const { sendMessage } = useChatStore();

  //   function for handling the media change
  //   this function will be called when a file is selected
  const handleImageChange = (e) => {
    const file = e.target.files[0]; //   taking the first selected file
    if (!file || !file.type.startsWith("image/")) {
      //   checking if file is present or not
      toast.error("Please select the correct file.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result); //   setting the media preview to the selected file
    };
    reader.readAsDataURL(file); //   reading the file as a data URL
  };

  
  const handleVideoChange = (e) => {
      const file = e.target.files[0]
      
      if (!file || !file.type.startsWith("video/")){
          toast.error("Please select the correct file")
          return;
        }
        
        const reader = new FileReader();
        reader.onloadend = () => {
            setVideo(reader.result)
        }
        reader.readAsDataURL(file);
    }


    //   function for removing the media preview
    //   this function will be called when the remove button is clicked
    const removeMedia = () => {
        setVideo(null)
        setImagePreview(null); //   removing the media preview
        if (fileInputRef.current) fileInputRef.current.value = null; //   resetting the file input value if fileInputRef is present
    };



  //   function for sending the message
  //   this function will be called when the form is submitted
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!text.trim() && !imagePreview) {
      //   if both are fields are empty like no message and media
      return;
    }

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
        video: video,
      });

      //   clearing the form for sending next message
      setText("");
      setImagePreview(null);
      setVideo(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

return (
    <div className="p-4 w-full">
        {imagePreview && (
            <div className="mb-3 flex items-center gap-2">
                <div className="relative">
                    <img
                        src={imagePreview}
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
        {video && (
            <div className="mb-3 flex items-center gap-2">
                <div className="relative">
                    <video
                        src={video}
                        controls
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
                    className="w-full input input-bordered rounded-3xl input-md sn:input-md "
                    value={text}
                    placeholder="Type a message..."
                    onChange={(e) => setText(e.target.value)} // capture the input value
                />
                <input
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={(e) => {
                        if (e.target.files[0]?.type.startsWith("image/")) {
                            handleImageChange(e);
                        } else if (e.target.files[0]?.type.startsWith("video/")) {
                            handleVideoChange(e);
                        }
                    }} // handle both image and video changes
                />

                <button
                    type="button"
                    className={`hidden sm:flex btn btn-circle bg-blue-400 hover:!bg-green-600 ${
                        imagePreview || video ? "text-black" : "text-white"
                    }`}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <Image size={20} />
                </button>
            </div>
            <button
                type="submit"
                className="sm:flex btn btn-circle !bg-blue-400 hover:!bg-green-600 text-white"
                disabled={!text.trim() && !imagePreview && !video}
            >
                <Send size={20} />
            </button>
        </form>
    </div>
);
}

export default MessageInput;
