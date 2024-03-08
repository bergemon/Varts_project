import { Request, Response } from 'hyper-express';
import { BadRequestResponse, CreatedResponse, NotFoundResponse, OkResponse } from '@/utils/response';
import userServices from '@/resources/user/user.services';
import walletServices from './wallet.services';
import { walletModel } from './wallet.model';


type PaymentAmounts = {
    pay80: number;
    pay250: number;
    pay500: number;
    pay1000: number;
};

// get wallet
async function getWalletMoney(req: Request, res: Response) {
    const id = req.locals.auth?.user?.id;
    try {
        const user = await userServices.userGetPrisma(id);

        if (!user) return BadRequestResponse(res, 404, 'User not auth');

        const wallet = await walletServices.walletGetPrisma(user.id)

        if(!wallet) return NotFoundResponse(res, 'wallet not found');

        return OkResponse(res, wallet.amount)
    } catch (error: any) {
        return res.status(500).json({ error: error });
    }
}

// payment
async function walletPayment(req: Request, res: Response) {
    const id = req.locals.auth?.user?.id;
    const { amountParam } = req.params;
    try {

        const user = await userServices.userGetPrisma(id);

        if (!user) return BadRequestResponse(res, 404, 'User not auth');

        const objPay: PaymentAmounts = {
            pay80: 80,
            pay250: 250,
            pay500: 500,
            pay1000: 1000
        }

        // Проверяем, существует ли параметр в объекте
        if (!objPay.hasOwnProperty(amountParam)) {
            return BadRequestResponse(res, 500, 'Invalid payment amount parameter');
        }

        // Получаем сумму пополнения из объекта
        const paymentAmount = objPay[amountParam as keyof PaymentAmounts];

        const createPayment = await walletServices.walletPaymentPrisma(user.id, paymentAmount)

        return CreatedResponse(res, walletModel(createPayment));
    } catch (error: any) {
        return res.status(500).json({ error: error });
    }
}

export default {
    getWalletMoney,
    walletPayment
}