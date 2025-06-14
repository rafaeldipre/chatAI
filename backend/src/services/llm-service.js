import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const connectors = {
    openai: async (model, message) => {
        const apiKey = process.env.OPENAI_API_KEY;
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model,
            messages: [{ role: 'user', content: message }]
        }, {
            headers: { 'Authorization': `Bearer ${apiKey}` }
        });
        return response.data;
    },
    anthropic: async (model, message) => {
        const apiKey = process.env.ANTHROPIC_API_KEY;
        const response = await axios.post('https://api.anthropic.com/v1/messages', {
            model,
            messages: [{ role: 'user', content: message }]
        }, {
            headers: { 'x-api-key': apiKey }
        });
        return response.data;
    },
    // Add connectors for gemini, groq, ollama as needed
};

export async function sendToLLM(provider, message) {
    if (connectors[provider]) {
        return connectors[provider](provider, message);
    }
    throw new Error('Provider not supported');
}
