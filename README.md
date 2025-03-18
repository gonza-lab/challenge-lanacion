
# Challenge La Nación
## Contenido
- [Challenge La Nación](#challenge-la-nación)
	- [Contenido](#contenido)
	- [Descripción](#descripción)
	- [Decisiones técnicas](#decisiones-técnicas)
		- [Monorepo o repositorios independientes?](#monorepo-o-repositorios-independientes)
		- [Por qué implementé PurgeCSS?](#por-qué-implementé-purgecss)
		- [Por qué tengo dos archivos de configuración Webpack en el frontend?](#por-qué-tengo-dos-archivos-de-configuración-webpack-en-el-frontend)
		- [Por qué uso un componente LazyImage para las imágenes?](#por-qué-uso-un-componente-lazyimage-para-las-imágenes)
		- [Por qué un Backend for Frontend (BFF)?](#por-qué-un-backend-for-frontend-bff)
		- [Por qué implemento rutas?](#por-qué-implemento-rutas)
		- [Por qué implemento paginación?](#por-qué-implemento-paginación)
		- [Por qué añadí un script que valida la configuración del archivo `.env`?](#por-qué-añadí-un-script-que-valida-la-configuración-del-archivo-env)
		- [Por qué uso alias?](#por-qué-uso-alias)
		- [Por qué uso Husky?](#por-qué-uso-husky)
		- [Por qué uso Atomic Design?](#por-qué-uso-atomic-design)
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
	- [Configuración de Variables de Entorno](#configuración-de-variables-de-entorno)
	- [Ejecución en modo desarrollo](#ejecución-en-modo-desarrollo)
	- [Scripts Disponibles](#scripts-disponibles)
		- [Desarrollo](#desarrollo)
		- [Docker](#docker)
	- [Pruebas](#pruebas)
	- [Pasos para Añadir una Nueva Ruta en SSR](#pasos-para-añadir-una-nueva-ruta-en-ssr)
		- [1. Crear el Componente de la Nueva Página](#1-crear-el-componente-de-la-nueva-página)
		- [2. Registrar la Nueva Ruta en el Servidor](#2-registrar-la-nueva-ruta-en-el-servidor)
		- [3. Actualizar la Hidratación en el Cliente](#3-actualizar-la-hidratación-en-el-cliente)


## Descripción
Este proyecto es una aplicación construida con un monorepo gestionado por Nx. Contiene un frontend basado en React aplicando técnicas de SSR y un Backend for Frontend (BFF) desarrollado con Express.

## Decisiones técnicas

### Monorepo o repositorios independientes?
Elegí un monorepo principalmente porque el backend está construido exclusivamente para el frontend (se encuentra acoplado) y las posibilidades de que dicho back se utilice en otro lugar son mínimas. El monorepo permite una gestión más sencilla al tener todo el código en un solo lugar.

### Por qué implementé PurgeCSS?
El CSS provisto por el challenge contiene aproximadamente 6000 líneas. El HTML provisto  es de una aplicación sencilla, por lo que es razonable asumir que no utiliza todos los estilos disponibles en el archivo de estilos.

Por esta razón, decidí agregar un plugin al webpack del cliente que extrae y envía al navegador solo las clases realmente utilizadas en el HTML. Esto reduce significativamente el tamaño de la hoja de estilos enviada al cliente, mejorando el rendimiento y reduciendo el tiempo de carga de la aplicación.

Hice pruebas y, de 6000 lineas de estilos, tras la implementación de PurgeCSSS se pasaron a enviar 1000.

### Por qué tengo dos archivos de configuración Webpack en el frontend?
Me ayuda a aplicar Server-Side Rendering (SSR). Prerenderizo la aplicación en el servidor con `renderToPipeableStream` y luego la hidrato en el cliente con `hydrateRoot`. Por esta razón, genero dos bundles:

- **Server bundle**: Se envía al cliente cuando se accede a la web.
- **Client bundle**: Se carga en el navegador y se encarga de hidratar la aplicación.


### Por qué uso un componente LazyImage para las imágenes?
Dado que la lista contiene muchas imágenes, no es eficiente cargarlas todas de inmediato. Utilizo `IntersectionObserver` para cargar solo las imágenes visibles en el viewport del usuario, mejorando el rendimiento. Una mejora que se podría hacer es cargar inmediatamente las imágenes que ya están en el viewport inicial, sin esperar al `useEffect`.

### Por qué un Backend for Frontend (BFF)?
El BFF se encarga de preparar los datos para que el frontend los consuma, separando esta responsabilidad de la lógica y la estructura del frontend. Esto facilita el mantenimiento y la escalabilidad del proyecto.

### Por qué implemento rutas?
Para que la aplicación sea escalable y pueda adaptarse a futuras necesidades sin grandes modificaciones. [Más info acá](#pasos-para-añadir-una-nueva-ruta-en-ssr)

### Por qué implemento paginación?
La paginación permite devolver respuestas más cortas y mejorar el rendimiento de la aplicación, reduciendo la carga en el servidor y optimizando la experiencia del usuario.

### Por qué añadí un script que valida la configuración del archivo `.env`?
Es común que al clonar un proyecto se intente levantar sin tener las variables de entorno correctamente configuradas. Este script previene ese problema asegurándose de que todas las variables requeridas estén definidas antes de ejecutar la aplicación.

### Por qué uso alias?
- Simplifican las importaciones en proyectos grandes, evitando rutas largas y complejas.
- Facilitan la reorganización del código, permitiendo mover archivos sin romper referencias.

### Por qué uso Husky?
Husky permite ejecutar scripts antes de realizar un commit. Un problema frecuente es modificar algo en desarrollo y enviarlo con tests fallidos o errores de lint. Husky previene esto ejecutando pruebas y chequeos antes de permitir un commit.

### Por qué uso Atomic Design?
Atomic Design es una metodología efectiva para proyectos pequeños. En este caso, el proyecto no tiene una lógica de negocio compleja, por lo que una arquitectura basada en features no aportaría grandes beneficios en esta etapa.

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

## Configuración de Variables de Entorno 
Las variables de entorno se deben definir en un archivo `.env` en la raíz de cada proyecto (`/apps/frontend|backendff`). Existe un archivo `env.example` a modo de ejemplo con las variables de entorno utilizadas.

## Ejecución en modo desarrollo

Para correr el proyecto en modo desarrollo, sigue los siguientes pasos:

1. **Levantar el backend en modo desarrollo:**
   ```sh
   npm run backendff:dev
   ```

2. **Levantar el frontend en modo desarrollo:**
   ```sh
   npm run frontend:dev
   ```

Ambos comandos deben ejecutarse en paralelo. 

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

### Docker
- `npm run docker:up` → Levanta los servicios con Docker Compose.
- `npm run docker:down` → Detiene y elimina los contenedores.
- `npm run docker:logs` → Muestra logs en tiempo real.
- `npm run docker:restart` → Reinicia los contenedores.


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
