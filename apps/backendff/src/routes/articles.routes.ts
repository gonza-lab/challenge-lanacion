import { Router } from 'express';
import { getArticles } from '../controllers/articles.controller';

const router = Router();
router.get('/articles', getArticles);

export default router;
