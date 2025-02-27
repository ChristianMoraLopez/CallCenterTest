// src/context/AgentContext.js
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchAgents, updateAgentStatus } from '@/services/api';

const AgentContext = createContext();

export function AgentProvider({ children }) {
  const [agents, setAgents] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar agentes usando Fetch API
  const loadAgents = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchAgents();
      setAgents(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar agentes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar datos al iniciar
  useEffect(() => {
    loadAgents();
    
    // Opcional: configurar intervalo para refrescar datos periódicamente
    const intervalId = setInterval(loadAgents, 30000); // Cada 30 segundos
    
    return () => clearInterval(intervalId);
  }, [loadAgents]);

  // Filtrar agentes según el status seleccionado
  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredAgents(agents);
    } else {
      setFilteredAgents(agents.filter(agent => agent.status === statusFilter));
    }
  }, [statusFilter, agents]);

  // Actualizar estado del agente usando Fetch API
  const updateAgentStatusHandler = useCallback(async (agentId, newStatus) => {
    try {
      const updatedAgent = await updateAgentStatus(agentId, newStatus);
      
      // Actualizar el estado local
      setAgents(prevAgents =>
        prevAgents.map(agent =>
          agent.id === agentId ? updatedAgent : agent
        )
      );
      
      return updatedAgent;
    } catch (err) {
      console.error('Error al actualizar el estado del agente:', err);
      throw err;
    }
  }, []);

  return (
    <AgentContext.Provider value={{ 
      agents: filteredAgents, 
      allAgents: agents,
      setAgents, 
      statusFilter, 
      setStatusFilter, 
      updateAgentStatus: updateAgentStatusHandler,
      refreshAgents: loadAgents,
      loading,
      error
    }}>
      {children}
    </AgentContext.Provider>
  );
}

export const useAgents = () => {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error('useAgents must be used within an AgentProvider');
  }
  return context;
};