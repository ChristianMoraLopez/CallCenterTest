// src/app/api/websocket/route.js
import { WebSocketServer } from 'ws';
import { agents, updateAgents } from '@/data/agents';

const wss = new WebSocketServer({ port: 3001 });

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Send initial agents data
  ws.send(JSON.stringify({
    type: 'agents',
    data: agents
  }));

  // Set up interval to send updates
  const intervalId = setInterval(() => {
    if (ws.readyState === ws.OPEN) {
      updateAgents();
      ws.send(JSON.stringify({
        type: 'agents',
        data: agents
      }));
    }
  }, 5000);

  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(intervalId);
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

export const dynamic = 'force-dynamic';
export async function GET() {
  return new Response('WebSocket server is running', {
    status: 200,
  });
}