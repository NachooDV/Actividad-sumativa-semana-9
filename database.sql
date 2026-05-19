-- ============================================================
-- database.sql
-- Script para crear la base de datos de la API REST de clientes.
-- ============================================================

-- Crear base de datos si no existe
CREATE DATABASE IF NOT EXISTS api_clientes_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE api_clientes_db;

-- Eliminar tabla si existe (para recrear limpio)
DROP TABLE IF EXISTS clientes;

-- ============================================================
-- Tabla: clientes
-- ============================================================
CREATE TABLE clientes (
  id_cliente  INT           NOT NULL AUTO_INCREMENT,
  nombre      VARCHAR(100)  NOT NULL,
  email       VARCHAR(120)  NOT NULL,
  telefono    VARCHAR(30)   NULL,
  created_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (id_cliente),
  UNIQUE KEY uq_clientes_email (email)
);

-- ============================================================
-- Lista de clientes de prueba
-- ============================================================
INSERT INTO clientes (nombre, email, telefono) VALUES
  ('Alan Brito',    'alan@brito.cl',    '+56911111111'),
  ('Esteban Quito',   'esteban@quito.cl',   '+56922222222'),
  ('Armando Casas', 'armando@casas.cl', '+56933333333');
