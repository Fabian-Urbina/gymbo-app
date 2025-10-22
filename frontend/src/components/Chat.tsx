import React, { useState } from "react";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<string[]>(["🤖 Gymbo: Welcome! I'm your AI gym assistant. Let's get started!"]); // Creates a list of messages and a method to change the state of this list
  const [input, setInput] = useState(""); // Creates an empty user's input and a method to change the state of this input

  const sendMessage = async () => { // if non-empty, adds the input to the chatbot and then adds the bot answer
    if (!input) return;
    setMessages(prev => [...prev, `👤 You: ${input}`]); // Defines what setMessages will do with the current messages state
    try {
      const res = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();
      setMessages(prev => [...prev, `🤖 Gymbo: ${data.reply}`]);
    } catch { setMessages(prev => [...prev, "🤖 Gymbo: Error connecting to backend"]); }
    setInput(""); // Reset user input state
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => { if (e.key === "Enter") sendMessage(); };

  return (
    <div style={{ padding: "10px" }}>
      <h2>Gymbo Chat 0.1</h2>
      <div style={{  width: "73%", minHeight: 300, border: "1px solid #ccc", padding: 30, marginBottom: 10, overflowY: "auto" }}>
        {messages.map((msg, i) => <div key={i}>{msg}</div>)} 
      </div>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Type a message..."
        style={{ width: "70%", marginRight: 5 }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat; // Makes the module 'importable'