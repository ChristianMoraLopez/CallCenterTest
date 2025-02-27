// src/app/about/page.js
import Image from 'next/image';
import { Briefcase, Mail, Phone, MapPin, Database, Code, Server, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export function generateMetadata() {
  return {
    title: 'Christian Mora | Desarrollador de Software',
    description: 'Portafolio profesional de Christian Mora, Desarrollador de Software especializado en análisis y procesamiento de datos',
  };
}

export default function AboutPage() {
  const skills = [
    { name: 'PHP', category: 'backend' },
    { name: 'Laravel', category: 'backend' },
    { name: 'Java', category: 'backend' },
    { name: 'Spring', category: 'backend' },
    { name: 'Hibernate', category: 'backend' },
    { name: 'JPA', category: 'backend' },
    { name: 'JDBC', category: 'backend' },
    { name: 'Servlet', category: 'backend' },
    { name: 'SQL', category: 'database' },
    { name: 'MySQL', category: 'database' },
    { name: 'AWS', category: 'cloud' },
    { name: 'HTML', category: 'frontend' },
    { name: 'CSS', category: 'frontend' },
    { name: 'JavaScript', category: 'frontend' },
    { name: 'Tailwind', category: 'frontend' },
    { name: 'Bootstrap', category: 'frontend' },
    { name: 'APIs', category: 'integration' },
    { name: 'PayU', category: 'integration' },
  ];

  const experience = [
    {
      title: 'Desarrollo de Sistemas Web',
      description: 'Implementación de sistemas web con bases de datos y consultas dinámicas.',
      technologies: ['PHP', 'Laravel', 'MySQL', 'AWS'],
    },
    {
      title: 'Integración de Pagos',
      description: 'Integración de API de PayU para recibir pagos a través de diferentes métodos.',
      technologies: ['API', 'PayU', 'PHP', 'JavaScript'],
    },
    {
      title: 'Desarrollo Frontend',
      description: 'Implementación de interfaces responsivas y dinámicas.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Tailwind', 'Bootstrap'],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Perfil y contacto */}
        <div className="md:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="text-center">
              <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full">
                <div className="flex h-full w-full items-center justify-center bg-primary text-4xl font-bold text-primary-foreground">
                  CM
                </div>
              </div>
              <h1 className="mt-4 text-2xl font-bold">Christian Mora</h1>
              <p className="text-muted-foreground">Desarrollador de Software</p>
              <p className="text-sm text-muted-foreground">Análisis y procesamiento de datos</p>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm">christianmoralopez@hotmail.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm">3144715980</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm">Bogotá, Colombia</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Habilidades Técnicas */}
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4 text-lg font-semibold">Habilidades Técnicas</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge 
                      key={skill.name} 
                      variant="secondary" 
                      className={
                        skill.category === 'backend' ? 'bg-blue-100 text-blue-800' :
                        skill.category === 'frontend' ? 'bg-green-100 text-green-800' :
                        skill.category === 'database' ? 'bg-amber-100 text-amber-800' :
                        skill.category === 'cloud' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Información principal */}
        <div className="md:col-span-2">
          <div className="space-y-8">
            <section>
              <h2 className="mb-4 text-2xl font-bold">Perfil Profesional</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Técnico Profesional En Programación De Aplicaciones De Software y estudiante en
                  formación de sexto semestre de Ingeniería Software, con conocimientos certificables en
                  PHP, JAVA, Java JPA y JDBC, Bases de datos (SQL)(mySQL), Servlet, Java Hibernate,
                  Java Spring, Frontend Developer con énfasis en Tailwind y Bootstrap.
                </p>
                <p>
                  Con interés en brindar apoyo a proyectos para el desarrollo de páginas web y sistemas de
                  consultas de bases de datos; mediante la recepción y categorización de requerimientos de
                  cliente; análisis e implementación de metodologías ágiles de desarrollo; así como,
                  conceptualización por medio de esquemas.
                </p>
                <p>
                  Uso de lenguajes de programación como PHP/Laravel. He implementado proyectos con
                  conexiones a bases de datos de AWS.
                </p>
                <p>
                  He realizado integración con APIS de pago como PayU para recibir pagos por diferentes
                  medios.
                </p>
                <p>
                  Con capacidad análisis, pensamiento conceptual, orientación a resultados y solución a
                  problemas.
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold">Experiencia Destacada</h2>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold">{exp.title}</h3>
                      <p className="mt-2 text-muted-foreground">{exp.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <Badge key={tech} variant="outline">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold">Formación Académica</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold">Ingeniería de Software</h3>
                      <p className="text-muted-foreground">Estudiante de sexto semestre</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Técnico Profesional en Programación de Aplicaciones de Software</h3>
                      <p className="text-muted-foreground">Título obtenido</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}