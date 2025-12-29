import { useState, useEffect } from "react";
import "./App.css";





export default function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [dark, setDark] = useState(true);
  const [voices, setVoices] = useState([]);

  // ✅ Load voices properly (VERY IMPORTANT)
  useEffect(() => {
    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      setVoices(v);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

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
    const aiReply = data.reply;

    setChat((prev) => [...prev, { from: "ai", text: aiReply }]);

    // 🔊 FEMALE AI VOICE (STRICTLY FEMALE)
    const speech = new SpeechSynthesisUtterance(aiReply);
    speech.lang = "en-US";
    speech.rate = 1;
    speech.pitch = 1.3; // more feminine tone

    // ✅ FORCE REAL FEMALE VOICES
    const femaleVoice =
      voices.find(v => v.name.includes("Google US English Female")) ||
      voices.find(v => v.name.includes("Microsoft Zira")) ||
      voices.find(v => v.name.includes("Samantha")) ||
      voices.find(v => v.gender === "female") ||
      voices[0];

    if (femaleVoice) {
      speech.voice = femaleVoice;
    }

    window.speechSynthesis.cancel(); // stop previous speech
    window.speechSynthesis.speak(speech);
    // 🔊 END FEMALE VOICE

    setMessage("");
  };

  return (
    <div className={dark ? "app dark" : "app"}>
      {/* HEADER */}
      <div className="header">
  <div className="profile">
    <img src="/ai-avatar.png" alt="AI Avatar" className="avatar" />


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
