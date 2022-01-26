import {Router} from 'express'
import { Registration, Login } from '../controllers/authC.js'
import {check} from 'express-validator'

const router = new Router()

router.post(
  '/registration', 
  [
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Incorrect pass').isLength({min: 5, max : 15}),
    check('name').exists()
  ],
  Registration
)

router.post(
  '/login', 
  Login
)


export default router