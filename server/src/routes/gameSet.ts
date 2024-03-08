import gameSetAdminControllers from '@/resources/gameSet/admin/gameSet.admin.controllers';
import { Router } from 'hyper-express';


const router = new Router();

router.post('/', gameSetAdminControllers.gameSetAdminCreate);

router.put('/:id', gameSetAdminControllers.gameSetAdminUpdate);

router.delete('/:id', gameSetAdminControllers.gameSetAdminDelete);

router.get('/', gameSetAdminControllers.gameSetAdminGetAll);

router.get('/:id', gameSetAdminControllers.gameSetGetById);

router.get('/add-card/:id', gameSetAdminControllers.gameSetAddCardField);


export default router;