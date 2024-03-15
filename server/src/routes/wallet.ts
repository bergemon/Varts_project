import { authorization } from '@/middleware/authorization'
import walletControllers from '@/resources/wallet/wallet.controllers'
import { Router } from 'hyper-express'

const router = new Router()

router.get('/', authorization, walletControllers.getWalletMoney)

router.post('/:amountParam', authorization, walletControllers.walletPayment)

export default router