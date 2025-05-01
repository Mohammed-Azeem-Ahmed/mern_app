import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    fetch('/api/messages')
      .then(res => res.json())
      .then(data => setMessages(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    const newMsg = await res.json();
    setMessages([...messages, newMsg]);
    setText('');
  };

  return (
    <div className="App">
      <h1>💬 MERN Message Board</h1>
      <form onSubmit={handleSubmit}>
        <input value={text} onChange={e => setText(e.target.value)} required />
        <button type="submit">Send</button>
      </form>
      <ul>
        {messages.map((m, i) => (
          <li key={i}>{m.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
