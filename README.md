# MiniBlog API

API REST para gestionar autores y posts, construida con Node.js, Express y PostgreSQL. Desarrollada como backend base del servicio de contenidos MiniBlog de DevSpark.

---

## Tecnologías

- Node.js 20+
- Express 5
- PostgreSQL
- swagger-ui-express + yamljs
- vitest + supertest

---

## Requisitos previos

- Node.js 20.6 o superior
- PostgreSQL instalado y corriendo localmente
- npm

---

## Configuración local

### 1. Clonar el repositorio

```bash
git clone https://github.com/tongax12/API-MiniBlog_GastonStratta.git
cd api-miniblog
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copiá el archivo de ejemplo (.env.example) y completá con tus valores:

```bash
cp .env.example .env
```

Contenido del `.env`:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=api_miniblog
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
NODE_ENV=development
PORT=3000
```

### 4. Crear la base de datos y las tablas

Ejecutá el script de setup SQL:

```bash
psql -U tu_usuario -f db/setup.sql
```

O si querés también cargar datos de ejemplo:

```bash
psql -U tu_usuario -f db/setup.sql
psql -U tu_usuario -d miniblog -f db/seed.sql
```

### 5. Iniciar el servidor

```bash
npm run dev
```

El servidor corre en `http://localhost:3000`.

---

## Variables de entorno

| Variable      | Descripción                        | Ejemplo         |
|---------------|------------------------------------|-----------------|
| `DB_HOST`     | Host de PostgreSQL                 | `localhost`     |
| `DB_PORT`     | Puerto de PostgreSQL               | `5432`          |
| `DB_NAME`     | Nombre de la base de datos         | `miniblog`      |
| `DB_USER`     | Usuario de PostgreSQL              | `postgres`      |
| `DB_PASSWORD` | Contraseña de PostgreSQL           | `tu_contraseña` |
| `NODE_ENV`    | Entorno de ejecución               | `development`   |
| `PORT`        | Puerto del servidor                | `3000`          |

---

## Endpoints disponibles

| Método | Ruta                  | Descripción                            |
|--------|-----------------------|----------------------------------------|
| GET    | /authors              | Obtener todos los autores              |
| GET    | /authors/:id          | Obtener un autor por ID                |
| POST   | /authors              | Crear un autor                         |
| PUT    | /authors/:id          | Actualizar un autor                    |
| DELETE | /authors/:id          | Eliminar un autor                      |
| GET    | /posts                | Obtener todos los posts                |
| GET    | /posts/:id            | Obtener un post por ID                 |
| GET    | /posts/author/:id     | Obtener los posts de un autor          |
| POST   | /posts                | Crear un post                          |
| PUT    | /posts/:id            | Actualizar un post                     |
| DELETE | /posts/:id            | Eliminar un post                       |

---

## Documentación OpenAPI

Con el servidor corriendo, accedé a la documentación interactiva en:

```
http://localhost:3000/docs
```

Desde ahí podés explorar y probar todos los endpoints directamente desde el navegador.

El archivo de especificación está en `openapi.yaml` en la raíz del proyecto.

---

## Tests

El proyecto tiene tres archivos de tests:

| Archivo                        | Tipo         | Descripción                              |
|--------------------------------|--------------|------------------------------------------|
| `tests/authors.test.js`        | Integración  | CRUD completo de autores                 |
| `tests/posts.test.js`          | Integración  | CRUD completo de posts                   |
| `tests/validator.unit.test.js` | Unitario     | Lógica de validaciones sin base de datos |

Para ejecutarlos:

```bash
npm test
```

> Los tests de integración se conectan a la base de datos real definida en `.env`. Asegurate de que la base esté corriendo antes de ejecutarlos. Los datos creados durante los tests se eliminan automáticamente al finalizar.

---

## Deployment en Railway

### 1. Crear el proyecto en Railway

Entrá a [railway.app](https://railway.app), creá un nuevo proyecto y conectá tu repositorio de GitHub.

### 2. Agregar una base de datos PostgreSQL

Dentro del proyecto en Railway, hacé clic en **New** → **Database** → **PostgreSQL**. Railway crea la base automáticamente.

### 3. Configurar las variables de entorno

En el servicio de tu app, andá a **Variables** y agregá:

```
DB_HOST=       → copiá el valor de la Internal URL de Railway
DB_PORT=5432
DB_NAME=       → nombre de la base creada por Railway
DB_USER=       → usuario generado por Railway
DB_PASSWORD=   → contraseña generada por Railway
NODE_ENV=production
PORT=3000
```

> Para encontrar estos valores: en el servicio de PostgreSQL de Railway, hacé clic en **Connect** y copiá las credenciales de la sección **Internal URL** (usala para conectar servicios dentro del mismo proyecto) o **Public URL** (para conectarte desde tu máquina local).

### 4. Ejecutar el schema en producción

Desde tu máquina local, conectate a la base de Railway usando la Public URL:

```bash
psql "postgresql://usuario:contraseña@host-publico:puerto/nombre_db" -f db/setup.sql
```

### 5. Deploy

Railway hace deploy automático cada vez que pusheás a la rama principal. También podés triggerear un deploy manual desde el dashboard.

La URL pública de tu API queda disponible en la sección **Settings** → **Domains** de tu servicio en Railway.

---

## Estructura del proyecto

```
miniblog-api/
├── src/
│   ├── controllers/
│   │   ├── authorController.js
│   │   └── postController.js
│   ├── services/
│   │   ├── authorService.js
│   │   └── postService.js
│   ├── routes/
│   │   ├── authors.routes.js
│   │   └── posts.routes.js
│   ├── middlewares/
│       ├── errorHandler.js
│       └── validator.js
│── db/
│   ├── config.js
│   ├── setup.sql
│   └── seed.sql
├── tests/
│   ├── authors.test.js
│   ├── posts.test.js
│   └── validator.unit.test.js
├── openapi.yaml
├── server.js
├── index.js
├── .env.example
├── vitest.config.js
|── README.md
|── package.json
|── package-lock.json
```

---

## Uso de IA en el proyecto

Durante el desarrollo de este proyecto se utilizó Claude (Anthropic) como asistente de programación. Las áreas donde se empleó IA fueron:

- Orientación sobre la arquitectura del middleware de manejo de errores (`errorHandler.js`) y la lógica de códigos HTTP apropiados por tipo de error.
- Identificación y corrección de bugs, como el conflicto de rutas entre `/:id` y `/author/:id` en Express, y el error de importación del `errorHandler` como objeto en lugar de función.
- Ayuda con los errores que saltaban al testear el CRUD de manera manual y de errores en el código que saltaban al guardarse los archivos.
- Guía para la creación del endpoint: GET /posts/author/:id.
- Guía y corrector en el desarrollo de la documentación OpenAPI,marcando descripciones incompletas.

Todo el código generado fue revisado, adaptado e integrado manualmente al proyecto, verificando que funcionara correctamente con la base de código existente.