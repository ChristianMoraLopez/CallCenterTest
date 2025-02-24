"use client";

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus, Activity, Clock, ArrowRight, TrendingUp, Award, Bell } from "lucide-react";
import { useAgents } from '@/lib/context/agent-context';
import { useClients } from '@/lib/context/client-context';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const { agents = [] } = useAgents() ?? { agents: [] };
  const { clients = [] } = useClients() ?? { clients: [] };
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Animation effect on load
    setIsLoaded(true);
  }, []);

  const stats = [
    { 
      label: "Active Agents", 
      value: agents.filter(agent => agent.status === 'available').length, 
      icon: Users, 
      color: "text-success-DEFAULT",
      bgColor: "bg-success-light/20",
      borderColor: "border-success-dark/30",
      gradientFrom: "from-success-light/5",
      gradientTo: "to-success-DEFAULT/10",
    },
    { 
      label: "Waiting Clients", 
      value: clients.length, 
      icon: Clock, 
      color: "text-warning-DEFAULT",
      bgColor: "bg-warning-light/20",
      borderColor: "border-warning-dark/30",
      gradientFrom: "from-warning-light/5",
      gradientTo: "to-warning-DEFAULT/10",
    },
    { 
      label: "Avg. Response Time", 
      value: "2m", 
      icon: Activity, 
      color: "text-info-DEFAULT",
      bgColor: "bg-info-light/20",
      borderColor: "border-info-dark/30",
      gradientFrom: "from-info-light/5",
      gradientTo: "to-info-DEFAULT/10",
    },
  ];

  const features = [
    {
      title: "Agent Analytics",
      description: "Track performance metrics and optimize agent productivity",
      icon: TrendingUp,
      color: "primary",
      path: "/agents/analytics"
    },
    {
      title: "Client Insights",
      description: "Understand client patterns and improve satisfaction",
      icon: Award,
      color: "secondary",
      path: "/clients/insights"
    },
    {
      title: "Notifications",
      description: "Stay updated with real-time alerts and updates",
      icon: Bell,
      color: "accent",
      path: "/notifications"
    }
  ];

  return (
    <div className={`container mx-auto px-4 py-8 transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Header Section with Gradient */}
      <div className="relative mb-12 rounded-2xl overflow-hidden p-8 bg-gradient-to-r from-primary-light/30 via-secondary-light/20 to-accent-light/30">
        <div className="absolute top-0 left-0 w-full h-full bg-white/5 backdrop-blur-sm"></div>
        <div className="relative z-10 space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-primary-foreground drop-shadow-sm">
            Dashboard Overview
          </h1>
          <p className="text-secondary-foreground text-lg max-w-2xl">
            Monitor your contact center performance in real-time with advanced analytics and insights
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-primary-DEFAULT via-secondary-DEFAULT to-accent-DEFAULT rounded-full"></div>
        </div>
      </div>

      {/* Stats Section with Enhanced Cards */}
      <div className="grid gap-6 md:grid-cols-3 mb-12">
        {stats.map((stat, index) => (
          <Card 
            key={index} 
            className={`transform hover:scale-105 transition-all duration-300 ${stat.bgColor} ${stat.borderColor} overflow-hidden relative group`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradientFrom} ${stat.gradientTo} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
              <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary-foreground transition-colors duration-300">
                {stat.label}
              </CardTitle>
              <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm">
                <stat.icon className={`h-6 w-6 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-extrabold group-hover:text-primary-foreground transition-colors duration-300">{stat.value}</div>
              <div className="h-1 w-12 mt-2 bg-gradient-to-r from-transparent via-primary-DEFAULT/50 to-transparent rounded-full"></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Navigation Cards with Enhanced Design */}
      <div className="grid gap-8 md:grid-cols-2 mb-12">
        <Link href="/agents" className="block">
          <Card className="hover:shadow-xl transition-all duration-300 group overflow-hidden relative border-primary-dark/20 hover:border-primary-dark">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-light/5 to-primary-DEFAULT/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary-light/10 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-500"></div>
            
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-primary-light/20 group-hover:bg-primary-light/40 transition-colors duration-300">
                  <Users className="h-6 w-6 text-primary-DEFAULT group-hover:text-primary-dark transition-colors duration-300" />
                </div>
                <span className="text-xl font-semibold group-hover:text-primary-foreground transition-colors duration-300">Agent Management</span>
              </CardTitle>
              <CardDescription className="text-primary-foreground/80 ml-11 mt-1">
                Monitor and manage your agent workforce
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center relative z-10">
              <span className="text-primary-saturated font-medium group-hover:translate-x-1 transition-transform duration-300">View Agent Dashboard</span>
              <ArrowRight className="h-5 w-5 text-primary-dark group-hover:translate-x-1 transition-transform duration-300" />
            </CardContent>
          </Card>
        </Link>

        <Link href="/clients" className="block">
          <Card className="hover:shadow-xl transition-all duration-300 group overflow-hidden relative border-secondary-dark/20 hover:border-secondary-dark">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary-light/5 to-secondary-DEFAULT/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-secondary-light/10 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-500"></div>
            
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-secondary-light/20 group-hover:bg-secondary-light/40 transition-colors duration-300">
                  <UserPlus className="h-6 w-6 text-secondary-DEFAULT group-hover:text-secondary-dark transition-colors duration-300" />
                </div>
                <span className="text-xl font-semibold group-hover:text-secondary-foreground transition-colors duration-300">Client Queue</span>
              </CardTitle>
              <CardDescription className="text-secondary-foreground/80 ml-11 mt-1">
                Track and manage waiting clients
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center relative z-10">
              <span className="text-secondary-saturated font-medium group-hover:translate-x-1 transition-transform duration-300">View Client Queue</span>
              <ArrowRight className="h-5 w-5 text-secondary-dark group-hover:translate-x-1 transition-transform duration-300" />
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Additional Features Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-primary-foreground mb-6 flex items-center">
          <span className="h-6 w-1 bg-accent-DEFAULT rounded-full mr-3"></span>
          Advanced Features
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature, index) => (
            <Link href={`/under-construction?page=${feature.path.substring(1).replace('/', '-')}`} key={index}>
              <Card className={`hover:shadow-md transition-all duration-300 group overflow-hidden relative border-${feature.color}-dark/20 hover:border-${feature.color}-dark h-full`}>
                <div className={`absolute inset-0 bg-gradient-to-br from-${feature.color}-light/5 to-${feature.color}-DEFAULT/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                <CardHeader className="pb-2 relative z-10">
                  <div className={`p-2 rounded-full w-fit bg-${feature.color}-light/20 mb-2`}>
                    <feature.icon className={`h-5 w-5 text-${feature.color}-DEFAULT`} />
                  </div>
                  <CardTitle className="text-md font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 relative z-10">
                  <p className={`text-sm text-${feature.color}-foreground/70`}>{feature.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer Banner */}
      <div className="mt-12 rounded-xl overflow-hidden relative">
        <div className="bg-gradient-to-r from-primary-dark via-secondary-dark to-accent-dark p-6 text-white relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h3 className="text-xl font-bold mb-2">Ready to optimize your contact center?</h3>
              <p className="text-white/80">Explore our advanced analytics tools and reports</p>
            </div>
            <Link href="/under-construction?page=reports">
              <button className="mt-4 md:mt-0 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-colors duration-300 backdrop-blur-sm flex items-center">
                <span>View Reports</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-DEFAULT/10 via-secondary-DEFAULT/10 to-accent-DEFAULT/10 mix-blend-overlay"></div>
      </div>
    </div>
  );
}