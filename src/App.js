import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState(""); 
  const [url, setUrl] = useState(""); 

  const sendMessage = async () => {
    if (!url.trim()) {
      alert("Please provide a URL to analyze!");
      return;
    }

    if (!userInput.trim()) {
      alert("Please enter a question!");
      return;
    }

    const newMessages = [
      ...messages,
      { sender: "user", text: userInput.trim() },
    ];
    setMessages(newMessages); 

    try {
     
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, question: userInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw new Error(data.detail || "Error from server");
      }

    
      setMessages([
        ...newMessages,
        { sender: "bot", text: data.response || "I couldn't process that!" },
      ]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { sender: "bot", text: "An error occurred. Please try again!" },
      ]);
      console.error("Error sending message:", error);
    }

    setUserInput(""); 
  };

  
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      <h1>Website Analysis Chatbot</h1>

     
      <div className="url-input">
        <input
          type="text"
          placeholder="Enter a website URL (e.g., example.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>

     
      <div className="chat-history">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.sender === "user" ? "user-message" : "bot-response"}
          >
            {msg.text}
          </div>
        ))}
      </div>

   
      <div className="input-area">
        <input
          type="text"
          placeholder="Type your question here..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default App;
