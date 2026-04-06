import { useRef , useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import './ChatMessages.css';


  function ChatMessages({chatMessages}){

      const chatMessageRef = useRef(null);

      useEffect(()=>{
       const containerElement = chatMessageRef.current;

        if(containerElement){
          containerElement.scrollTop = containerElement.scrollHeight;
        }

      },[chatMessages]);

        return (
          <div className = "chat-message-container" ref = {chatMessageRef}>

            {chatMessages.map((chatMessage1)=>{
                return (
                  <ChatMessage
                    message = {chatMessage1.message}
                    sender =  {chatMessage1.sender}
                    key =     {chatMessage1.id}
                  />
                );
            })}
          </div>

        );

    }


    export default ChatMessages;