import { Router } from 'express'
import { Registration, Login, Auth } from '../controllers/authC.js'
import { check } from 'express-validator'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = new Router()

router.post(
    '/registration',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Incorrect pass').isLength({ min: 5, max: 15 }),
        check('name').exists(),
    ],
    Registration
)

router.post('/login', Login)

router.get('/auth', authMiddleware, Auth)

export default router
