
export interface Property {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  moneda: string;
  direccion: string;
  zona: string;
  ciudad: string;
  codigo_postal: string;
  provincia: string;
  tipo: string; // casa, departamento, terreno, etc.
  operacion: string; // venta, alquiler
  habitaciones: number;
  baños: number;
  superficie_total: number;
  superficie_cubierta: number;
  año_construccion: number | null;
  imagen_principal: string;
  imagenes: string;
  caracteristicas: string;
  lat: number | null;
  lng: number | null;
  destacada: boolean;
  fecha_publicacion: string;
  estado: string; // activa, vendida, alquilada
}

export interface ContactForm {
  nombre: string;
  email: string;
  telefono: string;
  mensaje: string;
  propiedad_id?: number;
}

export interface PropertyFilters {
  tipo?: string;
  operacion?: string;
  precioMin?: number;
  precioMax?: number;
  habitaciones?: number;
  zona?: string;
}
