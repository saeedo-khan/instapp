import express from 'express'
import { checkAuth } from '../controllers/auth/checkAuth'
import { login } from '../controllers/auth/login'
import { logOut } from '../controllers/auth/logout'
import { signUp } from '../controllers/auth/signup'

import verifyToken from '../middleware/auth'


const router = express.Router()

router.post('/login', login)
router.post('/signup', signUp)
router.get('/logout', logOut)
router.get("/checkAuth",  checkAuth)

export default router