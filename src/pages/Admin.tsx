import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Pencil, Trash, Plus, CheckCircle, XCircle, Upload, Image
} from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { toast } from '@/hooks/use-toast';
import { fetchProperties, createProperty, updateProperty, deleteProperty } from '@/integrations/supabase/properties';
import { Property } from '@/types/property';

const Admin = () => {
  const queryClient = useQueryClient();
  
  // Estado para el formulario de propiedad
  const [property, setProperty] = useState<Partial<Property>>({
    titulo: '',
    descripcion: '',
    precio: 0,
    moneda: 'ARS',
    direccion: '',
    zona: '',
    ciudad: '',
    codigo_postal: '',
    provincia: 'Córdoba',
    tipo: 'casa',
    operacion: 'venta',
    habitaciones: 0,
    baños: 0,
    superficie_total: 0,
    superficie_cubierta: 0,
    año_construccion: new Date().getFullYear(),
    imagen_principal: '',
    imagenes: '',
    caracteristicas: '',
    destacada: false,
    estado: 'activa'
  });

  // Estado para manejar las imágenes
  const [images, setImages] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState<string>('');
  const [characteristicsList, setCharacteristicsList] = useState<string[]>([]);
  const [newCharacteristic, setNewCharacteristic] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  
  // Consulta para obtener propiedades
  const { data: properties, isLoading } = useQuery({
    queryKey: ['admin-properties'],
    queryFn: fetchProperties
  });
  
  // Mutación para crear propiedad
  const createMutation = useMutation({
    mutationFn: createProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-properties'] });
      toast({
        title: "Propiedad creada",
        description: "La propiedad ha sido creada exitosamente",
      });
      resetForm();
      setOpenDialog(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Error al crear la propiedad: ${error.message}`,
        variant: "destructive"
      });
    }
  });
  
  // Mutación para actualizar propiedad
  const updateMutation = useMutation({
    mutationFn: updateProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-properties'] });
      toast({
        title: "Propiedad actualizada",
        description: "La propiedad ha sido actualizada exitosamente",
      });
      resetForm();
      setOpenDialog(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Error al actualizar la propiedad: ${error.message}`,
        variant: "destructive"
      });
    }
  });
  
  // Mutación para eliminar propiedad
  const deleteMutation = useMutation({
    mutationFn: deleteProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-properties'] });
      toast({
        title: "Propiedad eliminada",
        description: "La propiedad ha sido eliminada exitosamente",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Error al eliminar la propiedad: ${error.message}`,
        variant: "destructive"
      });
    }
  });
  
  // Función para manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProperty(prev => ({ ...prev, [name]: value }));
  };
  
  // Función para manejar cambios en select
  const handleSelectChange = (name: string, value: string) => {
    setProperty(prev => ({ ...prev, [name]: value }));
  };
  
  // Función para manejar cambios en checkbox
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setProperty(prev => ({ ...prev, [name]: checked }));
  };
  
  // Función para agregar característica
  const addCharacteristic = () => {
    if (newCharacteristic.trim()) {
      setCharacteristicsList(prev => [...prev, newCharacteristic.trim()]);
      setNewCharacteristic('');
    }
  };
  
  // Función para eliminar característica
  const removeCharacteristic = (index: number) => {
    setCharacteristicsList(prev => prev.filter((_, i) => i !== index));
  };
  
  // Función para manejar subida de imágenes
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const maxImages = 10 - images.length;
      const filesToProcess = Array.from(files).slice(0, maxImages);
      
      filesToProcess.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          setImages(prev => [...prev, result]);
        };
        reader.readAsDataURL(file);
      });
    }
  };
  
  // Función para establecer imagen principal
  const setAsMainImage = (index: number) => {
    const selectedImage = images[index];
    setMainImage(selectedImage);
    // Reordenar las imágenes
    const newImages = [
      ...images.slice(0, index),
      ...images.slice(index + 1)
    ];
    setImages(newImages);
  };
  
  // Función para eliminar imagen
  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };
  
  // Función para guardar la propiedad
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Preparar las imágenes - Asegurarse que sean URLs válidas
    const allImagesAsString = images.join(',');
    
    // Preparar las características
    const characteristicsAsString = characteristicsList.join(',');
    
    const propertyData = {
      ...property,
      imagenes: allImagesAsString,
      imagen_principal: mainImage,
      caracteristicas: characteristicsAsString,
      habitaciones: Number(property.habitaciones),
      baños: Number(property.baños),
      superficie_total: Number(property.superficie_total),
      superficie_cubierta: Number(property.superficie_cubierta),
      precio: Number(property.precio)
    } as Property;
    
    if (isEditing) {
      updateMutation.mutate(propertyData);
    } else {
      createMutation.mutate(propertyData);
    }
  };
  
  // Función para editar propiedad
  const handleEdit = (property: Property) => {
    setProperty(property);
    setIsEditing(true);
    
    // Preparar imágenes
    setMainImage(property.imagen_principal || '');
    setImages(property.imagenes ? property.imagenes.split(',').filter(img => img.trim() !== '') : []);
    
    // Preparar características
    setCharacteristicsList(property.caracteristicas ? property.caracteristicas.split(',').filter(c => c.trim() !== '') : []);
    
    setOpenDialog(true);
  };
  
  // Función para eliminar propiedad
  const handleDelete = (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar esta propiedad?')) {
      deleteMutation.mutate(id);
    }
  };
  
  // Función para reiniciar el formulario
  const resetForm = () => {
    setProperty({
      titulo: '',
      descripcion: '',
      precio: 0,
      moneda: 'ARS',
      direccion: '',
      zona: '',
      ciudad: '',
      codigo_postal: '',
      provincia: 'Córdoba',
      tipo: 'casa',
      operacion: 'venta',
      habitaciones: 0,
      baños: 0,
      superficie_total: 0,
      superficie_cubierta: 0,
      año_construccion: new Date().getFullYear(),
      imagen_principal: '',
      imagenes: '',
      caracteristicas: '',
      destacada: false,
      estado: 'activa'
    });
    setImages([]);
    setMainImage('');
    setCharacteristicsList([]);
    setIsEditing(false);
  };
  
  // Función para cambiar el estado de la propiedad
  const togglePropertyStatus = (property: Property) => {
    const newStatus = property.estado === 'activa' ? 'pausada' : 'activa';
    updateMutation.mutate({
      ...property,
      estado: newStatus
    });
  };
  
  // Función para formatear precio
  const formatPrice = (price: number, currency: string = 'ARS') => {
    if (currency === 'USD') {
      return `U$S ${price.toLocaleString('es-AR')}`;
    }
    return `$ ${price.toLocaleString('es-AR')}`;
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-cordoba-dark">Panel de Administración</h1>
            
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild>
                <Button onClick={() => {
                  resetForm();
                  setOpenDialog(true);
                }}>
                  <Plus className="mr-2 h-4 w-4" /> Nueva Propiedad
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {isEditing ? 'Editar Propiedad' : 'Nueva Propiedad'}
                  </DialogTitle>
                  <DialogDescription>
                    Completa los datos de la propiedad. Los campos con * son obligatorios.
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                  {/* Información básica */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Información Básica</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="titulo">Título *</Label>
                        <Input 
                          id="titulo" 
                          name="titulo" 
                          value={property.titulo} 
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="tipo">Tipo de Propiedad *</Label>
                        <Select 
                          value={property.tipo} 
                          onValueChange={(value) => handleSelectChange('tipo', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona el tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="casa">Casa</SelectItem>
                            <SelectItem value="departamento">Departamento</SelectItem>
                            <SelectItem value="terreno">Terreno</SelectItem>
                            <SelectItem value="local">Local</SelectItem>
                            <SelectItem value="oficina">Oficina</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="descripcion">Descripción *</Label>
                      <Textarea 
                        id="descripcion" 
                        name="descripcion" 
                        value={property.descripcion} 
                        onChange={handleChange}
                        rows={6}
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Operación y precio */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Operación y Precio</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="operacion">Operación *</Label>
                        <Select 
                          value={property.operacion} 
                          onValueChange={(value) => handleSelectChange('operacion', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona la operación" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="venta">Venta</SelectItem>
                            <SelectItem value="alquiler">Alquiler</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="precio">Precio *</Label>
                        <Input 
                          id="precio" 
                          name="precio" 
                          type="number" 
                          value={property.precio?.toString() || '0'} 
                          onChange={handleChange}
                          min="0"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="moneda">Moneda</Label>
                        <Select 
                          value={property.moneda} 
                          onValueChange={(value) => handleSelectChange('moneda', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona la moneda" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ARS">ARS</SelectItem>
                            <SelectItem value="USD">USD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="destacada" 
                        checked={property.destacada} 
                        onCheckedChange={(checked) => handleCheckboxChange('destacada', checked as boolean)}
                      />
                      <label
                        htmlFor="destacada"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Propiedad Destacada
                      </label>
                    </div>
                  </div>
                  
                  {/* Ubicación */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Ubicación</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="direccion">Dirección *</Label>
                        <Input 
                          id="direccion" 
                          name="direccion" 
                          value={property.direccion} 
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="zona">Zona</Label>
                        <Input 
                          id="zona" 
                          name="zona" 
                          value={property.zona} 
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="ciudad">Ciudad *</Label>
                        <Input 
                          id="ciudad" 
                          name="ciudad" 
                          value={property.ciudad} 
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="codigo_postal">Código Postal</Label>
                        <Input 
                          id="codigo_postal" 
                          name="codigo_postal" 
                          value={property.codigo_postal} 
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="provincia">Provincia</Label>
                        <Input 
                          id="provincia" 
                          name="provincia" 
                          value={property.provincia} 
                          onChange={handleChange}
                          defaultValue="Córdoba"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Características */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Características</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="habitaciones">Habitaciones</Label>
                        <Input 
                          id="habitaciones" 
                          name="habitaciones" 
                          type="number" 
                          value={property.habitaciones?.toString() || '0'} 
                          onChange={handleChange}
                          min="0"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="baños">Baños</Label>
                        <Input 
                          id="baños" 
                          name="baños" 
                          type="number" 
                          value={property.baños?.toString() || '0'} 
                          onChange={handleChange}
                          min="0"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="año_construccion">Año de Construcción</Label>
                        <Input 
                          id="año_construccion" 
                          name="año_construccion" 
                          type="number" 
                          value={property.año_construccion?.toString() || ''} 
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="superficie_total">Superficie Total (m²)</Label>
                        <Input 
                          id="superficie_total" 
                          name="superficie_total" 
                          type="number" 
                          value={property.superficie_total?.toString() || '0'} 
                          onChange={handleChange}
                          min="0"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="superficie_cubierta">Superficie Cubierta (m²)</Label>
                        <Input 
                          id="superficie_cubierta" 
                          name="superficie_cubierta" 
                          type="number" 
                          value={property.superficie_cubierta?.toString() || '0'} 
                          onChange={handleChange}
                          min="0"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Otras Características</Label>
                      
                      <div className="flex flex-wrap gap-2 mb-2">
                        {characteristicsList.map((characteristic, index) => (
                          <Badge key={index} variant="outline" className="px-3 py-1">
                            {characteristic}
                            <button 
                              type="button" 
                              className="ml-2 text-gray-400 hover:text-red-500"
                              onClick={() => removeCharacteristic(index)}
                            >
                              ×
                            </button>
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Input 
                          value={newCharacteristic} 
                          onChange={(e) => setNewCharacteristic(e.target.value)} 
                          placeholder="Ej. Aire Acondicionado, Cochera, etc."
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={addCharacteristic}
                        >
                          Agregar
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Imágenes */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Imágenes (máx. 10)</h3>
                    <p className="text-sm text-gray-500">Las imágenes se guardarán en formato base64. Para mejor rendimiento, utiliza imágenes optimizadas de tamaño moderado.</p>
                    
                    <div className="space-y-2">
                      <Label htmlFor="images">Subir Imágenes</Label>
                      <Input 
                        id="images" 
                        type="file" 
                        accept="image/*" 
                        multiple 
                        onChange={handleImageUpload}
                        disabled={images.length >= 10}
                      />
                      <p className="text-sm text-muted-foreground">
                        Imágenes cargadas: {images.length + (mainImage ? 1 : 0)}/10
                      </p>
                    </div>
                    
                    {/* Imagen principal */}
                    {mainImage && (
                      <div className="space-y-2">
                        <Label>Imagen Principal</Label>
                        <div className="relative aspect-video rounded-lg overflow-hidden border">
                          <img 
                            src={mainImage} 
                            alt="Imagen principal" 
                            className="w-full h-full object-cover" 
                          />
                          <div className="absolute top-2 right-2">
                            <Badge variant="secondary">Principal</Badge>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Lista de imágenes */}
                    {images.length > 0 && (
                      <div className="space-y-2">
                        <Label>Otras Imágenes</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {images.map((image, index) => (
                            <div 
                              key={index} 
                              className="relative aspect-video rounded-lg overflow-hidden border"
                            >
                              <img 
                                src={image} 
                                alt={`Imagen ${index + 1}`} 
                                className="w-full h-full object-cover" 
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                                <Button 
                                  type="button" 
                                  size="sm" 
                                  variant="secondary" 
                                  onClick={() => setAsMainImage(index)}
                                  className="p-1 h-8 w-8"
                                >
                                  <Image className="h-4 w-4" />
                                </Button>
                                <Button 
                                  type="button" 
                                  size="sm" 
                                  variant="destructive" 
                                  onClick={() => removeImage(index)}
                                  className="p-1 h-8 w-8"
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <DialogFooter>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setOpenDialog(false)}
                      className="mr-2"
                    >
                      Cancelar
                    </Button>
                    <Button type="submit">
                      {isEditing ? 'Actualizar Propiedad' : 'Crear Propiedad'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          
          {/* Lista de propiedades */}
          <div className="bg-white rounded-lg shadow-md">
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="animate-spin h-8 w-8 border-4 border-cordoba-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p>Cargando propiedades...</p>
              </div>
            ) : !properties || properties.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-500">No hay propiedades registradas</p>
                <Button 
                  className="mt-4" 
                  onClick={() => setOpenDialog(true)}
                >
                  <Plus className="mr-2 h-4 w-4" /> Crear Primera Propiedad
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Operación</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Ubicación</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {properties.map((property) => (
                    <TableRow key={property.id}>
                      <TableCell className="font-medium">{property.titulo}</TableCell>
                      <TableCell className="capitalize">{property.tipo}</TableCell>
                      <TableCell className="capitalize">{property.operacion}</TableCell>
                      <TableCell>{formatPrice(property.precio, property.moneda)}</TableCell>
                      <TableCell>{property.ciudad}, {property.zona || 'N/A'}</TableCell>
                      <TableCell>
                        <Badge 
                          className={
                            property.estado === 'activa' 
                              ? 'bg-green-500 hover:bg-green-600' 
                              : 'bg-yellow-500 hover:bg-yellow-600'
                          }
                        >
                          {property.estado === 'activa' ? 'Activa' : 'Pausada'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => togglePropertyStatus(property)}
                            title={property.estado === 'activa' ? 'Pausar' : 'Activar'}
                          >
                            {property.estado === 'activa' ? (
                              <XCircle className="h-4 w-4 text-yellow-500" />
                            ) : (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                          </Button>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => handleEdit(property)}
                            title="Editar"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => handleDelete(property.id)}
                            title="Eliminar"
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;