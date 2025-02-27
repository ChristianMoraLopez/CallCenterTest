import { useEffect, useRef, useState } from 'react';
import { useAgents } from '@/lib/context/agent-context';
import { useClients } from '@/lib/context/client-context';
import { agents as localAgents } from '@/data/agents';
import { clients as localClients } from '@/data/clients';

export function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const { setAgents } = useAgents();
  const { setClients } = useClients(); // Usa setClients del contexto de clientes
  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const connect = () => {
      try {
        const ws = new WebSocket('ws://localhost:3001');

        ws.onopen = () => {
          console.log('Connected to WebSocket server');
          setIsConnected(true);
        };

        ws.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data);
            if (message.type === 'agents') {
              setAgents(message.data); // Actualiza agentes
            } else if (message.type === 'clients') {
              setClients(message.data); // Actualiza clientes
            }
          } catch (error) {
            console.error('Error processing message:', error);
          }
        };

        ws.onclose = () => {
          console.log('Disconnected from WebSocket server');
          setIsConnected(false);

          // Fallback a datos locales
          setAgents(localAgents);
          setClients(localClients);

          // Intenta reconectar después de 2 segundos
          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, 2000);
        };

        wsRef.current = ws;
      } catch (error) {
        console.error('Error creating WebSocket connection:', error);

        // Fallback a datos locales
        setAgents(localAgents);
        setClients(localClients);
      }
    };

    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [setAgents, setClients]);

  return { isConnected };
}