# API REST de Clientes

API REST desarrollada con **Node.js**, **Express** y **MySQL**, que implementa operaciones CRUD completas sobre la entidad `clientes`.

Actividad Sumativa – Semana 9 | Taller de Plataformas Web | AIEP

---

## Tecnologías utilizadas

| Tecnología | Versión | Uso |
|---|---|---|
| Node.js | 18+ | Entorno de ejecución |
| Express | 5.x | Framework web |
| mysql2 | 3.x | Cliente MySQL con soporte Promise |
| dotenv | 16.x | Variables de entorno |
| MySQL / MariaDB | 8+ / 10+ | Base de datos relacional |

---

## Estructura del proyecto

```
api_rest_clientes/
├── src/
│   ├── index.js                  # Punto de entrada del servidor
│   ├── db/
│   │   └── conexion.js           # Pool de conexiones MySQL
│   ├── routes/
│   │   └── clientes.js           # Endpoints CRUD de clientes
│   └── middlewares/
│       └── errorHandler.js       # Manejo global de errores
├── postman/
│   └── API_REST_Clientes.postman_collection.json
├── database.sql                  # Script SQL para crear la BD
├── .env.example                  # Plantilla de variables de entorno
├── .gitignore
├── package.json
└── README.md
```

---

## Instalación y ejecución local

### 1. Clonar el repositorio

```bash
git clone https://github.com/NachooDV/Actividad-sumativa-semana-9
cd api_rest_clientes
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Edita `.env` con los datos de tu MySQL:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=
DB_NAME=api_clientes_db
PORT=3000
```

### 4. Crear la base de datos

Ejecuta el script SQL en tu gestor de MySQL (phpMyAdmin o consola):

```bash
mysql -u root -p < database.sql
```

O abre `database.sql` en phpMyAdmin y ejecútalo.

### 5. Iniciar el servidor

```bash
npm start
```

El servidor estará disponible en: `http://localhost:3000`

---

## Endpoints disponibles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/clientes` | Listar todos los clientes |
| GET | `/api/clientes/:id` | Obtener cliente por ID |
| POST | `/api/clientes` | Crear nuevo cliente |
| PUT | `/api/clientes/:id` | Actualizar cliente existente |
| DELETE | `/api/clientes/:id` | Eliminar cliente |

---

## Modelo de datos

```sql
CREATE TABLE clientes (
  id_cliente  INT          NOT NULL AUTO_INCREMENT,
  nombre      VARCHAR(100) NOT NULL,
  email       VARCHAR(120) NOT NULL UNIQUE,
  telefono    VARCHAR(30)  NULL,
  created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_cliente)
);
```

---

## Ejemplos de uso con Postman

### GET – Listar todos los clientes
```
GET http://localhost:3000/api/clientes
```

### GET – Obtener cliente por ID
```
GET http://localhost:3000/api/clientes/1
```

### POST – Crear cliente
```
POST http://localhost:3000/api/clientes
Content-Type: application/json

{
  "nombre": "Laura Martínez",
  "email": "laura@correo.cl",
  "telefono": "+56944444444"
}
```

### PUT – Actualizar cliente
```
PUT http://localhost:3000/api/clientes/1
Content-Type: application/json

{
  "nombre": "Laura Martínez Actualizada",
  "email": "laura@correo.cl",
  "telefono": "+56999999999"
}
```

### DELETE – Eliminar cliente
```
DELETE http://localhost:3000/api/clientes/3
```

---

## Códigos de respuesta HTTP

| Código | Situación |
|--------|-----------|
| 200 | Operación exitosa (GET, PUT, DELETE) |
| 201 | Cliente creado correctamente (POST) |
| 400 | Datos inválidos o campos faltantes |
| 404 | Cliente no encontrado |
| 405 | Método HTTP no permitido |
| 409 | Conflict – El email ya está registrado |
| 500 | Error interno del servidor |

---

## Pruebas con Postman

Importa la colección incluida en `/postman/API_REST_Clientes.postman_collection.json`:

1. Abre Postman
2. Click en **Import**
3. Selecciona el archivo `.json`
4. Ejecuta cada request en orden

---

## Seguridad implementada

- **Consultas preparadas** con parámetros (`?`) → previene inyección SQL
- **Validación de inputs** antes de consultar la BD
- **Sanitización de texto** (elimina etiquetas HTML)
- **Manejo de errores HTTP** con códigos adecuados (400, 404, 409, 500)
- **Variables de entorno** para credenciales (nunca en el código)
