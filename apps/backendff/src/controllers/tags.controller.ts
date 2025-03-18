import { Request, Response } from 'express'
import articlesData from '@/data/articles.json'
import { getTopTags as getTopTagsUtil } from '@/utils/tag.util'

export const getTopTags = async (_req: Request, res: Response) => {
  try {
    res.json({
      tags: getTopTagsUtil(articlesData.articles).map((tag) => ({
        href: `/tema/${tag.slug}`,
        children: tag.text,
      })),
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch articles' })
  }
}
