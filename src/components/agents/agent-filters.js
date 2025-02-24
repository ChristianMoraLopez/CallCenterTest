
// components/agents/agent-filters.js
import { useAgents } from '@/lib/context/agent-context';
import { AGENT_STATUSES } from '@/data/constants';
import { useRouter } from 'next/navigation';

export function AgentFilters({ initialStatus }) {
  const { setStatusFilter } = useAgents();
  const router = useRouter();
  
  const handleStatusChange = (status) => {
    setStatusFilter(status);
    router.push(`/agents?status=${status}`);
  };
  
  return (
    <div className="mb-6 bg-card/60 backdrop-blur-sm p-4 rounded-lg border border-primary-light/20 shadow-inner">
      <label className="block text-sm font-medium text-primary-foreground mb-2">
        Filter by Status
      </label>
      <select
        className="w-full md:w-64 px-3 py-2 bg-background/80 border border-primary-light/30 rounded-md text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary-saturated"
        value={initialStatus || 'all'}
        onChange={(e) => handleStatusChange(e.target.value)}
      >
        <option value="all">All Statuses</option>
        {Object.entries(AGENT_STATUSES).map(([key, value]) => (
          <option key={value} value={value}>
            {value.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </option>
        ))}
      </select>
    </div>
  );
}