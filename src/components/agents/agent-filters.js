
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
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Filter by Status
      </label>
      <select
        className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md"
        value={initialStatus}
        onChange={(e) => handleStatusChange(e.target.value)}
      >
        <option value="all">All Statuses</option>
        {Object.values(AGENT_STATUSES).map(status => (
          <option key={status} value={status}>
            {status.replace('_', ' ')}
          </option>
        ))}
      </select>
    </div>
  );
}