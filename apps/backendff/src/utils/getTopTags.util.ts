import { Article } from '../types/Article.type'
import { Tag } from '../types/Tag.type'

export function getTopTags(articles: Article[], limit = 10): Tag[] {
  const tagCounts: Record<string, { count: number; tag: Tag }> = {}

  articles.forEach((article) => {
    article.taxonomy.tags.forEach((tag) => {
      if (!tagCounts[tag.slug]) {
        tagCounts[tag.slug] = { tag, count: 0 }
      }
      tagCounts[tag.slug].count++
    })
  })

  return Object.values(tagCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
    .map(({ tag }) => tag)
}
