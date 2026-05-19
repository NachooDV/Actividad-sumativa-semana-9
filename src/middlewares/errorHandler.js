// ============================================================
// src/middlewares/errorHandler.js
// Middleware global de manejo de errores.
// Captura cualquier error no controlado y responde con JSON.
// ============================================================

function errorHandler(err, req, res, next) {
  console.error('[ERROR]', err.message);

  // Error de llave duplicada en MySQL (correo ya registrado)
  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({
      ok:      false,
      mensaje: 'El correo electrónico ya está registrado.',
    });
  }

  // Error genérico del servidor
  res.status(500).json({
    ok:      false,
    mensaje: 'Error interno del servidor.',
    detalle: err.message,
  });
}

module.exports = errorHandler;
