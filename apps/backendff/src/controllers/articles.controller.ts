import { Request, Response } from 'express'
import articlesData from '../data/articles.json'

// Con paginación mejoramos la optmización del endpoint ya que no estamos devolviendo todos los datos de una.

// Mejora: Buscar una librería o solución que ya implemente pagaginación para express para todos los endpoint 
// sin tener que hacerlo a mano
export const getArticles = async (_req: Request, res: Response) => {
  try {

    const { page = '1', limit = '10' } = _req.query

    const pageNumber = parseInt(page as string, 10)
    const limitNumber = parseInt(limit as string, 10)

    if (pageNumber < 1 || limitNumber < 1) {
      return res
        .status(400)
        .json({ error: 'Page and limit must be greater than 0' })
    }

    const startIndex = (pageNumber - 1) * limitNumber
    const endIndex = startIndex + limitNumber

    const paginatedArticles = articlesData.articles.slice(startIndex, endIndex)

    res.json({
      page: pageNumber,
      limit: limitNumber,
      totalArticles: articlesData.articles.length,
      totalPages: Math.ceil(articlesData.articles.length / limitNumber),
      articles: paginatedArticles,
    })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch articles' })
  }
}
