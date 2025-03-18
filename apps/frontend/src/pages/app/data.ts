import { CONFIG } from '@/config/env'
import qs from 'qs'

export async function getData({ page = 1, limit = 10 }) {
  const [resArticles, resTags] = await Promise.all([
    fetch(`${CONFIG.BACKENDFF_URL}/articles?${qs.stringify({ page, limit })}`),
    fetch(`${CONFIG.BACKENDFF_URL}/tags`),
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
}
