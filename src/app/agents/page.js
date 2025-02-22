'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AgentProvider } from '@/lib/context/agent-context';
import { AgentList } from '@/components/agents/agent-list';
import { AgentFilters } from '@/components/agents/agent-filters';
import { useWebSocket } from '@/lib/hooks/useWebSocket';

// Componente interno para manejar la lógica y estados
function AgentContent() {
  const { isConnected } = useWebSocket();
  const searchParams = useSearchParams();
  const status = searchParams.get('status') || 'all';

  return (
    <>
      {!isConnected && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 rounded-lg shadow-md animate-pulse">
          Attempting to connect to server...
        </div>
      )}
      <AgentFilters initialStatus={status} />
      <AgentList />
    </>
  );
}

// Componente principal
export default function AgentsPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900">
        <h1 className="text-3xl font-bold text-primary dark:text-primary-light mb-8 animate-bounce">
          Contact Center Agents
        </h1>
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary dark:border-primary-light"></div>
      </div>
    );
  }

  return (
    <AgentProvider>
      <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-50 dark:bg-gray-900">
        <h1 className="text-4xl font-bold text-primary dark:text-primary-light mb-8 text-center">
          Contact Center Agents
        </h1>
        <div className="rounded-lg shadow-lg bg-white dark:bg-gray-800 p-6">
          <AgentContent />
        </div>
      </div>
    </AgentProvider>
  );
}