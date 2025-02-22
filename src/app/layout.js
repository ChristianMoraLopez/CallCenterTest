"use client"
import Link from 'next/link';
import './globals.css';
import { Phone, Users, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AgentProvider } from '@/lib/context/agent-context'; // Asegúrate de importar el AgentProvider
import { ClientProvider } from '@/lib/context/client-context'; // Asegúrate de importar el ClientProvider

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="images/callcenter.png" />
        <title>Contact Center</title>
      </head>
      <body className="min-h-screen bg-slate-50">
        <nav className="border-b bg-white shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex h-16 items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <Phone className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold text-slate-900">Contact Center</span>
              </Link>
              <div className="flex items-center space-x-6">
                <Link href="/agents">
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>Agents</span>
                  </Button>
                </Link>
                <Link href="/clients">
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <UserPlus className="h-4 w-4" />
                    <span>Clients</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <AgentProvider>
          <ClientProvider> {/* Wrap children with ClientProvider */}
            <main>{children}</main>
          </ClientProvider>
        </AgentProvider>
      </body>
    </html>
  );
}
