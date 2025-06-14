import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const AgentChat = ({ agentId, agentName }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const s = io('/');
    setSocket(s);
    s.on('agent_response_chunk', data => {
      if (data.agentId === agentId) {
        setMessages(prev => [...prev, { from: 'agent', text: data.chunk }]);
      }
    });
    return () => s.disconnect();
  }, [agentId]);

  const send = async () => {
    setMessages(prev => [...prev, { from: 'user', text: input }]);
    await fetch('/api/chat/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input, type: 'agent', targetId: agentId })
    });
    setInput('');
  };

  return (
    <div>
      <h3>Chat with {agentName}</h3>
      <div>
        {messages.map((m, i) => <div key={i}>{m.from}: {m.text}</div>)}
      </div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={send}>Send</button>
    </div>
  );
};

export default AgentChat;
