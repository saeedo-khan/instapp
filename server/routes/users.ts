import express from 'express'
import { createUser, delateUser, getUser, getUsers, updateUser } from '../controllers/users'

const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUser)
router.post('/', createUser)
router.put('/:id', updateUser)
router.delete('/:id', delateUser)

export default router