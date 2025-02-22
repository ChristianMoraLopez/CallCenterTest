import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ClientContext = createContext();

export function ClientProvider({ children }) {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [waitTimeFilter, setWaitTimeFilter] = useState(0);

  useEffect(() => {
    if (clients.length === 0) {
      setFilteredClients([]);
    } else {
      setFilteredClients(clients.filter(client => client.waitTime >= waitTimeFilter));
    }
  }, [waitTimeFilter, clients]);

  const addClient = useCallback((newClient) => {
    setClients(prevClients => [
      ...prevClients,
      { ...newClient, joinedAt: new Date().toISOString(), waitTime: 0 }
    ]);
  }, []);

  return (
    <ClientContext.Provider value={{ 
      clients: filteredClients, 
      setClients, 
      waitTimeFilter, 
      setWaitTimeFilter, 
      addClient 
    }}>
      {children}
    </ClientContext.Provider>
  );
}

export const useClients = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error('useClients must be used within a ClientProvider');
  }
  return context;
};
