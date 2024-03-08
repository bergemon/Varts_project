import { authenticate } from '@/middleware/authenticator';
import userControllers from '@/resources/user/user.controllers';
import { Router } from 'hyper-express';

const router = new Router();

router.post('/register', userControllers.userRegister);

router.post('/login', userControllers.userLogin);

router.post('/create-profile', authenticate, userControllers.userCreateProfile);

router.put('/update-profile', authenticate, userControllers.userUpdateProfile);

router.get('/', authenticate, userControllers.userGet);

export default router;