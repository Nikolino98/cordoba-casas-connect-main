
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { searchProperties } from '@/integrations/supabase/properties';
import { Property } from '@/types/property';

const Properties = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Initialize filters from URL params
  const initialFilters = {
    tipo: searchParams.get('tipo') || 'todos',
    operacion: searchParams.get('operacion') || 'todas',
    precioMin: searchParams.get('precioMin') ? Number(searchParams.get('precioMin')) : 0,
    precioMax: searchParams.get('precioMax') ? Number(searchParams.get('precioMax')) : 100000000,
    habitaciones: searchParams.get('habitaciones') ? Number(searchParams.get('habitaciones')) : 0,
    ciudad: searchParams.get('ciudad') || '',
    zona: searchParams.get('zona') || '',
  };
  
  const [filters, setFilters] = useState(initialFilters);
  const [priceRange, setPriceRange] = useState<[number, number]>([filters.precioMin, filters.precioMax]);
  
  // Fetch properties with filters
  const { data: properties, isLoading, error } = useQuery({
    queryKey: ['properties', filters],
    queryFn: () => searchProperties(filters),
  });

  const handleFilterChange = (field: string, value: string | number) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    
    // Update URL params
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, val]) => {
      if (val) params.set(key, val.toString());
    });
    setSearchParams(params);
  };

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };
  
  const applyPriceFilter = () => {
    handleFilterChange('precioMin', priceRange[0]);
    handleFilterChange('precioMax', priceRange[1]);
  };

  const clearFilters = () => {
    setFilters({
      tipo: 'todos',
      operacion: 'todas',
      precioMin: 0,
      precioMax: 100000000,
      habitaciones: 0,
      ciudad: '',
      zona: '',
    });
    setPriceRange([0, 100000000]);
    setSearchParams({});
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-cordoba-dark mb-8">Propiedades</h1>
          
          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-1">Tipo</label>
                <Select value={filters.tipo} onValueChange={(val) => handleFilterChange('tipo', val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="casa">Casa</SelectItem>
                    <SelectItem value="departamento">Departamento</SelectItem>
                    <SelectItem value="terreno">Terreno</SelectItem>
                    <SelectItem value="local">Local</SelectItem>
                    <SelectItem value="oficina">Oficina</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Operación</label>
                <Select value={filters.operacion} onValueChange={(val) => handleFilterChange('operacion', val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas</SelectItem>
                    <SelectItem value="venta">Venta</SelectItem>
                    <SelectItem value="alquiler">Alquiler</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Ciudad</label>
                <Input 
                  type="text" 
                  placeholder="Ej: Córdoba" 
                  value={filters.ciudad} 
                  onChange={(e) => handleFilterChange('ciudad', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Habitaciones mínimas</label>
                <Select 
                  value={filters.habitaciones.toString()} 
                  onValueChange={(val) => handleFilterChange('habitaciones', parseInt(val))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Todas</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                    <SelectItem value="5">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">Rango de precio</label>
              <div className="pt-6 px-2">
                <Slider 
                  defaultValue={[filters.precioMin, filters.precioMax]} 
                  max={10000000} 
                  step={10000} 
                  value={priceRange}
                  onValueChange={handlePriceRangeChange}
                />
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>$ {priceRange[0].toLocaleString('es-AR')}</span>
                  <span>$ {priceRange[1].toLocaleString('es-AR')}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Button variant="outline" onClick={clearFilters} className="order-2 sm:order-1">
                Limpiar filtros
              </Button>
              <Button onClick={applyPriceFilter} className="order-1 sm:order-2">
                Aplicar filtros
              </Button>
            </div>
          </div>
          
          {/* Property listing */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
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
            <>
              <div className="mb-6 flex justify-between items-center">
                <p className="text-gray-600">
                  {properties?.length || 0} {properties?.length === 1 ? 'propiedad encontrada' : 'propiedades encontradas'}
                </p>
                <Select defaultValue="newest">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Más recientes</SelectItem>
                    <SelectItem value="price_asc">Precio (menor a mayor)</SelectItem>
                    <SelectItem value="price_desc">Precio (mayor a menor)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {properties && properties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {properties.map((property: Property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">No se encontraron propiedades con los filtros seleccionados.</p>
                  <Button variant="outline" onClick={clearFilters}>
                    Limpiar filtros
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Properties;
