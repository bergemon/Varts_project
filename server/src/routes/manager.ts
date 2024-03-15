import { authorization } from '@/middleware/authorization'
import managerControllers from '@/resources/manager/manager.controllers'
import { Router } from 'hyper-express'

const router = new Router()

router.post('/register', managerControllers.managerRegister)

router.post('/login', managerControllers.managerLogin)

router.put('/update-profile', authorization, managerControllers.managerUpdateProfile)

router.get('/', authorization, managerControllers.managerGet);

export default router