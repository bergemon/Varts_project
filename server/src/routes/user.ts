import { authorization } from '@/middleware/authorization'
import { json_checker } from '@/middleware/json_checker'
import sign_up_handlers from '@/resources/user/handlers/sign_up'
import login_handlers from '@/resources/user/handlers/login'
import profile_handlers from '@/resources/user/handlers/profile'
import user_handlers from '@/resources/user/handlers/user'
import { Router } from 'hyper-express'

const router = new Router()

// get current user
router.get('/', json_checker, authorization, user_handlers.get_user)

// verificate a signed up user
router.get('/verificate/:hash', sign_up_handlers.verificate_user)

// sign up
router.post('/register', json_checker, sign_up_handlers.sign_up_user)

// send verification code to email again
router.post('/send-verificate', authorization, sign_up_handlers.send_verification_again)

// authenticate
router.post('/login', json_checker, login_handlers.authenticate_user)

// create profile
router.post('/create-profile', json_checker, authorization, profile_handlers.create_profile)

// update profile
router.put('/update-profile', json_checker, authorization, profile_handlers.update_profile)

export default router