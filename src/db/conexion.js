// ============================================================
// src/db/conexion.js
// Conexión segura a MySQL usando un pool de conexiones (mysql2).
// El pool reutiliza conexiones, lo que es más eficiente y seguro
// que abrir una conexión nueva por cada petición.
// ============================================================

const mysql = require('mysql2/promise');
require('dotenv').config();

// Crear el pool de conexiones con los datos del archivo .env
const pool = mysql.createPool({
  host:               process.env.DB_HOST     || 'localhost',
  port:               process.env.DB_PORT     || 3306,
  user:               process.env.DB_USER     || 'root',
  password:           process.env.DB_PASS     || '',
  database:           process.env.DB_NAME     || 'api_clientes_db',
  charset:            'utf8mb4',
  waitForConnections: true,   // Espera si no hay conexiones disponibles
  connectionLimit:    10,     // Máximo de conexiones simultáneas
  queueLimit:         0,      // Sin límite de peticiones en cola
});

module.exports = pool;
