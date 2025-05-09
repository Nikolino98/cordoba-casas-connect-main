
import React from 'react';
import { Shield, Award, Users, ThumbsUp } from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero section */}
        <div className="relative bg-cordoba-dark overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/about-hero.jpg" 
              alt="Córdoba Casas - Sobre nosotros" 
              className="w-full h-full object-cover opacity-30"
            />
          </div>
          
          <div className="container mx-auto px-4 py-20 relative z-10">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Tu inmobiliaria de confianza en Córdoba
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                Desde 2010 ayudando a familias y empresas a encontrar el lugar ideal.
              </p>
            </div>
          </div>
        </div>
        
        {/* Our story section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-cordoba-dark mb-6">Nuestra historia</h2>
                <p className="text-gray-600 mb-4">
                  Córdoba Casas nació en 2010 con una misión clara: transformar la experiencia inmobiliaria tradicional en algo más personal, transparente y eficiente.
                </p>
                <p className="text-gray-600 mb-4">
                  Lo que comenzó como un pequeño emprendimiento familiar, rápidamente se transformó en una de las inmobiliarias de referencia en la ciudad de Córdoba, gracias a nuestro compromiso con la excelencia y la satisfacción del cliente.
                </p>
                <p className="text-gray-600">
                  Hoy, más de una década después, seguimos creciendo y evolucionando, pero manteniendo los mismos valores que nos impulsaron desde el primer día: honestidad, profesionalismo y dedicación absoluta a las necesidades de nuestros clientes.
                </p>
              </div>
              
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src="/images/about-team.jpg" 
                  alt="Equipo de Córdoba Casas" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Values section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-cordoba-dark text-center mb-12">Nuestros valores</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-cordoba-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="text-white h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Confianza</h3>
                <p className="text-gray-600">
                  Construimos relaciones duraderas basadas en la transparencia y la honestidad.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-cordoba-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="text-white h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Excelencia</h3>
                <p className="text-gray-600">
                  Nos esforzamos por superar las expectativas en cada transacción inmobiliaria.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-cordoba-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ThumbsUp className="text-white h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Compromiso</h3>
                <p className="text-gray-600">
                  Nos involucramos en cada proyecto como si fuera propio para garantizar el éxito.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-cordoba-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-white h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Comunidad</h3>
                <p className="text-gray-600">
                  Contribuimos al desarrollo sostenible de nuestra ciudad y sus habitantes.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-cordoba-dark text-center mb-4">Nuestro equipo</h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
              Contamos con profesionales especializados en el mercado inmobiliario cordobés, listos para asesorarte en cada paso.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Carlos Rodríguez",
                  position: "Director General",
                  image: "/images/team-member1.jpg"
                },
                {
                  name: "Laura Martínez",
                  position: "Gerente de Ventas",
                  image: "/images/team-member2.jpg"
                },
                {
                  name: "Martín Sánchez",
                  position: "Asesor Inmobiliario",
                  image: "/images/team-member3.jpg"
                },
                {
                  name: "Ana González",
                  position: "Atención al Cliente",
                  image: "/images/team-member4.jpg"
                }
              ].map((member, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="aspect-square">
                    <img 
                      src={member.image || "/placeholder.svg"} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold">{member.name}</h3>
                    <p className="text-gray-600">{member.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials section */}
        <section className="py-16 bg-cordoba-primary text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Lo que dicen nuestros clientes</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  text: "El servicio fue excelente de principio a fin. Encontramos la casa de nuestros sueños gracias al asesoramiento personalizado que recibimos.",
                  author: "María y Juan Pérez",
                  role: "Compradores"
                },
                {
                  text: "Vendí mi departamento en tiempo récord y al precio que esperaba. La estrategia de marketing que utilizaron fue muy efectiva.",
                  author: "Roberto Gómez",
                  role: "Vendedor"
                },
                {
                  text: "Como inversores, valoramos mucho la transparencia y el conocimiento del mercado que nos brindaron. Sin duda seguiremos trabajando juntos.",
                  author: "Grupo Inversor Córdoba",
                  role: "Inversores"
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-white text-gray-800 p-6 rounded-lg shadow-md">
                  <p className="italic mb-4">{testimonial.text}</p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-cordoba-dark mb-4">¿Listo para encontrar tu lugar ideal?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Nuestro equipo está disponible para ayudarte a comprar, vender o alquilar tu propiedad en Córdoba. 
              Contactanos hoy mismo y comienza a vivir la experiencia Córdoba Casas.
            </p>
            <Link to="/contacto">
              <Button size="lg">Contactar ahora</Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
