import { Express } from 'express'
import { renderSSR } from './ssr'
import App from '@/pages/app'
import About from '@/pages/about'
import { getData } from '@/pages/app/data'

export function setupRoutes(app: Express) {
  app.get('/', async (req, res) => {
    const { page, limit } = req.query

    if (!limit || !page) {
      return res.redirect(302, '/?limit=30&page=1')
    }

    await renderSSR(req, res, App, () =>
      getData({
        page: Number(page),
        limit: Number(limit),
      })
    )
  })

  app.get('/about', async (req, res) => {
    await renderSSR(req, res, About)
  })
}
