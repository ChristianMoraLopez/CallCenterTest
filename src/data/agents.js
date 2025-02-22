// src/data/agents.js

export let agents = [
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
  { id: 11, name: "Ivy Nelson", status: "busy", waitTime: 25, lastStatusChange: new Date().toISOString() },
  { id: 12, name: "Jack Wilson", status: "on_call", waitTime: 35, lastStatusChange: new Date().toISOString() },
];

// Función para actualizar el estado de los agentes
export function updateAgents() {
  agents = agents.map(agent => {
    const statuses = ['available', 'on_call', 'busy', 'on_break'];
    const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const newWaitTime = Math.floor(Math.random() * 60); // Tiempo aleatorio entre 0 y 59 minutos

    return {
      ...agent,
      status: newStatus,
      waitTime: newWaitTime,
      lastStatusChange: new Date().toISOString(),
    };
  });
}

// Ejecutar la función de actualización cada 5 segundos
setInterval(updateAgents, 5000);
