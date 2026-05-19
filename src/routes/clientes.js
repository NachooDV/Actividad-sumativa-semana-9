// ============================================================
// src/routes/clientes.js
// Rutas de la API REST para la entidad "clientes".
//
// Endpoints disponibles:
//   GET    /api/clientes          → Listar todos los clientes
//   GET    /api/clientes/:id      → Obtener un cliente por ID
//   POST   /api/clientes          → Crear un cliente nuevo
//   PUT    /api/clientes/:id      → Actualizar un cliente existente
//   DELETE /api/clientes/:id      → Eliminar un cliente
// ============================================================

const express = require('express');
const router  = express.Router();
const pool    = require('../db/conexion');

// ── Funciones de validación ───────────────────────────────────

// Valida que el ID sea un entero positivo
function esIdValido(id) {
  return Number.isInteger(Number(id)) && Number(id) > 0;
}

// Valida formato de correo electrónico
function esEmailValido(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Limpia texto: elimina espacios extremos y etiquetas HTML
function limpiar(valor) {
  if (typeof valor !== 'string') return '';
  return valor.trim().replace(/<[^>]*>/g, '');
}

// ── GET /api/clientes ─────────────────────────────────────────
// Retorna la lista completa de clientes ordenada por ID desc.
router.get('/', async (req, res, next) => {
  try {
    const [clientes] = await pool.query(
      'SELECT * FROM clientes ORDER BY id_cliente DESC'
    );
    res.status(200).json({ ok: true, clientes });
  } catch (err) {
    next(err); // Pasa el error al middleware global
  }
});

// ── GET /api/clientes/:id ─────────────────────────────────────
// Retorna un único cliente según su ID.
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  if (!esIdValido(id)) {
    return res.status(400).json({ ok: false, mensaje: 'ID inválido.' });
  }

  try {
    // Consulta preparada: el valor se pasa como parámetro,
    // nunca se concatena directamente en el SQL (previene SQL Injection).
    const [rows] = await pool.query(
      'SELECT * FROM clientes WHERE id_cliente = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ ok: false, mensaje: 'Cliente no encontrado.' });
    }

    res.status(200).json({ ok: true, cliente: rows[0] });
  } catch (err) {
    next(err);
  }
});

// ── POST /api/clientes ────────────────────────────────────────
// Crea un nuevo cliente. Campos requeridos: nombre, email.
router.post('/', async (req, res, next) => {
  const nombre   = limpiar(req.body.nombre   ?? '');
  const email    = limpiar(req.body.email    ?? '');
  const telefono = limpiar(req.body.telefono ?? '');

  // Validaciones de campos obligatorios
  if (!nombre || !email) {
    return res.status(400).json({
      ok:      false,
      mensaje: 'Los campos nombre y email son obligatorios.',
    });
  }

  if (!esEmailValido(email)) {
    return res.status(400).json({
      ok:      false,
      mensaje: 'El formato del email no es válido.',
    });
  }

  try {
    const [resultado] = await pool.query(
      'INSERT INTO clientes (nombre, email, telefono) VALUES (?, ?, ?)',
      [nombre, email, telefono]
    );

    res.status(201).json({
      ok:         true,
      mensaje:    'Cliente creado correctamente.',
      id_cliente: resultado.insertId,
    });
  } catch (err) {
    // El error 409 (email duplicado) se maneja en errorHandler.js
    next(err);
  }
});

// ── PUT /api/clientes/:id ─────────────────────────────────────
// Actualiza los datos de un cliente existente.
router.put('/:id', async (req, res, next) => {
  const { id } = req.params;

  if (!esIdValido(id)) {
    return res.status(400).json({ ok: false, mensaje: 'ID inválido.' });
  }

  const nombre   = limpiar(req.body.nombre   ?? '');
  const email    = limpiar(req.body.email    ?? '');
  const telefono = limpiar(req.body.telefono ?? '');

  if (!nombre || !email) {
    return res.status(400).json({
      ok:      false,
      mensaje: 'Los campos nombre y email son obligatorios.',
    });
  }

  if (!esEmailValido(email)) {
    return res.status(400).json({
      ok:      false,
      mensaje: 'El formato del email no es válido.',
    });
  }

  try {
    const [resultado] = await pool.query(
      'UPDATE clientes SET nombre = ?, email = ?, telefono = ? WHERE id_cliente = ?',
      [nombre, email, telefono, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        ok:      false,
        mensaje: 'Cliente no encontrado. No se realizó ninguna actualización.',
      });
    }

    res.status(200).json({ ok: true, mensaje: 'Cliente actualizado correctamente.' });
  } catch (err) {
    next(err);
  }
});

// ── DELETE /api/clientes/:id ──────────────────────────────────
// Elimina un cliente por su ID.
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;

  if (!esIdValido(id)) {
    return res.status(400).json({ ok: false, mensaje: 'ID inválido.' });
  }

  try {
    const [resultado] = await pool.query(
      'DELETE FROM clientes WHERE id_cliente = ?',
      [id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ ok: false, mensaje: 'Cliente no encontrado.' });
    }

    res.status(200).json({ ok: true, mensaje: 'Cliente eliminado correctamente.' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
