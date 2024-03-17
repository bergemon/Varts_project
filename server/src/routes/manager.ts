import { authorization } from '@/middleware/authorization'
import { json_checker } from '@/middleware/json_checker'
import manager_handlers from '@/resources/manager/handlers/manager'
import login_handlers from '@/resources/manager/handlers/login'
import create_handlers from '@/resources/manager/handlers/create'
import find_handlers from '@/resources/manager/handlers/find'
import profile_handlers from '@/resources/manager/handlers/profile'
import delete_handlers from '@/resources/manager/handlers/delete'
import { Router } from 'hyper-express'

const router = new Router()

// Get authorized managers profile
router.get('/', json_checker, authorization, manager_handlers.get_manager_authorized)

// Get another manager profile by id
// Will get partial view if current manager does not have higher authority
// than the desired manager
router.get('/get-by-id/:id', json_checker, authorization, manager_handlers.get_other_manager)

// Find other managers by username
// Only authorized managers can find other managers
// route has required queries - page & limit
// returns only partial view of the manager model
router.get('/find-by-username/:username', json_checker, authorization, find_handlers.find_managers_by_username)

// Find managers by email
// Only authorized managers can find other managers
// route has required queries - page & limit
// returns only partial view of the manager model
router.get('/find-by-email/:email', json_checker, authorization, find_handlers.find_managers_by_email)

// Create new manager
// Manager can create other managers only if it's role has higher rights
router.post('/create', json_checker, authorization, create_handlers.create_manager)

// Login as manager
router.post('/login', json_checker, authorization, login_handlers.authenticate_manager)

// Update authorized manager profile
router.put('/update-profile', json_checker, authorization, profile_handlers.manager_update_profile)

// Delete manager
// The manager invokes deleting must have higher authority
// than the other one who will be delete
router.delete('/delete-manager/:id', json_checker, authorization, delete_handlers.delete_manager_by_id)

export default router