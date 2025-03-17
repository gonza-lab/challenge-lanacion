import { Request, Response } from 'express';
import articlesData from '../data/articles.json'

export const getArticles = async (_req: Request, res: Response) => {
  try {
    // const articles = await fetchArticles();
    res.json(articlesData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
};
