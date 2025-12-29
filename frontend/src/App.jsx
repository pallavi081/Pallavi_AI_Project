import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [femaleVoice, setFemaleVoice] = useState(null);

  // Load voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const female = voices.find(v =>
        v.name.toLowerCase().includes("female") ||
        v.name.toLowerCase().includes("zira") ||
        v.name.toLowerCase().includes("samantha")
      );
      setFemaleVoice(female || voices[0]);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    if (femaleVoice) utterance.voice = femaleVoice;
    utterance.rate = 1;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = { sender: "You", text: message };
    setMessages(prev => [...prev, userMsg]);

    const res = await fetch("http://127.0.0.1:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    const aiMsg = { sender: "Pallavi AI", text: data.reply };

    setMessages(prev => [...prev, aiMsg]);
    speak(data.reply);
    setMessage("");
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>🤖 Pallavi AI Assistant</h1>

      <div style={{
        border: "1px solid #ccc",
        padding: "15px",
        height: "300px",
        overflowY: "auto",
        marginBottom: "15px"
      }}>
        {messages.map((msg, i) => (
          <p key={i}>
            <strong>{msg.sender}:</strong> {msg.text}
          </p>
        ))}
      </div>

      <input
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Type your message..."
        style={{ padding: "10px", width: "70%" }}
      />

      <button onClick={sendMessage} style={{ padding: "10px 20px", marginLeft: "10px" }}>
        Send
      </button>
    </div>
  );
}

export default App;
