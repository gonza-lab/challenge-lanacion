import { Express } from 'express'
import qs from 'qs'
import { renderSSR } from './ssr'
import App from '../pages/App.server'
import About from '../pages/About.server'

const apiUrl = process.env.BACKENDFF_URL

export function setupRoutes(app: Express) {
  app.get('/', async (req, res) => {
    await renderSSR(req, res, App, async () => {
      const [resArticles, resTags] = await Promise.all([
        fetch(`${apiUrl}/articles?${qs.stringify({ page: 1, limit: 30 })}`),
        fetch(`${apiUrl}/tags`),
      ])

      if (!resArticles.ok || !resTags.ok) {
        throw new Error(
          `Failed to fetch: Articles(${resArticles.status}), Tags(${resTags.status})`
        )
      }

      const [articlesData, tagsData] = await Promise.all([
        resArticles.json(),
        resTags.json(),
      ])

      return {
        articles: articlesData.articles,
        tags: tagsData.tags,
      }
    })
  })

  app.get('/about', async (req, res) => {
    await renderSSR(req, res, About)
  })
}
