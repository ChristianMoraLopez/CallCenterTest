const { WebSocketServer } = require('ws');
const http = require('http');

// Crear servidor HTTP
const server = http.createServer();

// Crear servidor WebSocket
const wss = new WebSocketServer({ server });

// Array de agentes (simulado)
let agents = [
  { id: 1, name: "John Doe", status: "available", waitTime: 0, lastStatusChange: new Date().toISOString() },
  { id: 2, name: "Jane Smith", status: "on_call", waitTime: 15, lastStatusChange: new Date().toISOString() },
  { id: 3, name: "Alice Johnson", status: "available", waitTime: 0, lastStatusChange: new Date().toISOString() },
  { id: 4, name: "Bob Brown", status: "busy", waitTime: 30, lastStatusChange: new Date().toISOString() },
  { id: 5, name: "Charlie Davis", status: "on_break", waitTime: 10, lastStatusChange: new Date().toISOString() },
  { id: 6, name: "Dana White", status: "available", waitTime: 0, lastStatusChange: new Date().toISOString() },
  { id: 7, name: "Eve Black", status: "on_call", waitTime: 20, lastStatusChange: new Date().toISOString() },
  { id: 8, name: "Frank Green", status: "busy", waitTime: 45, lastStatusChange: new Date().toISOString() },
  { id: 9, name: "Grace Hall", status: "on_break", waitTime: 5, lastStatusChange: new Date().toISOString() },
  { id: 10, name: "Hank Adams", status: "available", waitTime: 0, lastStatusChange: new Date().toISOString() },
];

// Array de clientes (simulado)
let clients = [
    { id: 1, name: "Client One", waitTime: 3, priority: "low", entryTime: new Date().toISOString() },
    { id: 2, name: "Client Two", waitTime: 10, priority: "medium", entryTime: new Date().toISOString() },
    { id: 3, name: "Client Three", waitTime: 15, priority: "high", entryTime: new Date().toISOString() },
    { id: 4, name: "Client Four", waitTime: 5, priority: "low", entryTime: new Date().toISOString() },
    { id: 5, name: "Client Five", waitTime: 20, priority: "high", entryTime: new Date().toISOString() },
    { id: 6, name: "Client Six", waitTime: 8, priority: "medium", entryTime: new Date().toISOString() },
    { id: 7, name: "Client Seven", waitTime: 12, priority: "high", entryTime: new Date().toISOString() },
    { id: 8, name: "Client Eight", waitTime: 7, priority: "medium", entryTime: new Date().toISOString() },
    { id: 9, name: "Client Nine", waitTime: 4, priority: "low", entryTime: new Date().toISOString() },
    { id: 10, name: "Client Ten", waitTime: 18, priority: "high", entryTime: new Date().toISOString() },
    { id: 11, name: "Client Eleven", waitTime: 6, priority: "low", entryTime: new Date().toISOString() },
];


// Función para asignar clientes a agentes disponibles
function assignClientsToAgents() {
    // Ordenar clientes por prioridad y tiempo de espera
    clients.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority] || b.waitTime - a.waitTime;
    });
  
    // Asignar clientes a agentes disponibles
    clients.forEach(client => {
      const availableAgent = agents.find(agent => agent.status === 'available');
      if (availableAgent) {
        availableAgent.status = 'on_call';
        availableAgent.waitTime = client.waitTime;
        availableAgent.lastStatusChange = new Date().toISOString();
        clients = clients.filter(c => c.id !== client.id); // Eliminar cliente asignado
      }
    });
  }
  
  // Función para actualizar agentes
  function updateAgents() {
    const statuses = ['available', 'on_call', 'busy', 'on_break'];
    
    agents = agents.map(agent => ({
      ...agent,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      waitTime: Math.floor(Math.random() * 60),
      lastStatusChange: new Date().toISOString()
    }));
  
    // Enviar actualización a todos los clientes conectados
    wss.clients.forEach(client => {
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify({
          type: 'agents',
          data: agents
        }));
      }
    });
  }
  
  // Función para actualizar clientes
  function updateClients() {
    clients = clients.map(client => ({
      ...client,
      waitTime: client.waitTime + 1, // Increment wait time
    }));
  
    // Asignar clientes a agentes disponibles
    assignClientsToAgents();
  
    // Enviar actualización a todos los clientes conectados
    wss.clients.forEach(client => {
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify({
          type: 'clients',
          data: clients
        }));
      }
    });
  }
  
  // Manejar conexiones WebSocket
  wss.on('connection', (ws) => {
    console.log('Cliente conectado');
  
    // Enviar datos iniciales al cliente
    ws.send(JSON.stringify({
      type: 'agents',
      data: agents
    }));
    ws.send(JSON.stringify({
      type: 'clients',
      data: clients
    }));
  
    // Manejar errores
    ws.on('error', console.error);
  
    // Manejar desconexión
    ws.on('close', () => {
      console.log('Cliente desconectado');
    });
  });
  
  // Actualizar agentes y clientes cada 5 segundos
  setInterval(updateAgents, 5000);
  setInterval(updateClients, 1000);
  
  // Iniciar servidor
  const PORT = 3001;
  server.listen(PORT, () => {
    console.log(`Servidor WebSocket ejecutándose en ws://localhost:${PORT}`);
  });