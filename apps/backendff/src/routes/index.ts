import { Router } from 'express';
import articlesRoutes from '@/routes/articles.routes';

const router = Router();
router.use(articlesRoutes);

export default router;
