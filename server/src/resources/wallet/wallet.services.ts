import prisma from "@/utils/prisma"

// получение кошелька
async function get_wallet(user_id: string)
{
    const wallet = await prisma.wallet.findFirst({
        where: { user_id: user_id }
    })
    return wallet
}

// создание нового кошелька
async function init_wallet(user_id: string)
{
    const wallet = await prisma.wallet.create({
        data: { user_id: user_id, amount: 0 },
    })
    return wallet
}

// пополнение кошелька
async function wallet_payment(user_id: string, amount: number)
{
    const wallet = await prisma.wallet.update({
        where: { user_id: user_id },
        data: {
            amount: {
                increment: amount
            }
        }
    })
    return wallet
}

export default
{
    get_wallet,
    init_wallet,
    wallet_payment
}