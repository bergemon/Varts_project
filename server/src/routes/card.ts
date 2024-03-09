import cardAdminControllers from '@/resources/card/admin/card.admin.controllers'
import { Router } from 'hyper-express'

const router = new Router()

router.post('/', cardAdminControllers.cardAdminCreate)

router.put('/:id', cardAdminControllers.cardAdminUpdate)

router.delete('/:id', cardAdminControllers.cardAdminDelete)

router.get('/', cardAdminControllers.cardAdminGetAll)

router.get('/:id', cardAdminControllers.cardAdminGetAll)

export default router