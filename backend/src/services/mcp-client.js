import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

let client = null;
let transport = null;
let connecting = null;

async function ensureClient() {
    if (client) return client;
    if (connecting) return connecting;

    const command = process.env.MCP_COMMAND;
    if (!command) {
        throw new Error('MCP_COMMAND environment variable not set');
    }
    const argsEnv = process.env.MCP_ARGS;
    let args = [];
    if (argsEnv) {
        try {
            args = JSON.parse(argsEnv);
        } catch {
            args = argsEnv.split(' ');
        }
    }

    client = new Client({ name: 'chat-backend', version: '0.1.0' });
    transport = new StdioClientTransport({ command, args });
    connecting = client.connect(transport).then(() => client);
    await connecting;
    connecting = null;
    return client;
}

export async function sendToMCP(toolName, message) {
    const c = await ensureClient();
    const result = await c.callTool({
        name: toolName,
        arguments: { message }
    });
    return result;
}
