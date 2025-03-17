import 'dotenv/config'
import express from 'express'
import React from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import path from 'path'
import App from '../components/App.server'
import qs from 'qs'

const app = express()

// TODO: Mejorar organización 
app.get('/', async (req, res) => {
  res.setHeader('Content-Type', 'text/html')

  try {
    const response = await fetch(
      process.env.BACKENDFF_URL +
        '/articles?' +
        qs.stringify({ page: 1, limit: 30 })
    )
    const articles = await response.json()

    const { pipe } = renderToPipeableStream(
      <App articles={articles.articles} />,
      {
        onShellReady() {
          res.write(`<!DOCTYPE html>
        <html lang="es">
          <head>
            <meta charset="UTF-8">
            <title>React Server Components</title>
            <link rel="stylesheet" href="/styles.css">
          </head>
          <body>
            <div id="root">`)
          pipe(res)
          res.write(`</div>
            <script>
              window.__INITIAL_DATA__ = ${JSON.stringify(articles.articles)}; 
            </script>
            <script src="/client.bundle.js"></script>
          </body>
        </html>`)
        },
        onError(error) {
          console.error(error)
          res.status(500).send('Error interno del servidor')
        },
      }
    )
  } catch (error) {
    console.error('Error al obtener datos:', error)
    res.status(500).send('Error interno del servidor')
  }
})

// Servir los archivos estáticos generados por el bundle del cliente
app.use(express.static(path.join(__dirname, '../../dist/client')))
app.use(express.static(path.join(__dirname, '../../public')))

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000')
})
