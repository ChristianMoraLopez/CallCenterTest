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
  { id: 4, name: "Bob Brown", status: "offline", waitTime: 30, lastStatusChange: new Date().toISOString() }, 
  { id: 5, name: "Charlie Davis", status: "break", waitTime: 10, lastStatusChange: new Date().toISOString() }, 
  { id: 6, name: "Dana White", status: "available", waitTime: 0, lastStatusChange: new Date().toISOString() },
  { id: 7, name: "Eve Black", status: "on_call", waitTime: 20, lastStatusChange: new Date().toISOString() },
  { id: 8, name: "Frank Green", status: "offline", waitTime: 45, lastStatusChange: new Date().toISOString() }, 
  { id: 9, name: "Grace Hall", status: "break", waitTime: 5, lastStatusChange: new Date().toISOString() }, 
  { id: 10, name: "Hank Adams", status: "available", waitTime: 0, lastStatusChange: new Date().toISOString() },
  { id: 11, name: "Ivy Nelson", status: "offline", waitTime: 25, lastStatusChange: new Date().toISOString() }, 
  { id: 12, name: "Jack Wilson", status: "on_call", waitTime: 35, lastStatusChange: new Date().toISOString() },
  { id: 13, name: "Dana White", status: "available", waitTime: 0, lastStatusChange: new Date().toISOString() },
  { id: 14, name: "Eve Black", status: "on_call", waitTime: 20, lastStatusChange: new Date().toISOString() },
  { id: 15, name: "Frank Green", status: "offline", waitTime: 45, lastStatusChange: new Date().toISOString() }, 
  { id: 16, name: "Grace Hall", status: "break", waitTime: 5, lastStatusChange: new Date().toISOString() }, 
  { id: 17, name: "Hank Adams", status: "available", waitTime: 0, lastStatusChange: new Date().toISOString() },
  { id: 18, name: "Ivy Nelson", status: "offline", waitTime: 25, lastStatusChange: new Date().toISOString() }, 
  { id: 19, name: "Jack Wilson", status: "on_call", waitTime: 35, lastStatusChange: new Date().toISOString() },
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
];

// Función para generar nuevos clientes aleatorios
function generateRandomClients() {
  const names = [
    "Client Eleven", "Client Twelve", "Client Thirteen", "Client Fourteen", "Client Fifteen",
    "Client Sixteen", "Client Seventeen", "Client Eighteen", "Client Nineteen", "Client Twenty"
  ];
  const priorities = ["low", "medium", "high"];
  const randomCount = Math.floor(Math.random() * 10) + 1; // Generar entre 1 y 10 clientes

  for (let i = 0; i < randomCount; i++) {
    const newClient = {
      id: clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1,
      name: names[Math.floor(Math.random() * names.length)],
      waitTime: Math.floor(Math.random() * 20) + 1, // Tiempo de espera entre 1 y 20
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      entryTime: new Date().toISOString(),
    };
    clients.push(newClient);
  }
}

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
  statuses = ['available', 'on_call', 'break', 'offline'];

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
    waitTime: client.waitTime + 1, // Incrementar tiempo de espera
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

// Actualizar agentes cada 5 segundos
setInterval(updateAgents, 5000);

// Actualizar clientes cada segundo
setInterval(updateClients, 1000);

// Generar nuevos clientes aleatorios cada 10 segundos
setInterval(generateRandomClients, 5000);

// Iniciar servidor
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Servidor WebSocket ejecutándose en ws://localhost:${PORT}`);
});