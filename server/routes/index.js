import { Router } from 'express';
import authRouter from './auth.js';
import usersRouter from './users.js'
import postsRouter from './posts.js'
const router = Router();

router.use(authRouter)
router.use(usersRouter)
router.use(postsRouter)
export default router;
