import FileUploadComponent from "./components/file-upload"
import ChatComponent from "./components/chat"
export default function Home() {
return(
  <>
<div className="h-screen w-screen flex justify-center items-center ">
  <div className="w-[30vw] h-screen p-4 flex justify-center items-center border-amber-950 border-r-2">
    <FileUploadComponent/>
    </div>
  <div className="w-[70vw] h-screen border-l-2 border-amber-400">
    {/* Chat component will go here */}
  <ChatComponent/>
  </div>

</div>
</>
)}