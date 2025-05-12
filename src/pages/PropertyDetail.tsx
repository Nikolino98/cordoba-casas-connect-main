import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  BedDouble, Bath, Square, MapPin, Home, 
  Calendar, Phone, User, Mail, MessageSquare,
  ChevronLeft, ChevronRight
} from 'lucide-react';

import { fetchPropertyById } from '@/integrations/supabase/properties';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();

    
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const { data: property, isLoading, error } = useQuery({
    queryKey: ['property', id],
    queryFn: () => fetchPropertyById(Number(id)),
    enabled: !!id
  });
  
  const [contactForm, setContactForm] = React.useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulamos envío de formulario
    toast({
      title: "Mensaje enviado",
      description: "Nos pondremos en contacto contigo a la brevedad",
    });
    setContactForm({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };
  
  // Función para formatear precio
  const formatPrice = (price: number | undefined, currency: string | undefined) => {
    if (!price) return '';
    if (currency === 'USD') {
      return `U$S ${price.toLocaleString('es-AR')}`;
    }
    return `$ ${price.toLocaleString('es-AR')}`;
  };
  
  // Obtener las imágenes de la propiedad
  const getImageList = (imageString: string | undefined) => {
    if (!imageString || imageString.trim() === '') return [];
    return imageString.split(',').filter(img => img.trim() !== '');
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="h-[500px] rounded-lg bg-gray-100 animate-pulse mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="h-12 w-3/4 bg-gray-100 animate-pulse mb-4"></div>
              <div className="h-6 w-1/2 bg-gray-100 animate-pulse mb-6"></div>
              <div className="h-4 bg-gray-100 animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-100 animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-100 animate-pulse mb-6"></div>
            </div>
            <div className="h-[300px] bg-gray-100 animate-pulse"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (error || !property) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 text-center">
          <div className="py-12">
            <h1 className="text-2xl font-bold mb-4">Propiedad no encontrada</h1>
            <p className="mb-6 text-gray-600">
              La propiedad que buscas no existe o no está disponible.
            </p>
            <Link to="/propiedades">
              <Button>Ver todas las propiedades</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const images = getImageList(property.imagenes);
  const allImages = property.imagen_principal ? [property.imagen_principal, ...images] : images;
  const features = property.caracteristicas ? property.caracteristicas.split(',').filter(f => f.trim() !== '') : [];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6">
            <Link to="/" className="hover:text-cordoba-primary">Inicio</Link>
            <span className="mx-2">/</span>
            <Link to="/propiedades" className="hover:text-cordoba-primary">Propiedades</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">{property.titulo}</span>
          </div>
          
          {/* Header information */}
          <div className="mb-6">
            <div className="flex flex-wrap justify-between items-start mb-2">
              <h1 className="text-3xl font-bold text-cordoba-dark">{property.titulo}</h1>
              <Badge className={property.operacion === 'venta' ? 'bg-orange-500' : 'bg-cordoba-primary'}>
                {property.operacion === 'venta' ? 'Venta' : 'Alquiler'}
              </Badge>
            </div>
            
            <div className="flex items-center text-muted-foreground mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{property.direccion}, {property.zona || ''}, {property.ciudad}</span>
            </div>
            
            <p className="text-3xl font-bold text-cordoba-primary">
              {formatPrice(property.precio, property.moneda)}
              {property.operacion === 'alquiler' && <span className="text-base text-muted-foreground"> /mes</span>}
            </p>
          </div>
          
          {/* Image Carousel */}
          {allImages.length > 0 && (
            <div className="mb-8">
              <Carousel className="w-full">
                <CarouselContent>
                  {allImages.map((img, index) => (
                    <CarouselItem key={index}>
                      <div className="relative rounded-lg overflow-hidden aspect-video">
                        <img 
                          src={img} 
                          alt={`${property.titulo} - Imagen ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null; // Evita bucles infinitos
                            target.src = '/placeholder.svg';
                          }}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center mt-4 gap-2">
                  <CarouselPrevious className="relative inset-0 translate-y-0" />
                  <CarouselNext className="relative inset-0 translate-y-0" />
                </div>
              </Carousel>
            </div>
          )}
          
          {/* Image thumbnails */}
          {allImages.length > 1 && (
            <div className="grid grid-cols-5 gap-2 mb-8">
              {allImages.slice(0, 5).map((img, index) => (
                <div key={index} className="aspect-video rounded-lg overflow-hidden">
                  <img 
                    src={img} 
                    alt={`${property.titulo} - Miniatura ${index + 1}`}
                    className="w-full h-full object-cover transition-transform cursor-pointer hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = '/placeholder.svg';
                    }}
                  />
                </div>
              ))}
              {allImages.length > 5 && (
                <div className="aspect-video rounded-lg overflow-hidden relative bg-gray-100">
                  <img 
                    src={allImages[5]} 
                    alt={`${property.titulo} - Más imágenes`}
                    className="w-full h-full object-cover opacity-70"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = '/placeholder.svg';
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white font-bold">
                    +{allImages.length - 5}
                  </div>
                </div>
              )}
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Property details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">Detalles de la propiedad</h2>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {property.tipo && (
                    <div className="flex items-center">
                      <Home className="h-5 w-5 mr-2 text-cordoba-primary" />
                      <div>
                        <p className="text-sm text-gray-500">Tipo</p>
                        <p className="capitalize">{property.tipo}</p>
                      </div>
                    </div>
                  )}
                  
                  {property.habitaciones !== null && property.habitaciones !== undefined && property.habitaciones > 0 && (
                    <div className="flex items-center">
                      <BedDouble className="h-5 w-5 mr-2 text-cordoba-primary" />
                      <div>
                        <p className="text-sm text-gray-500">Habitaciones</p>
                        <p>{property.habitaciones}</p>
                      </div>
                    </div>
                  )}
                  
                  {property.baños !== null && property.baños !== undefined && property.baños > 0 && (
                    <div className="flex items-center">
                      <Bath className="h-5 w-5 mr-2 text-cordoba-primary" />
                      <div>
                        <p className="text-sm text-gray-500">Baños</p>
                        <p>{property.baños}</p>
                      </div>
                    </div>
                  )}
                  
                  {property.superficie_total !== null && property.superficie_total !== undefined && property.superficie_total > 0 && (
                    <div className="flex items-center">
                      <Square className="h-5 w-5 mr-2 text-cordoba-primary" />
                      <div>
                        <p className="text-sm text-gray-500">Superficie total</p>
                        <p>{property.superficie_total} m²</p>
                      </div>
                    </div>
                  )}
                  
                  {property.superficie_cubierta !== null && property.superficie_cubierta !== undefined && property.superficie_cubierta > 0 && (
                    <div className="flex items-center">
                      <Square className="h-5 w-5 mr-2 text-cordoba-primary" />
                      <div>
                        <p className="text-sm text-gray-500">Superficie cubierta</p>
                        <p>{property.superficie_cubierta} m²</p>
                      </div>
                    </div>
                  )}
                  
                  {property.año_construccion !== null && property.año_construccion !== undefined && property.año_construccion > 0 && (
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-cordoba-primary" />
                      <div>
                        <p className="text-sm text-gray-500">Año de construcción</p>
                        <p>{property.año_construccion}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold mb-3">Descripción</h3>
                <p className="text-gray-700 mb-6 whitespace-pre-line">{property.descripcion}</p>
                
                {features.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Características</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-cordoba-primary rounded-full mr-2"></div>
                          <span>{feature.trim()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Location section */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">Ubicación</h2>
                <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                  {/* Here would be a map, but we're just showing a placeholder for now */}
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    <MapPin className="h-8 w-8 mr-2" />
                    <span>{property.direccion}, {property.zona || ''}, {property.ciudad}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-xl font-bold mb-4">Contactar</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Nombre</label>
                    <div className="relative">
                      <User className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                      <Input 
                        id="name"
                        name="name"
                        value={contactForm.name}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                    <div className="relative">
                      <Mail className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        value={contactForm.email}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">Teléfono</label>
                    <div className="relative">
                      <Phone className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                      <Input 
                        id="phone"
                        name="phone"
                        value={contactForm.phone}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">Mensaje</label>
                    <div className="relative">
                      <MessageSquare className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                      <Textarea 
                        id="message"
                        name="message"
                        value={contactForm.message}
                        onChange={handleInputChange}
                        className="pl-10 min-h-[100px]"
                        placeholder="Me interesa esta propiedad..."
                        required
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Enviar consulta
                  </Button>
                </form>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-center text-sm text-gray-500">
                    ¿Preferís llamar? <br />
                    <a href="tel:+123456789" className="text-cordoba-primary font-medium hover:underline">
                      +54 351 123-4567
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertyDetail;
