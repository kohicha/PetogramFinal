import { Router } from 'express';
import userController from '../controllers/userController.js'
import {ensureAuthenticated, checkRole} from '../utils/middleware.js'

const router = Router(); 

router.get('/api/users', userController.getUsers)
router.get('/api/users/:user_id', userController.getUser)
router.get('/api/user/:username', userController.getUserByUsername)
router.post('/api/users/favorites/:post_id', ensureAuthenticated, userController.addToFavorite);
export default router;
