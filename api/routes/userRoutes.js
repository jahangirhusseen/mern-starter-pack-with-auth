import express  from 'express';
import { createUser, deleteUser, getAllUser, getSingleUser, updateUser, userLogin, userRegister } from '../controllers/userController.js';
import { adminMiddleware } from '../middlewares/adminMiddlewares.js';
import { authMiddleware } from '../middlewares/authMiddlewares.js';
import { userMiddleware } from '../middlewares/userMiddlewares.js';


// Init Router
const router = express.Router();

// Route Rest Api
router.route('/').get(adminMiddleware, getAllUser).post(authMiddleware, createUser);
router.route('/:id').get(userMiddleware,getSingleUser).put(userMiddleware,updateUser).patch(userMiddleware,updateUser).delete(userMiddleware, deleteUser);

//  user Auth Route

router.post('/login',userLogin);
router.post('/register',userRegister);

// Export default Router
export default router;

