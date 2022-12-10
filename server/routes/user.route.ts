import express from 'express';
import { addRemoveFollow } from '../controllers/users/addRemoveFollow';
import { changePassword } from '../controllers/users/changePassword';
import { deleteUser } from '../controllers/users/deleteUser';
import { fetchAllUsers } from '../controllers/users/fetchAllUsers';
import { fetchFollowings } from '../controllers/users/fetchFollowing';
import { fetchUserDetails } from '../controllers/users/fetchUserDetails';
import { fetchUserPosts } from '../controllers/users/fetchUserPosts';
import { suggestUsers } from '../controllers/users/suggestUsers';
import { updateUserDetails } from '../controllers/users/updateUserDetails';
import { uploadProfilePic } from '../controllers/users/uploadProfilePic';


const router = express.Router();

router.get("/:name/posts", fetchUserPosts)
router.get("/:userId/all_following", fetchFollowings)
router.get("/:name", fetchUserDetails)
router.get("/suggest_users/:userId", suggestUsers)
router.get("/", fetchAllUsers)
router.patch("/details", updateUserDetails)
router.patch("/changePassword", changePassword)
router.patch("/upload_profile_pic", uploadProfilePic)
router.patch("/:followerId/add_remove_follow", addRemoveFollow)

router.delete("/:userId", deleteUser)
export default router;