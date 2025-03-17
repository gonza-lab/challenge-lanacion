import express from 'express';
import path from 'path';
import { setupRoutes } from './routes'; 
import { config } from './config';

const app = express();

// Configurar las rutas
setupRoutes(app);

// Servir los archivos estáticos generados por el bundle del cliente
app.use(express.static(path.join(__dirname, '../../dist/client')))
app.use(express.static(path.join(__dirname, '../../public')))

// Iniciar el servidor
app.listen(config.PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${config.PORT}`);
});
