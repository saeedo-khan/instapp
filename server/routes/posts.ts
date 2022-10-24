import express from 'express'
import { createPost, deletePost, getPost, getPosts, addLike, updatePost, addComment, dislike } from '../controllers/posts'
import verifyToken from '../middleware/auth';


const router = express.Router();

router.get('/',  getPosts)
router.get('/:id', getPost)
router.post('/', createPost)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)
router.post('/like', addLike)
router.delete('/like/:id', dislike)
router.post('/comment', addComment)

export default router