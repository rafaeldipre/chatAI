import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs/promises';

class PraisonAIService {
    constructor() {
        this.agents = new Map();
    }

    async createAgent(config) {
        const agentId = `agent_${Date.now()}`;
        const configPath = path.join(process.cwd(), `temp_${agentId}.yaml`);
        const yaml = `name: ${config.name}\nrole: ${config.role}`;
        await fs.writeFile(configPath, yaml);
        this.agents.set(agentId, { configPath, status: 'ready', ...config });
        return agentId;
    }

    chatWithAgent(agentId, message, userId) {
        const agent = this.agents.get(agentId);
        if (!agent) throw new Error('Agent not found');
        return new Promise((resolve) => {
            const proc = spawn('praisonai', ['chat', '--config', agent.configPath, '--message', message]);
            let output = '';
            proc.stdout.on('data', d => output += d.toString());
            proc.on('close', () => resolve({ agentId, response: output }));
        });
    }
}

export default new PraisonAIService();
