import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import path from 'path';
import App from '../components/App.server';

const app = express();


app.get('/', (req, res) => {
  // Renderizamos el componente del servidor a HTML
  const content = renderToString(<App />);
  const html = `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>React Server Components</title>
				<link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <div id="root">${content}</div>
        <script src="/client.bundle.js"></script>
      </body>
    </html>
  `;
  res.send(html);
});

// Servir los archivos estáticos generados por el bundle del cliente
app.use(express.static(path.join(__dirname, '../../dist/client')));
app.use(express.static(path.join(__dirname, '../../public')));

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
