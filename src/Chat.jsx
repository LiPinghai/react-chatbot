import * as React from 'react';
import { useState } from "react";
import './Chat.css'
import axios from "axios";

const Default = () => {

    const [inputText, setInputText] = useState("");
    const list = []

    const [chatList, setChatList] = useState(list);

    const addChatItem = (newItem) => {
      setChatList(prevItems => [...prevItems, newItem]);
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        sendMessage();
      }
    };

    const sendMessage = async() => {

        const input = document.querySelector('.chat-text');
        const question = input.value;
        addChatItem({from:'self', content: question});
        setInputText('');
        
        const response = await axios.post("http://localhost:3005/chatbot", {
          question,
        });
        addChatItem({from:'other', content: response.data});

 
    };

    return (
      <div className='control-pane'>
        <div className="control-section">
          <h1 hidden={chatList.length}>What can I help with?</h1>
          <ul className='chat-list' hidden={!chatList.length}>
            {chatList.map((chat, index) => (
              <li className='chat-item' key={index}>
                <div className={'chat-content ' + (chat.from === 'self' ? 'chat-content-self': 'chat-content-other')  }>
                  {chat.content}
                </div>
              </li>
            ))}
          </ul>
          <div className={'chat-input '+ (chatList.length ? 'chat-input-chated' : '' )}>
            <input maxLength="500" rows="5" value={inputText} className='chat-text' type="text" onChange={(e)=>setInputText(e.target.value)} onKeyDown={handleKeyDown} placeholder="Ask me anything"/>
            <button className={'submit-button ' + (inputText ? 'inputed' : '')}  onClick={sendMessage}>↑</button>
          </div>
        </div>
      </div>);
};

export default Default;
