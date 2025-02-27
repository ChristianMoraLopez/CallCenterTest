// components/agents/agent-card.js
import { STATUS_COLORS } from '@/data/constants';
import { formatTime, formatDate } from '@/lib/utils/formatters';

export function AgentCard({ agent }) {
  const statusColor = STATUS_COLORS[agent.status] || 'bg-gray-500';
  

  const formattedStatus = agent.status
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  return (
    <div className="bg-card/80 backdrop-blur-sm rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 border border-primary-light/20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-primary-saturated text-transparent bg-clip-text">{agent.name}</h3>
        <span className={`px-4 py-2 rounded-full text-white text-sm font-semibold ${statusColor}`}>
          {formattedStatus}
        </span>
      </div>
      <div className="text-sm text-primary-foreground/70 space-y-1">
        <p>Wait Time: <span className="font-medium">{formatTime(agent.waitTime)}</span></p>
        <p>Last Status Change: <span className="font-medium">{formatDate(agent.lastStatusChange)}</span></p>
      </div>
    </div>
  );
}