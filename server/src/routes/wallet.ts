import { authenticate } from '@/middleware/authenticator'
import walletControllers from '@/resources/wallet/wallet.controllers'
import { Router } from 'hyper-express'

const router = new Router()

router.get('/', authenticate, walletControllers.getWalletMoney)

router.post('/:amountParam', authenticate, walletControllers.walletPayment)

export default router