import express from 'express'
import path from 'path'
import { setupRoutes } from '@/server/routes'
import { CONFIG } from '@/config/env'
import compression from 'compression'

const app = express()
app.use(compression())

// Configurar las rutas
setupRoutes(app)

// Servir los archivos estáticos generados por el bundle del cliente
app.use(express.static(path.join(__dirname, '../../dist/client')))
app.use(express.static(path.join(__dirname, '../../public')))

// Iniciar el servidor
app.listen(CONFIG.PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${CONFIG.PORT}`)
})
