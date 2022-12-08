import express from 'express';
import { createComment } from '../controllers/comments/createComment';
import { deleteComment } from '../controllers/comments/deleteComment';
import { fetchComments } from '../controllers/comments/fetchComment';
import verifyToken from '../middleware/auth';

const router = express.Router();


router.post("/:postId", createComment)
router.get("/:postId", fetchComments)
router.delete("/:commentId", deleteComment)


export default router;