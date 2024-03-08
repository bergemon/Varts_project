import fieldAdminControllers from '@/resources/field/admin/field.admin.controllers';
import { Router } from 'hyper-express';


const router = new Router();

router.post('/', fieldAdminControllers.fieldAdminCreate);

router.put('/:id', fieldAdminControllers.fieldAdminUpdate);

router.delete('/:id', fieldAdminControllers.fieldAdminDelete);

router.get('/', fieldAdminControllers.fieldAdminGetAll);

router.get('/:id', fieldAdminControllers.fieldAdminGetAll);

export default router;