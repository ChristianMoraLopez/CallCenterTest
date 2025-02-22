
// components/clients/client-card.js

import { formatTime, formatDate } from '@/lib/utils/formatters';

// Mapeo de prioridades a colores
const PRIORITY_COLORS = {
  high: 'bg-red-500',
  medium: 'bg-yellow-500',
  low: 'bg-green-500',
};

export function ClientCard({ client }) {
  // Obtener el color basado en la prioridad
  const priorityColor = PRIORITY_COLORS[client.priority.toLowerCase()];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-secondary-DEFAULT">{client.name}</h3>
        <span className={`px-4 py-2 rounded-full text-white text-sm font-semibold ${priorityColor}`}>
          Priority {client.priority}
        </span>
      </div>
      <div className="text-sm text-gray-600 space-y-1">
        <p>Wait Time: <span className="font-medium">{formatTime(client.waitTime)}</span></p>
        <p>Joined At: <span className="font-medium">{formatDate(client.entryTime)}</span></p>
      </div>
    </div>
  );
}
