<p align="center">
  <img src="docs/portada-spark.svg" alt="Spark Fit Center — Sistema web de gestión para gimnasio" width="100%" />
</p>

<p align="center">
  <strong>Plataforma web para la presentación institucional y gestión administrativa de Spark Fit Center.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Astro-5-ff5d01?style=for-the-badge&logo=astro&logoColor=white" alt="Astro 5" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Hono-API-e36002?style=for-the-badge&logo=hono&logoColor=white" alt="Hono" />
  <img src="https://img.shields.io/badge/PostgreSQL-Database-4169e1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Supabase-Persistence-3ecf8e?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/Vercel-Deployment-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</p>

<p align="center">
  <a href="https://sistema-spark.vercel.app/">Demo en producción</a>
  ·
  <a href="https://sistema-spark.vercel.app/login">Panel administrativo</a>
</p>

<table align="center">
  <tr>
    <td align="center"><strong>INFOSIS BUILD FEST 2026</strong><br />Workshop + challenge de desarrollo web</td>
    <td align="center"><strong>30 SEP — 01 OCT</strong><br />Evento presencial</td>
    <td align="center"><strong>FACULTAD INTEGRAL DEL CHACO</strong><br />Ingeniería Informática y Sistemas</td>
  </tr>
</table>

## Tabla de contenidos

- [Sobre el proyecto](#sobre-el-proyecto)
- [Información del evento](#información-del-evento)
- [Funcionalidades](#funcionalidades)
- [Rutas principales](#rutas-principales)
- [Arquitectura](#arquitectura)
- [Tecnologías](#tecnologías)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Configuración local](#configuración-local)
- [Base de datos](#base-de-datos)
- [Validaciones y builds](#validaciones-y-builds)
- [Despliegue](#despliegue)
- [Contexto](#contexto)

## Sobre el proyecto

Spark Fit Center es un sistema web fullstack creado para centralizar la presencia digital del gimnasio y facilitar la administración de sus clientes.

El proyecto combina una landing page pública con un panel privado para administradores, autenticación segura, operaciones CRUD, filtros, paginación y persistencia en PostgreSQL mediante Supabase.

Fue desarrollado durante **INFOSIS BUILD FEST 2026**, una experiencia presencial de aprendizaje y creación de proyectos web con apoyo de herramientas de inteligencia artificial y prácticas modernas de desarrollo.

## Información del evento

**INFOSIS BUILD FEST** fue un evento presencial de la carrera de Ingeniería Informática y Sistemas de la Facultad Integral del Chaco, diseñado para aprender, construir y resolver un reto de desarrollo web en equipo.

| Aspecto | Detalle |
| --- | --- |
| Fechas | 30 de septiembre y 1 de octubre de 2026 |
| Modalidad | Presencial |
| Lugar | Laboratorio de cómputo de la Facultad Integral del Chaco |
| Público | Estudiantes de la Facultad y público general |
| Día 1 | Workshop guiado: 08:00–12:00 y 14:00–18:00 |
| Día 2 | Challenge de desarrollo web: 08:00–17:00 |
| Enfoque | OpenCode, desarrollo guiado por especificaciones, VS Code, Git y GitHub |

> Este proyecto representa la aplicación práctica de ese proceso: transformar una idea de negocio en una solución web funcional, conectada a una API y respaldada por una base de datos persistente.

## Estado actual

Spark Fit Center se encuentra en una primera versión funcional enfocada en la presencia digital y la gestión administrativa básica de un gimnasio.

Actualmente el sistema permite:

- Presentar la identidad, disciplinas, horarios y ubicación del gimnasio.
- Autenticar al administrador mediante JWT.
- Registrar, consultar y editar clientes.
- Filtrar clientes por distintos criterios.
- Persistir la información en PostgreSQL mediante Supabase.

La base de datos actual está compuesta por dos tablas principales:

| Tabla | Responsabilidad |
| --- | --- |
| `Administrador` | Usuarios autorizados para administrar el sistema |
| `Cliente` | Información básica de los clientes del gimnasio |

La arquitectura está preparada para ampliar el modelo de datos y las funcionalidades sin perder la separación entre frontend, backend y persistencia.

## Próximas funcionalidades

La evolución prevista del sistema contempla incorporar:

- Gestión de membresías y planes.
- Historial y control de pagos.
- Registro de asistencia.
- Administración de disciplinas y clases.
- Gestión de entrenadores.
- Roles y permisos adicionales.
- Reportes y estadísticas administrativas.
- Historial completo por cliente.

## Funcionalidades

- Página pública con identidad visual del gimnasio.
- Presentación de disciplinas, horarios y ubicación.
- Estado dinámico de apertura del gimnasio.
- Contacto directo mediante WhatsApp.
- Inicio de sesión administrativo con JWT.
- Registro, consulta y edición de clientes.
- Filtros por nombre, teléfono, tipo de entrada, tipo de pago y fechas.
- Paginación de resultados.
- Botón para restablecer todos los filtros.
- Validación de datos en frontend y backend.
- Conexión segura con PostgreSQL en Supabase.
- Despliegue integrado en Vercel.

## Rutas principales

### Interfaz web

| Ruta | Descripción |
| --- | --- |
| `/` | Página pública de Spark Fit Center |
| `/login` | Inicio de sesión administrativo |
| `/admin` | Dashboard administrativo |
| `/admin/clientes` | Lista, búsqueda y filtros de clientes |
| `/admin/clientes/nuevo` | Registro de un cliente |
| `/admin/clientes/editar` | Edición de un cliente |

### API

| Método | Ruta | Descripción |
| --- | --- | --- |
| `POST` | `/api/auth/login` | Autenticación del administrador |
| `POST` | `/api/auth/logout` | Cierre de sesión del cliente |
| `GET` | `/api/clientes` | Consulta y filtrado de clientes |
| `POST` | `/api/clientes` | Registro de un cliente |
| `PUT` | `/api/clientes/:id` | Actualización de un cliente |

Las rutas de clientes requieren un token JWT válido.

## Arquitectura

```text
┌────────────────────┐
│   Astro + Tailwind │  Interfaz pública y panel administrativo
└─────────┬──────────┘
          │ HTTP / JSON + JWT
          ▼
┌────────────────────┐
│   Hono + TypeScript│  API, validación y reglas de negocio
└─────────┬──────────┘
          │ PostgreSQL / SSL
          ▼
┌────────────────────┐
│ Supabase PostgreSQL│  Persistencia de administradores y clientes
└────────────────────┘
```

En producción, Vercel enruta las solicitudes de la siguiente forma:

```text
/api/* → Backend Hono
/*     → Frontend Astro
```

## Tecnologías

### Frontend

- Astro 5.
- TypeScript.
- Tailwind CSS 4.
- Zod.

### Backend

- Hono.
- TypeScript.
- Node.js.
- PostgreSQL mediante `pg`.
- Supabase.
- JWT.
- bcrypt.
- Zod.

### Infraestructura

- GitHub para control de versiones.
- Vercel para despliegue.
- Supabase para base de datos remota.

## Estructura del proyecto

```text
sistema-spark/
├── backend/
│   ├── api/                 # Entrada del backend para Vercel
│   └── src/
│       ├── config/          # Variables de entorno
│       ├── controllers/     # Controladores HTTP
│       ├── db/              # Pool PostgreSQL
│       ├── middlewares/     # JWT y manejo de errores
│       ├── repositories/    # Consultas a la base de datos
│       ├── routes/          # Rutas de la API
│       ├── schemas/         # Validaciones Zod
│       └── services/        # Lógica de negocio
├── db/
│   ├── 1.CreacionDeTablas.sql
│   ├── 2.Restricciones.sql
│   └── 3.InsercionDeDatos.sql
├── docs/
│   └── portada-spark.svg
├── frontend/
│   ├── public/              # Imágenes, logos y favicon
│   └── src/
│       ├── components/      # Componentes Astro reutilizables
│       ├── layouts/         # Layouts públicos y administrativos
│       ├── lib/             # API client y almacenamiento de sesión
│       ├── pages/           # Rutas de la interfaz
│       ├── schemas/         # Validaciones del frontend
│       └── styles/          # Estilos globales
└── vercel.json              # Orquestación frontend/backend
```

## Configuración local

### Requisitos

- Node.js 20 o superior.
- npm.
- Una instancia PostgreSQL/Supabase.

### Backend

```bash
cd backend
npm ci
```

Crea `backend/.env` a partir de `backend/.env.example` y completa las variables de conexión, JWT y CORS.

Inicia la API:

```bash
npm run dev
```

La API local estará disponible en:

```text
http://localhost:3000
```

### Frontend

```bash
cd frontend
npm ci
```

Crea `frontend/.env` a partir de `frontend/.env.example` y configura:

```env
PUBLIC_API_URL=http://localhost:3000
```

Inicia Astro:

```bash
npm run dev
```

La interfaz estará disponible en:

```text
http://localhost:4321
```

## Base de datos

Ejecuta los scripts SQL en Supabase en este orden:

```text
db/1.CreacionDeTablas.sql
db/2.Restricciones.sql
db/3.InsercionDeDatos.sql
```

Las credenciales reales y secretos deben permanecer en variables de entorno. No deben incluirse en Git.

## Validaciones y builds

Frontend:

```bash
npm run check
npm run build
```

Backend:

```bash
npm run build
npm run lint
```

## Despliegue

El archivo `vercel.json` define dos servicios dentro del mismo proyecto:

- Frontend Astro con salida estática.
- Backend Hono como función de Vercel.

Después de conectar el repositorio con Vercel, cada push a `main` puede generar un deployment de producción. Las ramas y Pull Requests generan deployments de preview.

Las variables de entorno de producción deben configurarse desde el panel de Vercel. Nunca se deben subir los archivos `.env`.

## Contexto

Proyecto desarrollado para **INFOSIS BUILD FEST 2026** como una solución web moderna para la gestión y presencia digital de un gimnasio.

---

<p align="center">
  <sub>Spark Fit Center · Fuerza · Disciplina · Comunidad</sub>
</p>
