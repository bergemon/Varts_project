import { authenticate } from '@/middleware/authenticator'
import managerControllers from '@/resources/manager/manager.controllers'
import { Router } from 'hyper-express'

const router = new Router()

router.post('/register', managerControllers.managerRegister)

router.post('/login', managerControllers.managerLogin)

router.put('/update-profile', authenticate, managerControllers.managerUpdateProfile)

router.get('/', authenticate, managerControllers.managerGet);

export default router