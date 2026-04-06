import { useState } from "react";
import { Chatbot } from "supersimpledev";
import './ChatInput.css';


export function ChatInput({chatMessages,setChatMessages}){
       const [inputText, setInputText] = useState('');
       const [isLoading, setIsLoading] = useState(false);

        function saveInputText(event){
          setInputText(event.target.value);

        }

      async function sendMessage(){

        if(isLoading || !inputText.trim() === ''){
          return;
        }

          const userMessage = inputText;
          setInputText('');
          setIsLoading(true);

          
          const newChatMessages = [
            ...chatMessages,
            {
              message: userMessage,
              sender : 'user',
              id : crypto.randomUUID()
            }
          ];

          // show loading message
             setChatMessages([
            ...newChatMessages,
            // this create a temproary loading message
            {
              message: 'Loading',
              sender : 'robot',
              id : crypto.randomUUID()
            }
          ]);

          //  setChatMessages(newChatMessages);

          const response = await Chatbot.getResponseAsync(userMessage);
            // replace loading message with actual response
           setChatMessages([
            ...newChatMessages,
            {
              message: response,
              sender : 'robot',
              id : crypto.randomUUID()
            }
          ]);

          setIsLoading(false);

        }

        function handleKeyDown(event){
          if(event.key === 'Enter'){
            event.preventDefault();
            sendMessage();
          }
          else if(event.key === 'Escape'){
            setInputText('');
          }

        }


        
        return (
          <div className = "chat-input-container">
            <input
              placeholder = "Send a message to Chatbot" 
              size = "30" 
              onChange = {saveInputText}
              value = {inputText}
              className = "chat-input"
              onKeyDown={handleKeyDown}
            />
            <button 
            onClick = {sendMessage}
            className = "send-button"
            >Send</button>
          </div>
        );
      }