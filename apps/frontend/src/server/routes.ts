import { Express } from 'express'
import { renderSSR } from './ssr'
import App, { getData } from '@/pages/App.server'
import About from '@/pages/About.server'

export function setupRoutes(app: Express) {
  app.get('/', async (req, res) => {
    const { page, limit } = req.query
    await renderSSR(req, res, App, () =>
      getData({
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
        page: isNaN(page as any) ? undefined : Number(page),
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
        limit: isNaN(limit as any) ? undefined : Number(limit),
      })
    )
  })

  app.get('/about', async (req, res) => {
    await renderSSR(req, res, About)
  })
}
