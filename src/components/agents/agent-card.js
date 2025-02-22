// components/agents/agent-card.js
import { STATUS_COLORS } from '@/data/constants';
import { formatTime, formatDate } from '@/lib/utils/formatters';

export function AgentCard({ agent }) {
  const statusColor = STATUS_COLORS[agent.status];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-primary-DEFAULT">{agent.name}</h3>
        <span className={`px-4 py-2 rounded-full text-white text-sm font-semibold ${statusColor}`}>
          {agent.status.replace('_', ' ')}
        </span>
      </div>
      <div className="text-sm text-gray-600 space-y-1">
        <p>Wait Time: <span className="font-medium">{formatTime(agent.waitTime)}</span></p>
        <p>Last Status Change: <span className="font-medium">{formatDate(agent.lastStatusChange)}</span></p>
      </div>
    </div>
  );
}
