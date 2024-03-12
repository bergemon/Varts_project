import { authenticate } from '@/middleware/authenticator'
import { json_checker } from '@/middleware/json_checker'
import sign_up_handlers from '@/resources/user/handlers/sign_up'
import login_handlers from '@/resources/user/handlers/login'
import userControllers from '@/resources/user/user.controllers'
import { Router } from 'hyper-express'

const router = new Router()

router.post('/register', json_checker, sign_up_handlers.userRegister)

router.get('/verificate/:hash', sign_up_handlers.verificate_user)

router.post('/send-verificate', authenticate, sign_up_handlers.send_verification_again)

router.post('/login', json_checker, login_handlers.userLogin)

router.post('/create-profile', json_checker, authenticate, userControllers.userCreateProfile)

router.put('/update-profile', json_checker, authenticate, userControllers.userUpdateProfile)

router.get('/', json_checker, authenticate, userControllers.userGet)

export default router