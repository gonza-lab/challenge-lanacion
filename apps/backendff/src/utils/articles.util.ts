import { Article } from '@/types/Article.type'

export const filterBySubtype = (articles: Article[], subtype: string) => {
  return articles.filter(
    (article: { subtype: string }) => article.subtype === subtype
  )
}