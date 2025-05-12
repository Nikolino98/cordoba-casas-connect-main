import React, { useState } from 'react';
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
import { useNavigate, Link } from 'react-router-dom';

// URL de la imagen de fondo por defecto desde Unsplash
const DEFAULT_BACKGROUND_IMAGE = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80";

const Hero = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = React.useState({
    keyword: '',
    operacion: 'todas',
    tipo: 'todos'
  });
  
  // Estado para manejar errores de carga de imagen
  const [backgroundImage, setBackgroundImage] = useState(DEFAULT_BACKGROUND_IMAGE);
  const [imageError, setImageError] = useState(false);

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

  // Función para manejar errores de carga de imagen
  const handleImageError = () => {
    console.log("Error al cargar la imagen de fondo, usando imagen por defecto");
    setImageError(true);
    setBackgroundImage(DEFAULT_BACKGROUND_IMAGE);
  };

  return (
    <div className="relative bg-cordoba-dark overflow-hidden">
      {/* Overlay con imagen de fondo */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 animate-subtle-zoom ">
        <img 
          src={imageError ? backgroundImage : "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80, )"} 
          alt="Propiedades en Córdoba" 
          className="w-full h-full object-cover "
          onError={handleImageError}
          style={{filter: 'brightness(.7)'}}
        />
      </div>
      
      <div className="relative container mx-auto px-4 pt-36 pb-52 flex flex-col items-start">
        <div className="max-w-2xl animate-fade-in">
          <h1 className="text-white mb-6 text-5xl md:text-6xl font-bold tracking-tight leading-tight">
            Encuentra tu <span className="text-primary italic font-semibold bg-gradient-to-b from-primary to-blue-400 bg-clip-text text-transparent">hogar ideal</span> en Córdoba
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
              
              <Button type="submit" className="rounded-full font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-105 transition-all container">
                <Search className="h-4 w-4 mr-2" />
                Buscar propiedades
              </Button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
