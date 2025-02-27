// src/lib/hooks/useWebSocket.js
import { useEffect, useRef, useState } from 'react';
import { useAgents } from '../../context/AgentContext';

export function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const [wsAgents, setWsAgents] = useState([]);
  const { setAgents } = useAgents(); 
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
              // Almacenar los datos del WebSocket
              setWsAgents(message.data);
              // Actualizar el contexto con los datos en tiempo real (opcional)
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
  }, [setAgents]);

  return { 
    isConnected, 
    wsAgents // Datos desde WebSocket, si necesitas separar la fuente
  };
}