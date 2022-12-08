import express from 'express';
import { addRemoveLike } from '../controllers/posts/addRemoveLike';
import { createPost } from '../controllers/posts/createPost';
import { deletePost } from '../controllers/posts/deletePost';
import { fetchMyPosts } from '../controllers/posts/fetchMyPosts';
import { fetchPostDetails } from '../controllers/posts/fetchPostDetails';
import { fetchPosts } from '../controllers/posts/fetchPosts';
import { tagUser } from '../controllers/posts/tagUser';
import verifyToken from '../middleware/auth';

const router = express.Router();


router.get("/my_posts", fetchMyPosts);
router.get("/all_posts", fetchPosts);
router.get("/:postId", fetchPostDetails)
// router.get("/following", fetchFollowingPosts)
// router.get("/trending", fetchTrendingPosts);
router.post("/" ,createPost);
router.delete("/:postId", deletePost);

router.post("/add_tag", tagUser);
router.patch("/:postId/add_remove_like", addRemoveLike);


export default router;