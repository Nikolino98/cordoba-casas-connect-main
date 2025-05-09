
# Guía de Conexión a MySQL para CordobaCasas

Esta guía explica paso a paso cómo conectar la aplicación CordobaCasas a una base de datos MySQL. Está diseñada para principiantes que tienen poco conocimiento previo sobre bases de datos.

## Requisitos previos

Antes de comenzar, necesitarás:

1. MySQL instalado en tu computadora o un servidor MySQL remoto
2. Un editor de código (como Visual Studio Code)
3. Node.js y npm instalados en tu computadora

## Paso 1: Instalar MySQL

Si aún no tienes MySQL instalado, aquí te indico cómo hacerlo:

### Para Windows:
1. Descarga el instalador de MySQL Community Server desde [la página oficial de MySQL](https://dev.mysql.com/downloads/installer/)
2. Ejecuta el instalador y sigue las instrucciones del asistente
3. Durante la instalación, anota la contraseña de root que configures

### Para macOS:
1. La forma más sencilla es usar Homebrew: `brew install mysql`
2. Inicia el servicio: `brew services start mysql`
3. Configura la contraseña: `mysql_secure_installation`

### Para Linux (Ubuntu):
1. Actualiza los paquetes: `sudo apt update`
2. Instala MySQL: `sudo apt install mysql-server`
3. Configura la seguridad: `sudo mysql_secure_installation`

## Paso 2: Crear la base de datos y las tablas

Una vez que tengas MySQL instalado, necesitarás crear la base de datos para el proyecto:

1. Abre una terminal o consola de comandos
2. Inicia sesión en MySQL:
   ```
   mysql -u root -p
   ```
3. Introduce la contraseña que configuraste durante la instalación

4. Ahora puedes copiar y pegar el contenido del archivo `src/db/schema.sql` para crear la base de datos y tablas. O puedes ejecutar el archivo directamente con este comando (desde fuera de MySQL):
   ```
   mysql -u root -p < src/db/schema.sql
   ```

## Paso 3: Configurar variables de entorno

Para que la aplicación pueda conectarse a la base de datos, debes configurar las variables de entorno:

1. Crea un archivo `.env` en la raíz del proyecto (copia el contenido de `.env.example`)
2. Edita el archivo `.env` con tus datos de conexión:

```
# Configuración de la base de datos MySQL
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=cordoba_casas
DB_PORT=3306
```

Reemplaza `tu_contraseña` con la contraseña que configuraste para MySQL.

## Paso 4: Entender la conexión a MySQL

El archivo principal que maneja la conexión a la base de datos es `src/lib/db.ts`. Vamos a analizarlo:

```typescript
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Carga las variables de entorno del archivo .env
dotenv.config();

// Configura la conexión usando las variables de entorno
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'cordoba_casas',
  port: parseInt(process.env.DB_PORT || '3306')
};

// Crea un pool de conexiones para mejor rendimiento
const pool = mysql.createPool(dbConfig);
```

Este código configura la conexión a MySQL utilizando la información del archivo `.env`. Usa un "pool" de conexiones, que es más eficiente que crear una nueva conexión cada vez.

## Paso 5: Ejecutar consultas SQL

El archivo `db.ts` también proporciona funciones para ejecutar consultas SQL:

```typescript
// Función para ejecutar consultas SQL
export async function executeQuery(query: string, params?: any[]) {
  try {
    const [results] = await pool.execute(query, params);
    return results;
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
    throw error;
  }
}
```

Para usar esta función desde otro archivo, simplemente la importas:

```typescript
import { executeQuery } from '@/lib/db';

async function obtenerPropiedades() {
  const propiedades = await executeQuery('SELECT * FROM propiedades');
  return propiedades;
}
```

## Paso 6: Comprender los métodos específicos

El archivo `db.ts` incluye funciones específicas para operaciones comunes:

```typescript
// Función para obtener todas las propiedades
export async function getAllProperties() {
  const query = 'SELECT * FROM propiedades ORDER BY fecha_publicacion DESC';
  return executeQuery(query);
}

// Función para obtener una propiedad por ID
export async function getPropertyById(id: number) {
  const query = 'SELECT * FROM propiedades WHERE id = ?';
  const results = await executeQuery(query, [id]);
  return Array.isArray(results) && results.length > 0 ? results[0] : null;
}
```

Estas funciones facilitan las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre la base de datos.

## Paso 7: Implementar la conexión en tus componentes

Para usar estas funciones en los componentes React, debes crear un API endpoint. Por ejemplo, en un archivo de API:

```typescript
// src/api/properties.ts
import { getAllProperties, getPropertyById } from '@/lib/db';

export async function fetchProperties() {
  try {
    return await getAllProperties();
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
}

export async function fetchPropertyById(id: number) {
  try {
    return await getPropertyById(id);
  } catch (error) {
    console.error(`Error fetching property with ID ${id}:`, error);
    throw error;
  }
}
```

Luego, en tu componente React, puedes usar estas funciones con React Query:

```typescript
import { fetchProperties } from '@/api/properties';
import { useQuery } from '@tanstack/react-query';

function PropertiesList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['properties'],
    queryFn: fetchProperties,
  });

  // Continúa con el renderizado del componente...
}
```

## Errores comunes y soluciones

### Error: "Cannot connect to MySQL server"
- Verifica que MySQL esté en ejecución
- Comprueba el host y puerto en el archivo .env
- Asegúrate de que el firewall no esté bloqueando el puerto

### Error: "Access denied for user..."
- Verifica el nombre de usuario y contraseña en el archivo .env
- Asegúrate de que el usuario tenga permisos para la base de datos

### Error: "Table doesn't exist"
- Ejecuta nuevamente el script de creación de tablas
- Verifica que estás conectado a la base de datos correcta

## Recursos adicionales

- [Documentación oficial de MySQL](https://dev.mysql.com/doc/)
- [Tutorial de MySQL](https://www.w3schools.com/mysql/)
- [Documentación de mysql2 para Node.js](https://github.com/sidorares/node-mysql2#readme)

Con esta guía, deberías poder configurar y utilizar MySQL en tu proyecto CordobaCasas. Recuerda que la práctica es la mejor forma de aprender, así que no dudes en experimentar con diferentes consultas y modificaciones.
