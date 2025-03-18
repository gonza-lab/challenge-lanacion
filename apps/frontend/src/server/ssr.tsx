import React from 'react'
import { Request, Response } from 'express'
import { renderToPipeableStream } from 'react-dom/server'

export async function renderSSR(
  req: Request,
  res: Response,
  Component: React.FC<{ data: unknown }>,
  getData?: () => Promise<unknown>
) {
  res.setHeader('Content-Type', 'text/html')

  try {
    const data = getData ? await getData() : null

    const { pipe } = renderToPipeableStream(<Component data={data} />, {
      onShellReady() {
        res.write(`<!DOCTYPE html>
        <html lang="es">
          <head>
            <meta charset="UTF-8">
            <title>React Server Components</title>
            <link rel="stylesheet" href="/main.css">
          </head>
          <body>
            <div id="root">`)
        pipe(res)
        res.write(`</div>
            <script>
              window.__INITIAL_DATA__ = ${JSON.stringify(data)}; 
            </script>
            <script src="/client.bundle.js"></script>
          </body>
        </html>`)
      },
      onError(error) {
        console.error('Error en SSR:', error)
        res.status(500).send('Error interno del servidor')
      },
    })
  } catch (error) {
    console.error('Error al obtener datos:', error)
    res.status(500).send('Error al obtener datos')
  }
}
