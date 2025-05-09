
import { supabase } from "@/integrations/supabase/client";
import { Property } from "@/types/property";

// Función para obtener todas las propiedades
export async function fetchProperties(): Promise<Property[]> {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .order('fecha_publicacion', { ascending: false });

  if (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }

  return data || [];
}

// Función para obtener propiedades destacadas
export async function fetchFeaturedProperties(): Promise<Property[]> {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('destacada', true)
    .order('fecha_publicacion', { ascending: false });

  if (error) {
    console.error('Error fetching featured properties:', error);
    throw error;
  }

  return data || [];
}

// Función para obtener una propiedad por ID
export async function fetchPropertyById(id: number): Promise<Property | null> {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching property with id ${id}:`, error);
    throw error;
  }

  return data || null;
}

// Función para buscar propiedades con filtros
export async function searchProperties(filters: {
  tipo?: string;
  operacion?: string;
  precioMin?: number;
  precioMax?: number;
  habitaciones?: number;
  ciudad?: string;
  zona?: string;
}): Promise<Property[]> {
  let query = supabase.from('properties').select('*');

  if (filters.tipo && filters.tipo !== 'todos') {
    query = query.eq('tipo', filters.tipo);
  }

  if (filters.operacion && filters.operacion !== 'todas') {
    query = query.eq('operacion', filters.operacion);
  }

  if (filters.precioMin) {
    query = query.gte('precio', filters.precioMin);
  }

  if (filters.precioMax) {
    query = query.lte('precio', filters.precioMax);
  }

  if (filters.habitaciones) {
    query = query.gte('habitaciones', filters.habitaciones);
  }

  if (filters.ciudad) {
    query = query.eq('ciudad', filters.ciudad);
  }

  if (filters.zona) {
    query = query.eq('zona', filters.zona);
  }

  query = query.order('fecha_publicacion', { ascending: false });

  const { data, error } = await query;

  if (error) {
    console.error('Error searching properties:', error);
    throw error;
  }

  return data || [];
}

// Función para crear una propiedad
export async function createProperty(property: Partial<Property>): Promise<Property> {
  // Ensure required fields are present
  if (!property.titulo || !property.descripcion || !property.precio || 
      !property.direccion || !property.ciudad || !property.tipo || 
      !property.operacion) {
    throw new Error('Missing required property fields');
  }

  const { data, error } = await supabase
    .from('properties')
    .insert({
      titulo: property.titulo,
      descripcion: property.descripcion,
      precio: property.precio,
      moneda: property.moneda || 'ARS',
      direccion: property.direccion,
      zona: property.zona || null,
      ciudad: property.ciudad,
      codigo_postal: property.codigo_postal || null,
      provincia: property.provincia || 'Córdoba',
      tipo: property.tipo,
      operacion: property.operacion,
      habitaciones: property.habitaciones || null,
      baños: property.baños || null,
      superficie_total: property.superficie_total || null,
      superficie_cubierta: property.superficie_cubierta || null,
      año_construccion: property.año_construccion || null,
      imagen_principal: property.imagen_principal || null,
      imagenes: property.imagenes || null,
      caracteristicas: property.caracteristicas || null,
      lat: property.lat || null,
      lng: property.lng || null,
      destacada: property.destacada || false,
      estado: property.estado || 'activa'
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating property:', error);
    throw error;
  }

  return data;
}

// Función para actualizar una propiedad
export async function updateProperty(property: Property): Promise<Property> {
  const { data, error } = await supabase
    .from('properties')
    .update(property)
    .eq('id', property.id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating property with id ${property.id}:`, error);
    throw error;
  }

  return data;
}

// Función para eliminar una propiedad
export async function deleteProperty(id: number): Promise<void> {
  const { error } = await supabase
    .from('properties')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Error deleting property with id ${id}:`, error);
    throw error;
  }
}
