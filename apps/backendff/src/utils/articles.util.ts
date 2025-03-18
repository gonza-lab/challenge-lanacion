import { Article } from '@/types/Article.type'

export const filterBySubtype = (articles: Article[], subtype: string) => {
  return articles.filter(
    (article: { subtype: string }) => article.subtype === subtype
  )
}

interface PaginatedResult {
  page: number
  limit: number
  totalArticles: number
  totalPages: number
  articles: Article[]
}

export function paginateArticles(
  articlesData: Article[],
  query: { page?: string; limit?: string }
): PaginatedResult | { error: string } {
  const pageNumber = parseInt(query.page || '1', 10)
  const limitNumber = parseInt(query.limit || '10', 10)

  if (pageNumber < 1 || limitNumber < 1) {
    return { error: 'Page and limit must be greater than 0' }
  }

  const startIndex = (pageNumber - 1) * limitNumber
  const endIndex = startIndex + limitNumber

  const paginatedArticles = articlesData.slice(startIndex, endIndex)

  return {
    page: pageNumber,
    limit: limitNumber,
    totalArticles: articlesData.length,
    totalPages: Math.ceil(articlesData.length / limitNumber),
    articles: paginatedArticles,
  }
}
