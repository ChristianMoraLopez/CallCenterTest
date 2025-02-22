
// components/agents/agent-list.js
import { useAgents } from '@/lib/context/agent-context';
import { AgentCard } from './agent-card';

export function AgentList() {
  const { agents } = useAgents();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {agents.map(agent => (
        <AgentCard key={agent.id} agent={agent} />
      ))}
    </div>
  );
}
