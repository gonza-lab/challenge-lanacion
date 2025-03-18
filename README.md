# Challenge La Nación

- [Challenge La Nación](#challenge-la-nación)
	- [Descripción](#descripción)
	- [Características Técnicas del Proyecto](#características-técnicas-del-proyecto)
		- [Frontend](#frontend)
			- [Tecnologías Principales](#tecnologías-principales)
			- [Características Claves](#características-claves)
		- [Backend for Frontend (BFF)](#backend-for-frontend-bff)
			- [Tecnologías Principales](#tecnologías-principales-1)
			- [Características Claves](#características-claves-1)
	- [Estructura del Proyecto](#estructura-del-proyecto)
	- [Instalación](#instalación)
		- [1. Clonar el repositorio](#1-clonar-el-repositorio)
		- [2. Instalar dependencias](#2-instalar-dependencias)
	- [Scripts Disponibles](#scripts-disponibles)
		- [Desarrollo](#desarrollo)
	- [Configuración de Variables de Entorno](#configuración-de-variables-de-entorno)
		- [Frontend](#frontend-1)
	- [Pruebas](#pruebas)
	- [Pasos para Añadir una Nueva Ruta en SSR](#pasos-para-añadir-una-nueva-ruta-en-ssr)
		- [1. Crear el Componente de la Nueva Página](#1-crear-el-componente-de-la-nueva-página)
		- [2. Registrar la Nueva Ruta en el Servidor](#2-registrar-la-nueva-ruta-en-el-servidor)
		- [3. Actualizar la Hidratación en el Cliente](#3-actualizar-la-hidratación-en-el-cliente)


## Descripción
Este proyecto es una aplicación construida con un monorepo gestionado por Nx. Contiene un frontend basado en React aplicando técnicas de SSR y un Backend for Frontend (BFF) desarrollado con Express.

## Características Técnicas del Proyecto

### Frontend
#### Tecnologías Principales
- React con Server Components (RSC)
- Webpack + Babel para bundling y transformación de código
- ESLint + Prettier para linting y formateo de código
- Jest + React Testing Library para pruebas unitarias
- Arquitectura basada en **Atomic Design**:
  - `atoms/`: Componentes básicos reutilizables (botones, inputs)
  - `molecules/`: Combinación de átomos (formularios, cards)
  - `organisms/`: Secciones completas de UI (grids, navegaciones)
  - `pages/`: Estructura de cada página

#### Características Claves
- Renderizado híbrido combinando Client Components y Server Components
- Optimización para SEO mediante pre-renderizado en el servidor
- Modular y escalable con NX Monorepo
- Integración con el BFF para consumo de datos

---

### Backend for Frontend (BFF)
#### Tecnologías Principales
- Node.js con Express
- TypeScript para tipado fuerte
- Jest + Supertest para pruebas unitarias e integración
- NX Monorepo para gestión eficiente del código

#### Características Claves
- Filtrado de artículos obtenidos de forma local (se podría obtener de una api externa) (`subtype: "7"`)
- Agrupación y totalización de tags, ordenados de mayor a menor
- Reformateo de datos para optimizar la respuesta al frontend

## Estructura del Proyecto
```
/apps
  ├── frontend/      # Aplicación frontend
  ├── backendff/     # Backend for Frontend (BFF)
```

## Instalación
### 1. Clonar el repositorio
```sh
 git clone https://github.com/gonza-lab/challenge-lanacion
 cd source
```

### 2. Instalar dependencias
```sh
 npm install
```

## Scripts Disponibles
### Desarrollo
- **Frontend**
  - `npm run frontend:dev`: Ejecuta el frontend en modo desarrollo.
  - `npm run frontend:build`: Construye la aplicación frontend.
  - `npm run frontend:start`: Inicia el servidor del frontend.
  - `npm run frontend:lint`: Ejecuta ESLint en el frontend.
- **Backend**
  - `npm run backendff:dev`: Ejecuta el backend en modo desarrollo.
  - `npm run backendff:build`: Construye el backend.
  - `npm run backendff:start`: Inicia el backend en producción.
  - `npm run backendff:lint`: Ejecuta ESLint en el backend.
- **Tests y Lint**
	- `npm run test`: Ejecuta los tests de todos los proyectos.
  - `npm run lint`: Ejecuta ESLint en todo el proyecto.

## Configuración de Variables de Entorno 
### Frontend
Las variables de entorno deben definirse en un archivo `.env` en la raíz del proyecto (`/apps/frontend`). Existe un archivo `env.example` a modo de ejemplo con las variables de entorno usadas para el proyecto.

## Pruebas
Ejecutar pruebas unitarias y de integración:
```sh
npm test
```
---

## Pasos para Añadir una Nueva Ruta en SSR

Para agregar una nueva página en la aplicación SSR, debes hacer cambios en los siguientes archivos:

1. **Crear el componente de la nueva página (`.server.tsx`)**  
2. **Registrar la nueva ruta en el servidor (`server/routes.ts`)**  
3. **Actualizar la hidratación en el cliente (`index.tsx`)**  
4. **(Opcional) Obtener datos dinámicos en `server/ssr.ts`**  

---

### 1. Crear el Componente de la Nueva Página

Cada página debe tener su propio componente de servidor (`.server.tsx`).

```tsx
// src/pages/NuevaPagina.server.tsx
export default function NuevaPagina({ data }) {
  return (
    <main>
      <h1>Página Nueva</h1>
      <p>Bienvenido a la nueva página.</p>

      {data && (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </main>
  );
}
```

`data` se usará si la página necesita cargar información desde el backend.

### 2. Registrar la Nueva Ruta en el Servidor

Ahora hay que decirle a Express que esta página existe.

```ts
// server/routes.ts
import { Express } from 'express';
import { renderSSR } from './ssr';
import NuevaPagina from '../components/NuevaPagina.server';

export function setupRoutes(app: Express) {
  // Ruta existente
  app.get('/', async (req, res) => {
    await renderSSR(req, res, App, async () => {
      const response = await fetch(process.env.BACKENDFF_URL + '/articles');
      return response.json();
    });
  });

  // Nueva ruta
  app.get('/nueva', async (req, res) => {
    await renderSSR(req, res, NuevaPagina, async () => {
      const response = await fetch(process.env.BACKENDFF_URL + '/items');
      return response.json();
    });
  });
}

```

Esto le indica al servidor que /nueva debe renderizar NuevaPagina.
Si la ruta necesita datos, se pasa una función async para obtenerlos.

### 3. Actualizar la Hidratación en el Cliente

El cliente debe hidratar el componente correcto según la URL.

```tsx
import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from '../components/App.server';
import About from '../components/About.server';
import NuevaPagina from '../components/NuevaPagina.server';

// Agregar la nueva ruta al mapa de rutas
const routes: Record<string, React.FC<any>> = {
  '/': App,
  '/about': About,
  '/nueva': NuevaPagina,
};

const container = document.getElementById('root');

if (container) {
  const path = window.location.pathname;
  const Component = routes[path] || App; // Seleccionar el componente correcto
  hydrateRoot(container, <Component data={(window as any).__INITIAL_DATA__} />);
}

```
Ahora el cliente hidratará NuevaPagina cuando la URL sea /nueva.
La data del servidor sigue estando disponible en window.__INITIAL_DATA__.
