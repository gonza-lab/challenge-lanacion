import { Request, Response } from 'express'
import articlesData from '@/data/articles.json'
import { getTopTags as getTopTagsUtil } from '@/utils/tag.util'
import { filterBySubtype, paginateArticles } from '@/utils/articles.util'

export const getTopTags = async (_req: Request, res: Response) => {
  try {
    const articlesFiltered = filterBySubtype(articlesData.articles, '7')
    const result = paginateArticles(articlesFiltered, _req.query)

    if ('error' in result) {
      res.status(400).json(result)
      return
    }

    const { articles } = result

    res.json({
      tags: getTopTagsUtil(articles).map((tag) => ({
        href: `/tema/${tag.slug}`,
        children: tag.text,
      })),
    })
  } catch (error: unknown) {
    console.error('Error fetching articles: ', error)
    res.status(500).json({ error: 'Failed to fetch articles' })
  }
}
