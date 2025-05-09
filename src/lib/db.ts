
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Configuración de la conexión a la base de datos
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'cordoba_casas',
  port: parseInt(process.env.DB_PORT || '3306')
};

// Pool de conexiones para mejor rendimiento
const pool = mysql.createPool(dbConfig);

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

// Función para obtener todas las propiedades
export async function getAllProperties() {
  const query = `
    SELECT * FROM propiedades
    ORDER BY fecha_publicacion DESC
  `;
  return executeQuery(query);
}

// Función para obtener una propiedad por ID
export async function getPropertyById(id: number) {
  const query = `
    SELECT * FROM propiedades
    WHERE id = ?
  `;
  const results = await executeQuery(query, [id]);
  return Array.isArray(results) && results.length > 0 ? results[0] : null;
}

// Función para buscar propiedades con filtros
export async function searchProperties(filters: any) {
  let query = `SELECT * FROM propiedades WHERE 1=1`;
  const params: any[] = [];

  if (filters.tipo) {
    query += ` AND tipo = ?`;
    params.push(filters.tipo);
  }

  if (filters.operacion) {
    query += ` AND operacion = ?`;
    params.push(filters.operacion);
  }

  if (filters.precioMin) {
    query += ` AND precio >= ?`;
    params.push(filters.precioMin);
  }

  if (filters.precioMax) {
    query += ` AND precio <= ?`;
    params.push(filters.precioMax);
  }

  if (filters.habitaciones) {
    query += ` AND habitaciones >= ?`;
    params.push(filters.habitaciones);
  }

  query += ` ORDER BY fecha_publicacion DESC`;

  return executeQuery(query, params);
}

// Función para insertar una consulta de contacto
export async function insertContactQuery(contactData: {
  nombre: string;
  email: string;
  telefono: string;
  mensaje: string;
  propiedad_id?: number;
}) {
  const query = `
    INSERT INTO consultas_contacto
    (nombre, email, telefono, mensaje, propiedad_id, fecha_consulta)
    VALUES (?, ?, ?, ?, ?, NOW())
  `;
  
  return executeQuery(
    query, 
    [
      contactData.nombre,
      contactData.email,
      contactData.telefono,
      contactData.mensaje,
      contactData.propiedad_id || null
    ]
  );
}

export default pool;
