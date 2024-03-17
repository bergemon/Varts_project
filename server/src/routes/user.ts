import { authorization } from '@/middleware/authorization'
import { json_checker } from '@/middleware/json_checker'
import sign_up_handlers from '@/resources/user/handlers/sign_up'
import login_handlers from '@/resources/user/handlers/login'
import profile_handlers from '@/resources/user/handlers/profile'
import user_handlers from '@/resources/user/handlers/user'
import find_handlers from '@/resources/user/handlers/find'
import { Router } from 'hyper-express'

const router = new Router()

// get current user
router.get('/', json_checker, authorization, user_handlers.get_user)

// verificate a signed up user
router.get('/verificate/:hash', sign_up_handlers.verificate_user)

// get another user by id
// only friends can see other users email and birthday
// managers with any roles can see extra fields
// such as - created_at, updated_at, verified
router.get('/get-by-id/:id', json_checker, authorization, user_handlers.get_user_by_id)

// Find users by username, only authorized persons (users, managers) can find other users
// route has required queries - page & limit
// returns only partial view of the manager model
router.get('/find/:username', json_checker, authorization, find_handlers.find_users_by_username)

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