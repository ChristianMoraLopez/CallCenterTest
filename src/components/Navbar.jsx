// components/Navbar.jsx
"use client"
import Link from 'next/link';
import { Phone, Users, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Phone className="h-6 w-6 text-primary-dark" />
            <span className="text-xl font-bold text-foreground">Contact Center</span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/agents">
              <Button variant="ghost" className="flex items-center space-x-2 text-secondary-foreground hover:bg-secondary-light hover:text-secondary-dark">
                <Users className="h-4 w-4" />
                <span>Agents</span>
              </Button>
            </Link>
            <Link href="/clients">
              <Button variant="ghost" className="flex items-center space-x-2 text-accent-foreground hover:bg-accent-light hover:text-accent-dark">
                <UserPlus className="h-4 w-4" />
                <span>Clients</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}