'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AgentProvider } from '@/lib/context/agent-context';
import { AgentList } from '@/components/agents/agent-list';
import { AgentFilters } from '@/components/agents/agent-filters';
import { useWebSocket } from '@/lib/hooks/useWebSocket';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Shield, Users } from 'lucide-react';

function AgentContent() {
  const { isConnected } = useWebSocket();
  const searchParams = useSearchParams();
  const status = searchParams.get('status') || 'all';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {!isConnected && (
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-gradient-to-r from-secondary-dark to-secondary border-l-4 border-secondary-saturated text-secondary-foreground p-6 mb-6 rounded-lg shadow-xl animate-pulse relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-secondary-saturated opacity-10 blur-xl"></div>
          <div className="flex items-center gap-3 relative z-10">
            <Zap className="h-6 w-6 text-secondary-saturated animate-pulse" />
            <span className="font-semibold">Attempting to connect to server...</span>
          </div>
        </motion.div>
      )}
      
      <div className="bg-gradient-to-br from-primary-light/10 to-secondary-light/10 backdrop-blur-sm p-6 rounded-xl border border-primary-light/30 shadow-lg">
        <AgentFilters initialStatus={status} />
        <AgentList />
      </div>
    </motion.div>
  );
}

export default function AgentsPage() {
  const [isClient, setIsClient] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  
  useEffect(() => {
    setIsClient(true);
    
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  if (!isClient) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-background to-primary-dark/10">
        <div className="relative">
          <div className="absolute -inset-10 bg-primary-saturated opacity-10 blur-3xl rounded-full"></div>
          <h1 className="text-4xl font-bold text-primary-saturated mb-8 text-center relative z-10 drop-shadow-lg">
            Contact Center Agents
          </h1>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-accent-saturated opacity-20 blur-xl rounded-full"></div>
          <div className="w-20 h-20 relative">
            <div className="absolute inset-0 rounded-full border-4 border-t-primary-saturated border-r-secondary-saturated border-b-accent-saturated border-l-info-saturated animate-spin"></div>
            <div className="absolute inset-3 rounded-full border-4 border-t-transparent border-r-primary-light border-b-transparent border-l-primary-light animate-spin animation-delay-300"></div>
            <div className="absolute inset-6 rounded-full border-2 border-secondary-saturated animate-ping"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AgentProvider>
      <div className="container mx-auto px-4 py-8 min-h-screen bg-gradient-to-br from-background via-background/95 to-primary-dark/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 relative">
            <div className="absolute -inset-10 bg-primary-saturated/20 opacity-30 blur-3xl rounded-full"></div>
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="relative z-10"
            >
              <div className="flex justify-between items-center">
                <h1 className="text-5xl font-extrabold bg-gradient-to-r from-primary-saturated via-primary to-accent-saturated text-transparent bg-clip-text drop-shadow-md">
                  Contact Center Agents
                </h1>
                <div className="bg-card/80 backdrop-blur-md px-4 py-2 rounded-full border border-primary-light/20 shadow-inner flex items-center gap-2">
                  <Shield className="h-4 w-4 text-success-saturated" />
                  <span className="text-sm font-medium text-success">{currentTime}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Users className="h-5 w-5 text-primary" />
                <p className="text-primary-foreground/70 italic">Manage and monitor your contact center agents in real-time</p>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-light via-secondary-saturated to-accent-saturated rounded-xl blur opacity-20"></div>
            <div className="relative rounded-xl overflow-hidden backdrop-blur-lg bg-card/90 shadow-2xl border border-primary-light/30">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-saturated via-secondary-saturated to-accent-saturated"></div>
              <div className="p-8">
                <AgentContent />
              </div>
            </div>
          </motion.div>
          
          <div className="mt-8 text-center text-xs text-primary-foreground/40">
            <p>© 2025 Contact Center Management System | Powered by Christian </p>
          </div>
        </div>
      </div>
    </AgentProvider>
  );
}