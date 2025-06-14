# Multi-LLM Chat Application

This is a minimal prototype of a chat application with support for multiple LLM providers, MCP connections and PraisonAI agents.

## Project structure
```
backend/ - Node.js Express server
frontend/ - React interface built with webpack
```

## Setup

### Backend
1. `cd backend`
2. `npm install`
3. Create `.env` and add your API keys, e.g.
```
OPENAI_API_KEY=your-key
ANTHROPIC_API_KEY=your-key
```
4. `npm start`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm start`

The frontend dev server runs on http://localhost:3000 and proxies API requests to the backend on port 3001.

## Usage
- Open the frontend in the browser and chat with the demo agent.
- Agents are run through the `praisonai` command line tool which must be installed separately.
- LLM connectors for OpenAI and Anthropic are implemented. Other providers can be added in `backend/src/services/llm-service.js`.

## MCP
MCP integration is represented by a stub in `backend/src/services/mcp-client.js`. Implement your own logic to connect via STDIO or SSE.

## PraisonAI
The PraisonAI integration spawns the `praisonai` CLI. Agents are defined in temporary YAML files.

## License
MIT
