import PraisonAIService from '../services/praisonai-service.js';
import { sendToLLM } from '../services/llm-service.js';
import { sendToMCP } from '../services/mcp-client.js';

class ChatController {
    async sendMessage(req, res) {
        const { message, type, targetId } = req.body;
        const userId = req.headers['x-user'] || 'anonymous';

        try {
            let response;
            switch(type) {
                case 'llm':
                    response = await sendToLLM(targetId, message);
                    break;
                case 'agent':
                    response = await PraisonAIService.chatWithAgent(targetId, message, userId);
                    break;
                case 'mcp':
                    response = await sendToMCP(targetId, message);
                    break;
                default:
                    response = { text: 'Unknown type' };
            }
            res.json({ success: true, response });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async createAgent(req, res) {
        const { name, role, goal, backstory, tools, model } = req.body;
        try {
            const agentId = await PraisonAIService.createAgent({ name, role, goal, backstory, tools, model });
            res.json({ success: true, agentId });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default new ChatController();
