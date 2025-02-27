import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AgentContext = createContext();

export function AgentProvider({ children }) {
  const [agents, setAgents] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter agents based on status
  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredAgents(agents);
    } else {
      setFilteredAgents(agents.filter(agent => agent.status === statusFilter));
    }
  }, [statusFilter, agents]);

  // Update agent status
  const updateAgentStatus = useCallback((agentId, newStatus) => {
    setAgents(prevAgents =>
      prevAgents.map(agent =>
        agent.id === agentId
          ? { ...agent, status: newStatus, lastStatusChange: new Date().toISOString() }
          : agent
      )
    );
  }, []);

  return (
    <AgentContext.Provider value={{ 
      agents: filteredAgents, 
      setAgents, 
      statusFilter, 
      setStatusFilter, 
      updateAgentStatus,
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