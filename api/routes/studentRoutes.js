import express  from 'express';
import { createStudent, deleteStudent, getAllStudent, getSingleStudent, updateStudent } from '../controllers/studentController.js';
import { authMiddleware } from '../middlewares/authMiddlewares.js';

// Init Rest Api Router
const router = express.Router();

router.route('/').get(authMiddleware,getAllStudent).post(authMiddleware,createStudent);
router.route('/:id').get(authMiddleware,getSingleStudent).put(authMiddleware,updateStudent).patch(authMiddleware,updateStudent).delete(authMiddleware, deleteStudent);

// Export default Router
export default router;

