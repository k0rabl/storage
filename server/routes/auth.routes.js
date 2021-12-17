import {Router} from 'express'
import { Registration, Login } from '../controllers/authC.js'
import {check} from 'express-validator'

const router = new Router()

router.post(
  '/registration', 
  [
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Incorrect pass').isLength({min: 5, max : 15})
  ],
  Registration
)

router.get(
  '/login', 
  Login
)


export default router