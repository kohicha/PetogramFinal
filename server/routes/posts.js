import { Router } from 'express';
import postController from '../controllers/postController.js'
const router = Router();

router.get('/api/posts', postController.getPosts)
router.get('/api/posts/post/:post_id', postController.getPost)
router.get('/api/users/:user_id/posts', postController.getUserPosts)
router.post('/api/posts/create', postController.createNewPost)

export default router;
