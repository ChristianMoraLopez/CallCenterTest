// src/context/ClientContext.js
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchClients, addClient as apiAddClient, updateClientWaitTime } from '@/services/api';; 

const ClientContext = createContext();

export function ClientProvider({ children }) {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [waitTimeFilter, setWaitTimeFilter] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar clientes usando Fetch API
  const loadClients = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchClients();
      setClients(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar clientes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar datos al iniciar
  useEffect(() => {
    loadClients();
    
    // Opcional: configurar intervalo para refrescar datos periódicamente
    const intervalId = setInterval(loadClients, 30000); // Cada 30 segundos
    
    return () => clearInterval(intervalId);
  }, [loadClients]);

  // Filtrar clientes según el tiempo de espera seleccionado
  useEffect(() => {
    if (waitTimeFilter === 0) {
      setFilteredClients(clients);
    } else {
      setFilteredClients(clients.filter(client => client.waitTime >= waitTimeFilter));
    }
  }, [waitTimeFilter, clients]);

  // Añadir un nuevo cliente usando Fetch API
  const addClientHandler = useCallback(async (newClient) => {
    try {
      const addedClient = await apiAddClient(newClient);
      setClients(prevClients => [
        ...prevClients,
        { ...addedClient, joinedAt: new Date().toISOString(), waitTime: 0 }
      ]);
      return addedClient;
    } catch (err) {
      console.error('Error al añadir el cliente:', err);
      throw err;
    }
  }, []);

  // Actualizar el tiempo de espera de un cliente usando Fetch API
  const updateClientWaitTimeHandler = useCallback(async (clientId, newWaitTime) => {
    try {
      const updatedClient = await updateClientWaitTime(clientId, newWaitTime);
      
      // Actualizar el estado local
      setClients(prevClients =>
        prevClients.map(client =>
          client.id === clientId ? updatedClient : client
        )
      );
      
      return updatedClient;
    } catch (err) {
      console.error('Error al actualizar el tiempo de espera del cliente:', err);
      throw err;
    }
  }, []);

  return (
    <ClientContext.Provider value={{ 
      clients: filteredClients, 
      allClients: clients,
      setClients, 
      waitTimeFilter, 
      setWaitTimeFilter, 
      addClient: addClientHandler,
      updateClientWaitTime: updateClientWaitTimeHandler,
      refreshClients: loadClients,
      loading,
      error
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