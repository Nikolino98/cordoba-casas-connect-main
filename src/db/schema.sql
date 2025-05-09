
-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS cordoba_casas;

USE cordoba_casas;

-- Tabla de propiedades
CREATE TABLE IF NOT EXISTS propiedades (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT NOT NULL,
  precio DECIMAL(12,2) NOT NULL,
  moneda VARCHAR(10) DEFAULT 'ARS',
  direccion VARCHAR(255) NOT NULL,
  zona VARCHAR(100),
  ciudad VARCHAR(100) NOT NULL,
  codigo_postal VARCHAR(10),
  provincia VARCHAR(100) DEFAULT 'Córdoba',
  tipo VARCHAR(50) NOT NULL,
  operacion VARCHAR(20) NOT NULL,
  habitaciones INT,
  baños INT,
  superficie_total DECIMAL(10,2),
  superficie_cubierta DECIMAL(10,2),
  año_construccion INT,
  imagen_principal VARCHAR(255),
  imagenes TEXT,
  caracteristicas TEXT,
  lat DECIMAL(10,8),
  lng DECIMAL(11,8),
  destacada BOOLEAN DEFAULT FALSE,
  fecha_publicacion DATETIME DEFAULT CURRENT_TIMESTAMP,
  estado VARCHAR(20) DEFAULT 'activa'
);

-- Tabla para consultas de contacto
CREATE TABLE IF NOT EXISTS consultas_contacto (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  telefono VARCHAR(20),
  mensaje TEXT NOT NULL,
  propiedad_id INT,
  fecha_consulta DATETIME DEFAULT CURRENT_TIMESTAMP,
  leida BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (propiedad_id) REFERENCES propiedades(id) ON DELETE SET NULL
);

-- Insertar datos de ejemplo
INSERT INTO propiedades (
  titulo, descripcion, precio, moneda, direccion, zona, ciudad, 
  codigo_postal, provincia, tipo, operacion, habitaciones, baños,
  superficie_total, superficie_cubierta, año_construccion, 
  imagen_principal, imagenes, caracteristicas, destacada
) VALUES 
(
  'Casa en Nueva Córdoba', 
  'Hermosa casa de 3 habitaciones con patio y cochera cubierta.',
  45000000, 'ARS', 'Av. Hipólito Yrigoyen 350', 'Nueva Córdoba', 'Córdoba', 
  'X5000JHQ', 'Córdoba', 'casa', 'venta', 3, 2, 
  180, 150, 2010, 
  '/images/casa1.jpg', 
  '/images/casa1_1.jpg,/images/casa1_2.jpg,/images/casa1_3.jpg',
  'Cochera,Patio,Parrilla,Seguridad 24hs',
  TRUE
),
(
  'Departamento céntrico', 
  'Moderno departamento de 2 dormitorios en pleno centro de la ciudad.',
  35000, 'ARS', 'San Martín 120', 'Centro', 'Córdoba', 
  'X5000', 'Córdoba', 'departamento', 'alquiler', 2, 1, 
  65, 65, 2015, 
  '/images/depto1.jpg', 
  '/images/depto1_1.jpg,/images/depto1_2.jpg',
  'Balcón,Ascensor,Seguridad',
  TRUE
),
(
  'Terreno en Villa Allende', 
  'Excelente terreno de 500m2 en zona residencial.',
  28000000, 'ARS', 'Los Alamos s/n', 'Villa Allende', 'Villa Allende', 
  'X5105', 'Córdoba', 'terreno', 'venta', NULL, NULL, 
  500, NULL, NULL, 
  '/images/terreno1.jpg', 
  '/images/terreno1_1.jpg',
  'Servicios,Escritura',
  FALSE
);
