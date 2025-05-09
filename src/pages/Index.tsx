
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import PropertyCard from '@/components/PropertyCard';
import { fetchFeaturedProperties } from '@/integrations/supabase/properties';

const Index = () => {
  const { data: properties, isLoading, error } = useQuery({
    queryKey: ['featuredProperties'],
    queryFn: fetchFeaturedProperties,
  });

  // Handle error with toast notification
  React.useEffect(() => {
    if (error) {
      toast({
        title: "Error al cargar propiedades",
        description: "No se pudieron cargar las propiedades destacadas. Por favor, intente nuevamente.",
        variant: "destructive",
      });
    }
  }, [error]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Sección de propiedades destacadas */}
        <section className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-cordoba-dark">Propiedades destacadas</h2>
            <Link to="/propiedades">
              <Button variant="outline">Ver todas</Button>
            </Link>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[400px] rounded-lg bg-gray-100 animate-pulse"></div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">
              <p className="mb-4">Error al cargar las propiedades.</p>
              <Button 
                onClick={() => window.location.reload()}
                variant="outline"
              >
                Intentar nuevamente
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties && properties.length > 0 ? (
                properties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  No hay propiedades destacadas disponibles en este momento.
                </div>
              )}
            </div>
          )}
        </section>
        
        {/* Sección de búsqueda rápida */}
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-cordoba-dark mb-6">
                Encontrá tu propiedad ideal
              </h2>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <Input 
                    type="text" 
                    placeholder="¿Qué estás buscando?" 
                    className="flex-grow"
                  />
                  <Button className="bg-cordoba-primary hover:bg-cordoba-secondary">
                    <Search className="h-4 w-4 mr-2" />
                    Buscar
                  </Button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <Link to="/propiedades?tipo=casa" className="text-cordoba-primary text-sm hover:underline">Casas</Link>
                  <Link to="/propiedades?tipo=departamento" className="text-cordoba-primary text-sm hover:underline">Departamentos</Link>
                  <Link to="/propiedades?tipo=terreno" className="text-cordoba-primary text-sm hover:underline">Terrenos</Link>
                  <Link to="/propiedades?tipo=local" className="text-cordoba-primary text-sm hover:underline">Locales</Link>
                  <Link to="/propiedades?tipo=oficina" className="text-cordoba-primary text-sm hover:underline">Oficinas</Link>
                  <Link to="/propiedades?operacion=alquiler" className="text-cordoba-primary text-sm hover:underline">Alquileres</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Sección de servicios */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-cordoba-dark mb-10">
              Nuestros servicios
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-cordoba-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Venta de propiedades</h3>
                <p className="text-gray-600">Encontrá la propiedad de tus sueños entre nuestras opciones exclusivas.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-cordoba-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                    <path d="M3 9h18"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Alquiler de propiedades</h3>
                <p className="text-gray-600">Las mejores opciones de alquiler para viviendas y locales comerciales.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-cordoba-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    <path d="M2 12h20"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Asesoramiento inmobiliario</h3>
                <p className="text-gray-600">Te acompañamos en todo el proceso de compra, venta o alquiler de tu propiedad.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Sección CTA */}
        <section className="bg-cordoba-primary text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">¿Querés vender o alquilar tu propiedad?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Contáctanos hoy mismo y te asesoramos en todo el proceso
            </p>
            <Link to="/contacto">
              <Button size="lg" className="bg-white text-cordoba-primary hover:bg-gray-100">
                Contactar ahora
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
