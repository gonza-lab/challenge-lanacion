import { Router } from 'express';
import articlesRoutes from './articles.routes';

const router = Router();
router.use(articlesRoutes);

export default router;
