import { Request, Response } from 'express'
import articlesData from '../data/articles.json'
import { format } from 'date-fns/format'
import { es } from 'date-fns/locale'
import { filterBySubtype } from '../utils/articles.util'

// Con paginación mejoramos la optmización del endpoint ya que no estamos devolviendo todos los datos de una.

// Mejora: Buscar una librería o solución que ya implemente pagaginación para express para todos los endpoint
// sin tener que hacerlo a mano
export const getArticles = async (_req: Request, res: Response) => {
  try {
    const { page = '1', limit = '10' } = _req.query

    const pageNumber = parseInt(page as string, 10)
    const limitNumber = parseInt(limit as string, 10)

    if (pageNumber < 1 || limitNumber < 1) {
      res.status(400).json({ error: 'Page and limit must be greater than 0' })
      return
    }

    const startIndex = (pageNumber - 1) * limitNumber
    const endIndex = startIndex + limitNumber

    const paginatedArticles = filterBySubtype(
      articlesData.articles.slice(startIndex, endIndex),
      '7'
    )

    res.json({
      page: pageNumber,
      limit: limitNumber,
      totalArticles: articlesData.articles.length,
      totalPages: Math.ceil(articlesData.articles.length / limitNumber),
      articles: paginatedArticles.map((article) => ({
        title: article.headlines.basic,
        image: article.promo_items?.basic.url,
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
