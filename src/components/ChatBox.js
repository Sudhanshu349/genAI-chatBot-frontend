"use client";

import { useState } from "react";
import { sendMessage } from "../services/api";
import "./chatbox.css";

export default function ChatBox() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const handleSend = async () => {
    if (!message) return;

    const userMsg = { role: "user", text: message };
    setChat((prev) => [...prev, userMsg]);

    const reply = await sendMessage(message);

    const aiMsg = { role: "ai", text: reply };
    setChat((prev) => [...prev, aiMsg]);

    setMessage("");
  };

  return (
    <div className="chat-page">
      <div className="chat-container">

        <div className="chat-title">MY AI Chat</div>

        <div className="chat-messages">
          {chat.map((msg, i) => (
            <div
              key={i}
              className={`message ${msg.role === "user" ? "user" : "ai"}`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask something..."
          />

          <button onClick={handleSend}>
            Send
          </button>
        </div>

      </div>
    </div>
  );
}