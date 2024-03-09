import { Router } from 'hyper-express'
import userRouter from "./routes/user"
import walletRouter from "./routes/wallet"
import managerRouter from "./routes/manager"
import cardRouter from "./routes/card"
import fieldRouter from "./routes/field"
import gameSetRouter from "./routes/gameSet"
import static_router from './routes/static'

const router = new Router()

// router.use(jsonChecker)

router.use('/v1/user', userRouter)

router.use('/v1/payment', walletRouter)

// dashboard
router.use('/v1/dashboard/manager', managerRouter)

// пересекающиеся

router.use('/v1/card', cardRouter)

router.use('/v1/field', fieldRouter)

router.use('/v1/gameSet', gameSetRouter)

router.use('', static_router)

export default router