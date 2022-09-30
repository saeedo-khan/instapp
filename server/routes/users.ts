import express from 'express'
import { createUser, delateUser, getUser, getUsers, updateUser, addFollower, deleteFollower } from '../controllers/users'
import verifyToken from '../middleware/auth'


const router = express.Router()

router.get('/',  getUsers)
router.get('/:id', getUser)
router.post('/', createUser)
router.put('/:id', updateUser)
router.delete('/:id',  delateUser)
router.post('/follow',  addFollower)
router.post('/unfollow',  deleteFollower)

export default router