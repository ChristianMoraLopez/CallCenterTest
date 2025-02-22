
//src\app\clients\page.js
'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ClientProvider } from '@/lib/context/client-context';
import { ClientList } from '@/components/clients/client-list';
import { ClientFilters } from '@/components/clients/client-filters';
import { useWebSocket } from '@/lib/hooks/useWebSocket';

// Componente interno para manejar la lógica y estados
function ClientContent() {
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
      <ClientFilters initialStatus={status} />
      <ClientList />
    </>
  );
}

// Componente principal
export default function ClientsPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900">
        <h1 className="text-3xl font-bold text-primary dark:text-primary-light mb-8 animate-bounce">
          Contact Center Clients
        </h1>
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary dark:border-primary-light"></div>
      </div>
    );
  }

  return (
    <ClientProvider>
      <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-50 dark:bg-gray-900">
        <h1 className="text-4xl font-bold text-primary dark:text-primary-light mb-8 text-center">
          Contact Center Clients
        </h1>
        <div className="rounded-lg shadow-lg bg-white dark:bg-gray-800 p-6">
          <ClientContent />
        </div>
      </div>
    </ClientProvider>
  );
}