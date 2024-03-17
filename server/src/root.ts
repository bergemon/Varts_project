import { Router } from 'hyper-express'
import user_routes from "./routes/user"
import wallet_routes from "./routes/wallet"
import manager_routes from "./routes/manager"
import card_routes from "./routes/card"
import field_routes from "./routes/field"
import gameSet_routes from "./routes/gameSet"
import static_routes from './routes/static'

const router = new Router()

// user routes
router.use('/v1/user', user_routes)

// admins
router.use('/v1/dashboard/manager', manager_routes)

// wallet routes
router.use('/v1/payment', wallet_routes)

// card routes
router.use('/v1/card', card_routes)
// field routes
router.use('/v1/field', field_routes)
// gameset routes
router.use('/v1/gameSet', gameSet_routes)

// static routes
router.use('', static_routes)

export default router