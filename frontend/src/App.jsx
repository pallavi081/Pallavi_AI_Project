import { useState } from "react";
import aiAvatar from "./assets/ai-avatar.png";
import "./App.css";

export default function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [dark, setDark] = useState(true);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setChat((prev) => [...prev, { from: "user", text: message }]);

    const res = await fetch(
      "https://pallavi-ai-backend.onrender.com/chat",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      }
    );

    const data = await res.json();
    setChat((prev) => [...prev, { from: "ai", text: data.reply }]);
    setMessage("");
  };

  return (
    <div className={dark ? "app dark" : "app"}>
      {/* HEADER */}
      <div className="header">
        <div className="profile">
          <img src={aiAvatar} alt="AI" />
          <div>
            <h3>Pallavi AI</h3>
            <span>online</span>
          </div>
        </div>
        <button className="mode-btn" onClick={() => setDark(!dark)}>
          {dark ? "☀" : "🌙"}
        </button>
      </div>

      {/* CHAT */}
      <div className="chat">
        {chat.map((c, i) => (
          <div key={i} className={`bubble ${c.from}`}>
            {c.text}
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div className="input-area">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>➤</button>
      </div>
    </div>
  );
}
