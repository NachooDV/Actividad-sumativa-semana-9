// ============================================================
// src/index.js
// Punto de entrada de la API REST.
// ============================================================

require('dotenv').config();

const express      = require('express');
const clientesRouter = require('./routes/clientes');
const errorHandler = require('./middlewares/errorHandler');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middlewares globales ──

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// ── Ruta de estado (health check) ───────────────────────────
// Permite verificar rápidamente que el servidor está activo.
app.get('/', (req, res) => {
  res.status(200).json({
    ok:      true,
    mensaje: 'API REST de Clientes funcionando correctamente.',
    version: '1.0.0',
  });
});

// ── Rutas de la API ───────────────────────────────────────────
app.use('/api/clientes', clientesRouter);

// ── Ruta no encontrada (404) ──────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ ok: false, mensaje: 'Ruta no encontrada.' });
});

// ── Middleware de errores (debe ir al final) ──────────────────
app.use(errorHandler);

// ── Iniciar servidor ──────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Endpoints disponibles:`);
  console.log(`GET    http://localhost:${PORT}/api/clientes`);
  console.log(`GET    http://localhost:${PORT}/api/clientes/:id`);
  console.log(`POST   http://localhost:${PORT}/api/clientes`);
  console.log(`PUT    http://localhost:${PORT}/api/clientes/:id`);
  console.log(`DELETE http://localhost:${PORT}/api/clientes/:id`);
});
