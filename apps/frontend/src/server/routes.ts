import { Express } from 'express'
import qs from 'qs'
import { renderSSR } from './ssr'
import App from '../pages/App.server'
import About from '../pages/About.server'

export function setupRoutes(app: Express) {
  app.get('/', async (req, res) => {
    await renderSSR(req, res, App, async () => {
      const response = await fetch(
        process.env.BACKENDFF_URL +
          '/articles?' +
          qs.stringify({ page: 1, limit: 30 })
      )
      return (await response.json()).articles
    })
  })

  app.get('/about', async (req, res) => {
    await renderSSR(req, res, About)
  })
}
