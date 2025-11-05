import React, { useState, useEffect } from "react";

interface ChatProps {
  initialMessages: string[];
  onClose: (messages: string[]) => void; // callback to send messages back to Home
}

const Chat: React.FC<ChatProps> = ({ initialMessages, onClose }) => {
  const [messages, setMessages] = useState<string[]>(initialMessages);
  const [openAiConversation, setOpenAiConversation] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  interface UserData {users_id: number;username: string;age: number;gender: string;name: string;email: string;};
  const stored = localStorage.getItem("USER_DATA");
  const userData: UserData = stored ? JSON.parse(stored) as UserData
  : { users_id: 0, username: "", age: 0, gender: "", name: "", email: "" };

  useEffect(() => {
    return () => {
      // When Chat unmounts (modal closes), send messages back to Home
      onClose(messages);
    };
  }, [messages, onClose]);

  const sendMessage = async () => { // if non-empty, adds the input to the chatbot and then adds the bot answer
    if (!input) return;

    const newConversation = [...openAiConversation, { role: "user", content: input }];
    const newMessages = [...messages, `🧑 You: ${input}`];
    setOpenAiConversation(newConversation);
    setMessages(newMessages);
    try {
      const res = await fetch("http://localhost:8000/api/chatbot/chat_response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userData,messages:newConversation })
      });
      const data = await res.json();
      console.log(data.last_user_input)
      console.log(data.reply)
      console.log(data.command)
      setMessages(prev => [...prev, `🤖 Gymbo: ${data.reply}`]);
      setOpenAiConversation(prev => [...prev,{ role: "system", content: data.reply }]);

    } catch
      { setMessages(prev => [...prev, "🤖 Gymbo: Error connecting to backend"]); }
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