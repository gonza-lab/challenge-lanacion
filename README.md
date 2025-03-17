# Challenge La Nación

# Pasos para Añadir una Nueva Ruta en SSR

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
