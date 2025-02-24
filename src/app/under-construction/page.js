"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card } from "@/components/ui/card";
import { AlertTriangle, Construction, ArrowLeft, Coffee, Code, Wrench, Sandwich } from "lucide-react";
import Link from 'next/link';

export default function UnderConstruction() {
  // Important: make sure this hook is called unconditionally at the top level
  const searchParams = useSearchParams();
  const page = searchParams ? searchParams.get('page') : null;
  
  const [randomMessage, setRandomMessage] = useState('');
  const [randomEmoji, setRandomEmoji] = useState(null);

  const titles = {
    'agents-analytics': 'Agent Analytics',
    'clients-insights': 'Client Insights',
    'notifications': 'Notifications',
    'reports': 'Reports Dashboard'
  };

  const funnyMessages = [
    "Nuestro equipo de desarrollo funciona con café y sueños... principalmente café.",
    "Los ingenieros de backend están jugando a las escondidas con la base de datos. Hasta ahora, la base de datos va ganando.",
    "Hemos enviado un equipo de rescate para encontrar nuestros endpoints perdidos.",
    "Los hámsters que alimentan nuestros servidores necesitaban un día de vacaciones.",
    "¡Esta página es tan exclusiva que ni nosotros tenemos acceso todavía!",
    "Actualmente estamos enseñando a nuestra IA a hacer el sándwich perfecto mientras construye esta página.",
    "Nuestro código está haciendo yoga para volverse más flexible. ¡Namasté y paciencia!",
    "Advertencia: La exposición a funciones inacabadas puede provocar fiestas de baile espontáneas.",
    "Intentamos conectarnos con el backend, pero nos dejó en visto.",
    "Esta función aún está en el horno... ¡y olvidamos poner el temporizador!"
  ];

  const emojis = [Coffee, Code, Construction, Wrench, Sandwich];

  useEffect(() => {
    // Set random message and emoji on component mount or when page changes
    const randomIndex = Math.floor(Math.random() * funnyMessages.length);
    setRandomMessage(funnyMessages[randomIndex]);
    
    const randomEmojiIndex = Math.floor(Math.random() * emojis.length);
    setRandomEmoji(emojis[randomEmojiIndex]);
  }, [page]);

  const title = titles[page] || 'Feature';
  const RandomEmojiComponent = randomEmoji || Construction;

  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[70vh]">
      <Card className="max-w-lg w-full p-8 border-2 border-warning-dark/30 bg-gradient-to-br from-warning-light/20 to-warning-DEFAULT/5">
        <div className="text-center space-y-6">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-warning-light/30"></div>
              <div className="relative bg-warning-light/50 text-warning-DEFAULT p-4 rounded-full">
                <AlertTriangle className="h-12 w-12" />
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-warning-foreground">¡Estamos Construyendo {title}!</h1>
          
          <div className="p-4 bg-white/30 backdrop-blur-sm rounded-lg">
            <p className="text-lg font-medium text-warning-foreground mb-4">
              Esta página está en construcción mientras nuestro equipo conecta el backend.
            </p>
            <div className="flex items-center justify-center space-x-4 text-warning-DEFAULT mb-2">
              <RandomEmojiComponent className="h-6 w-6" />
              <p className="text-lg italic">{randomMessage}</p>
              <RandomEmojiComponent className="h-6 w-6" />
            </div>
          </div>
          
          <div className="animate-bounce mt-8 inline-block">
            <Link href="/" className="flex items-center space-x-2 text-primary-DEFAULT hover:text-primary-dark transition-colors duration-300">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Regresa al Dashboard</span>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}