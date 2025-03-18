import { Express } from 'express'
import { renderSSR } from './ssr'
import App, { getData } from '@/pages/App.server'
import About from '@/pages/About.server'

export function setupRoutes(app: Express) {
  app.get('/', async (req, res) => {
    await renderSSR(req, res, App, getData)
  })

  app.get('/about', async (req, res) => {
    await renderSSR(req, res, About)
  })
}
