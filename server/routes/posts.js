import { Router } from 'express';
import postController from '../controllers/postController.js'
import {ensureAuthenticated, checkRole} from '../utils/middleware.js'
const router = Router();

router.get('/api/posts', postController.getPosts)
router.get('/api/posts/post/:post_id', postController.getPost)
router.get('/api/users/:user_id/posts', postController.getUserPosts)
router.post('/api/posts/create', postController.createNewPost)
router.get('/api/:user_id/favorites', postController.getUserFavorites)

router.post(
  "/shelter-registration",
  ensureAuthenticated,
  postController.createShelterRegistrationForm
);
router.get('/pending',  postController.getPendingShelterRegistrations);
router.post('/:shelter_id/accept',  postController.acceptShelterRegistration);
export default router;
