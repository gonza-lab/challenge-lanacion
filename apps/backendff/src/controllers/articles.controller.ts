import { Request, Response } from 'express'
import articlesData from '@/data/articles.json'
import { filterBySubtype, paginateArticles } from '@/utils/articles.util'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

// Con paginación mejoramos la optmización del endpoint ya que no estamos devolviendo todos los datos de una.

// Mejora: Buscar una librería o solución que ya implemente pagaginación para express para todos los endpoint
// sin tener que hacerlo a mano
export const getArticles = async (_req: Request, res: Response) => {
  try {
    const articles = filterBySubtype(articlesData.articles, '7')
    const result = paginateArticles(articles, _req.query)

    if ('error' in result) {
      res.status(400).json(result)
      return
    }

    res.json({
      ...result,
      articles: result.articles.map((article) => ({
        title: article.headlines.basic,
        image: article.promo_items?.basic?.url,
        date: format(article.display_date, "d 'de' MMMM 'de' yyyy", {
          locale: es,
        }),
      })),
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch articles' })
  }
}
