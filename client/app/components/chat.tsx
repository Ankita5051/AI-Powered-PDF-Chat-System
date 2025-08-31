"use client";
import * as React from "react";
import {MessageSquare} from 'lucide-react';
import { Input } from "@/components/ui/input"

interface IMessage{
    role:"assistant" | "user";
    content:string;
    documents:string[];
}
interface Doc{
    pageContent?:string;
 
    metadata?:{
        loc?:{
            pageNumber?:number;
        };
        source?:string;
    };
}
const ChatComponent: React.FC = () => {
    const [message,setMessage] = React.useState<string>('');
    const [messages,setMessages] = React.useState<IMessage[]>([]);
    //const [doc,setDoc] = React.useState<Doc[]>([]);
    

    const handleSendMessage = async() => {
        setMessages(prev=>[...prev,{role:"user",content:message,documents:[]}]);
        const res = await fetch('http://localhost:8000/chat?message=${message}')
        const data = await res.json();
    console.log(data["answer"]);
   //setDoc(prev=>[...prev,pageContent:data?.]);
        setMessages(prev=>[...prev,{role:"assistant",content:data?.answer?.content,documents:data?.sources}]);

    }
    return(
        <div className="p-4 ">
            <div>
              {messages.map((msg, index) => <pre key={index}> {JSON.stringify(msg,null,2) }</pre>)}
            </div>
            <div className="fixed">
                <Input placeholder="type ouemessage here" onChange={e=>setMessage(e.target.value)} value={message}/>
                <button disabled={!message.trim()} onClick={handleSendMessage}>send</button>
            </div>
        </div>
    )
}
export default ChatComponent;