import { Router } from 'express';
import { getArticles } from '@/controllers/articles.controller';
import { getTopTags } from '@/controllers/tags.controller';

const router = Router();
router.get('/articles', getArticles);
router.get('/tags', getTopTags);

export default router;
