// src/lib/hooks/useWebSocket.js
import { useEffect, useRef, useState } from 'react';

export function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const [agents, setAgents] = useState([]);
  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const connect = () => {
      try {
        const ws = new WebSocket('ws://localhost:3001');

        ws.onopen = () => {
          console.log('Conectado al servidor WebSocket');
          setIsConnected(true);
        };

        ws.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data);
            if (message.type === 'agents') {
              setAgents(message.data);
            }
          } catch (error) {
            console.error('Error al procesar mensaje:', error);
          }
        };

        ws.onclose = () => {
          console.log('Desconectado del servidor WebSocket');
          setIsConnected(false);
          
          // Intentar reconectar después de 2 segundos
          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, 2000);
        };

        wsRef.current = ws;
      } catch (error) {
        console.error('Error al crear conexión WebSocket:', error);
      }
    };

    connect();

    // Limpieza
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  return { isConnected, agents };
}