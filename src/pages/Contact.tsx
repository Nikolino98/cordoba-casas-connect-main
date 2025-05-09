
import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useForm } from 'react-hook-form';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>();
  
  const onSubmit = async (data: FormData) => {
    try {
      // Aquí se enviaría el formulario a la API
      console.log('Form data:', data);
      
      // Simular envío exitoso
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Mensaje enviado correctamente",
        description: "Nos pondremos en contacto contigo a la brevedad",
      });
      
      reset();
    } catch (error) {
      toast({
        title: "Error al enviar el mensaje",
        description: "Por favor, intenta nuevamente más tarde",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">Contacto</h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Estamos aquí para ayudarte. No dudes en ponerte en contacto con nosotros para cualquier consulta sobre nuestras propiedades o servicios.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="rounded-full bg-cordoba-primary w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-white h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Dirección</h3>
              <p className="text-gray-600">Av. Colón 1234</p>
              <p className="text-gray-600">Córdoba, Argentina</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="rounded-full bg-cordoba-primary w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Phone className="text-white h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Teléfono</h3>
              <p className="text-gray-600">+54 351 123-4567</p>
              <p className="text-gray-600">+54 351 765-4321</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="rounded-full bg-cordoba-primary w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Mail className="text-white h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-gray-600">info@cordobacasas.com</p>
              <p className="text-gray-600">ventas@cordobacasas.com</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">Envíanos un mensaje</h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Nombre completo</label>
                    <Input
                      id="name"
                      {...register('name', { required: 'Este campo es obligatorio' })}
                      className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email', { 
                        required: 'Este campo es obligatorio',
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: 'Email inválido'
                        }
                      })}
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">Teléfono</label>
                    <Input
                      id="phone"
                      {...register('phone', { required: 'Este campo es obligatorio' })}
                      className={errors.phone ? 'border-red-500' : ''}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1">Asunto</label>
                    <Input
                      id="subject"
                      {...register('subject', { required: 'Este campo es obligatorio' })}
                      className={errors.subject ? 'border-red-500' : ''}
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">Mensaje</label>
                  <Textarea
                    id="message"
                    rows={4}
                    {...register('message', { required: 'Este campo es obligatorio' })}
                    className={errors.message ? 'border-red-500' : ''}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                  )}
                </div>
                
                <div className="pt-2">
                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
                  </Button>
                </div>
              </form>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">Horarios de atención</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-cordoba-primary mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Lunes a Viernes</h3>
                    <p className="text-gray-600">9:00 - 18:00</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-cordoba-primary mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Sábados</h3>
                    <p className="text-gray-600">9:00 - 13:00</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-cordoba-primary mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Domingos y feriados</h3>
                    <p className="text-gray-600">Cerrado</p>
                  </div>
                </div>
              </div>
              
              <hr className="my-6 border-gray-200" />
              
              <h2 className="text-2xl font-bold mb-6">Ubicación</h2>
              
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 mb-4">
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  <MapPin className="h-8 w-8 mr-2" />
                  <span>Av. Colón 1234, Córdoba, Argentina</span>
                </div>
              </div>
              
              <p className="text-gray-600">
                Nos encontramos en el centro de la ciudad, a pocas cuadras de la Plaza San Martín.
                Contamos con estacionamiento para clientes.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
