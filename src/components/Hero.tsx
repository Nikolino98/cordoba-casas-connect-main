
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = React.useState({
    keyword: '',
    operacion: 'todas',
    tipo: 'todos'
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    
    if (searchParams.keyword) {
      params.append('keyword', searchParams.keyword);
    }
    
    if (searchParams.operacion !== 'todas') {
      params.append('operacion', searchParams.operacion);
    }
    
    if (searchParams.tipo !== 'todos') {
      params.append('tipo', searchParams.tipo);
    }
    
    navigate(`/propiedades?${params.toString()}`);
  };

  return (
    <div className="relative bg-cordoba-dark overflow-hidden">
      {/* Overlay con imagen de fondo */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero-bg.jpg" 
          alt="Propiedades en Córdoba" 
          className="w-full h-full object-cover opacity-40"
        />
      </div>
      
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Encontrá tu lugar ideal en Córdoba
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Las mejores opciones para comprar, vender o alquilar tu propiedad
          </p>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <form onSubmit={handleSearch}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <Input 
                  type="text" 
                  placeholder="¿Qué estás buscando?" 
                  value={searchParams.keyword}
                  onChange={(e) => setSearchParams({...searchParams, keyword: e.target.value})}
                />
                
                <Select 
                  value={searchParams.operacion} 
                  onValueChange={(value) => setSearchParams({...searchParams, operacion: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo de operación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas las operaciones</SelectItem>
                    <SelectItem value="venta">Venta</SelectItem>
                    <SelectItem value="alquiler">Alquiler</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select 
                  value={searchParams.tipo} 
                  onValueChange={(value) => setSearchParams({...searchParams, tipo: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo de propiedad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todas las propiedades</SelectItem>
                    <SelectItem value="casa">Casa</SelectItem>
                    <SelectItem value="departamento">Departamento</SelectItem>
                    <SelectItem value="terreno">Terreno</SelectItem>
                    <SelectItem value="local">Local comercial</SelectItem>
                    <SelectItem value="oficina">Oficina</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button type="submit" className="w-full bg-cordoba-primary hover:bg-cordoba-secondary">
                <Search className="h-4 w-4 mr-2" />
                Buscar propiedades
              </Button>
            </form>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 text-sm">
              <a href="/propiedades?operacion=venta&tipo=casa" className="text-cordoba-primary hover:underline">Casas en venta</a>
              <a href="/propiedades?operacion=alquiler&tipo=departamento" className="text-cordoba-primary hover:underline">Departamentos en alquiler</a>
              <a href="/propiedades?tipo=terreno" className="text-cordoba-primary hover:underline">Terrenos</a>
              <a href="/propiedades?ciudad=córdoba&zona=nueva+córdoba" className="text-cordoba-primary hover:underline">Nueva Córdoba</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
