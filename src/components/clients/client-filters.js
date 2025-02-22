
// components/clients/client-filters.js
import { useClients } from '@/lib/context/client-context';
import { useRouter } from 'next/navigation';

export function ClientFilters({ initialWaitTime }) {
  const { setWaitTimeFilter } = useClients();
  const router = useRouter();

  const handleWaitTimeChange = (waitTime) => {
    setWaitTimeFilter(parseInt(waitTime));
    router.push(`/clients?waitTime=${waitTime}`);
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Filter by Minimum Wait Time (seconds)
      </label>
      <input
        type="number"
        className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md"
        value={initialWaitTime}
        onChange={(e) => handleWaitTimeChange(e.target.value)}
        min="0"
        step="60"
      />
    </div>
  );
}