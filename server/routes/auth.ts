import express from 'express'
import { login, signUp, logOut, whoami } from '../controllers/auth'
import verifyToken from '../middleware/auth'


const router = express.Router()

router.post('/login', login)
router.post('/signup', signUp)
router.get('/logout', verifyToken, logOut)
router.get('/whoami', verifyToken,whoami)

export default router