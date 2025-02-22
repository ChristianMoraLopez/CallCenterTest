
// components/clients/client-list.js
import { useClients } from '@/lib/context/client-context';
import { ClientCard } from './client-card';

export function ClientList() {
  const { clients } = useClients();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {clients.map(client => (
        <ClientCard key={client.id} client={client} />
      ))}
    </div>
  );
}