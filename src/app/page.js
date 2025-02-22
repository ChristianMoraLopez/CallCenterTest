"use client";

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus, Activity, Clock, ArrowRight } from "lucide-react";
import { useAgents } from '@/lib/context/agent-context';
import { useClients } from '@/lib/context/client-context';

export default function HomePage() {
  const { agents = [] } = useAgents() ?? { agents: [] };
  const { clients = [] } = useClients() ?? { clients: [] };

  const stats = [
    { label: "Active Agents", value: agents.filter(agent => agent.status === 'available').length, icon: Users, color: "text-green-600" },
    { label: "Waiting Clients", value: clients.length, icon: Clock, color: "text-orange-600" },
    { label: "Avg. Response Time", value: "2m", icon: Activity, color: "text-blue-600" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 animate-pulse">Dashboard Overview</h1>
        <p className="text-slate-500 text-lg">Monitor your contact center performance in real-time</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="transform hover:scale-105 transition-transform">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold text-slate-600">
                {stat.label}
              </CardTitle>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Link href="/agents">
          <Card className="hover:shadow-xl transition-shadow transform hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Users className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-semibold">Agent Management</span>
              </CardTitle>
              <CardDescription className="text-gray-600">Monitor and manage your agent workforce</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <span className="text-blue-600 font-medium">View Agent Dashboard</span>
              <ArrowRight className="h-5 w-5" />
            </CardContent>
          </Card>
        </Link>

        <Link href="/clients">
          <Card className="hover:shadow-xl transition-shadow transform hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <UserPlus className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-semibold">Client Queue</span>
              </CardTitle>
              <CardDescription className="text-gray-600">Track and manage waiting clients</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <span className="text-blue-600 font-medium">View Client Queue</span>
              <ArrowRight className="h-5 w-5" />
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
