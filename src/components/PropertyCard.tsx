import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Home, MapPin, BedDouble, Bath, Square } from 'lucide-react';
import { Property } from '@/types/property';
import { Badge } from '@/components/ui/badge';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  // Función para formatear precio
  const formatPrice = (price: number, currency: string) => {
    if (currency === 'USD') {
      return `U$S ${price.toLocaleString('es-AR')}`;
    }
    return `$ ${price.toLocaleString('es-AR')}`;
  };

  // Determinar badge de operación
  const operationBadge = property.operacion === 'venta' 
    ? 'bg-orange-500 hover:bg-orange-600' 
    : 'bg-cordoba-primary hover:bg-cordoba-secondary';

  // Manejar caso donde la imagen_principal sea un dato base64 o una URL
  const imageSrc = property.imagen_principal || '/placeholder.svg';

  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all hover:shadow-lg">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={imageSrc} 
          alt={property.titulo}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null; // Evita bucles infinitos
            target.src = '/placeholder.svg';
          }}
        />
        <Badge className={`absolute top-2 right-2 ${operationBadge}`}>
          {property.operacion === 'venta' ? 'Venta' : 'Alquiler'}
        </Badge>
        
        {property.destacada && (
          <Badge className="absolute top-2 left-2 bg-yellow-500 hover:bg-yellow-600">
            Destacada
          </Badge>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <Link to={`/propiedad/${property.id}`} className="hover:text-cordoba-primary">
          <h3 className="text-lg font-semibold line-clamp-1">{property.titulo}</h3>
        </Link>
        <div className="flex items-center text-muted-foreground text-sm">
          <MapPin className="h-3 w-3 mr-1" />
          <span className="line-clamp-1">{property.zona || ''}, {property.ciudad}</span>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3 flex-grow">
        <p className="text-xl font-bold text-cordoba-primary mb-3">
          {formatPrice(property.precio, property.moneda)}
          {property.operacion === 'alquiler' && <span className="text-sm text-muted-foreground"> /mes</span>}
        </p>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {property.descripcion}
        </p>
        
        <div className="flex flex-wrap items-center gap-3 text-sm">
          {property.habitaciones !== null && property.habitaciones !== undefined && property.habitaciones > 0 && (
            <div className="flex items-center">
              <BedDouble className="h-4 w-4 mr-1 text-muted-foreground" />
              <span>{property.habitaciones} {property.habitaciones === 1 ? 'Hab' : 'Habs'}</span>
            </div>
          )}
          
          {property.baños !== null && property.baños !== undefined && property.baños > 0 && (
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1 text-muted-foreground" />
              <span>{property.baños} {property.baños === 1 ? 'Baño' : 'Baños'}</span>
            </div>
          )}
          
          {property.superficie_total !== null && property.superficie_total !== undefined && property.superficie_total > 0 && (
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1 text-muted-foreground" />
              <span>{property.superficie_total}m²</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Link 
          to={`/propiedad/${property.id}`} 
          className="text-sm font-medium text-cordoba-primary hover:underline"
        >
          Ver detalles
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;