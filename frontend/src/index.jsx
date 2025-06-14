import React from 'react';
import { createRoot } from 'react-dom/client';
import AgentChat from './components/AgentChat.jsx';

const App = () => <AgentChat agentId="demo" agentName="Demo Agent" />;

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
