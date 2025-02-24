// app/layout.jsx
"use client"
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { AgentProvider } from '@/lib/context/agent-context';
import { ClientProvider } from '@/lib/context/client-context';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="images/callcenter.png" />
        <title>Contact Center</title>
      </head>
      <body className="min-h-screen bg-background">
        <Navbar />
        <AgentProvider>
          <ClientProvider>
            <main className="container mx-auto p-6">
              {children}
            </main>
          </ClientProvider>
        </AgentProvider>
      </body>
    </html>
  );
}