import prisma from "@/utils/prisma"

// получение кошелька
async function walletGetPrisma(user_id: string)
{
    const wallet = await prisma.wallet.findFirst({
        where: { user_id: user_id }
    })
    return wallet
}

// создание нового кошелька
async function walletCreatePrisma(user_id: string)
{
    const wallet = await prisma.wallet.create({
        data: { user_id: user_id, amount: 0 },
    })
    return wallet
}

// пополнение кошелька
async function walletPaymentPrisma(user_id: string, amount: number)
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
    walletGetPrisma,
    walletCreatePrisma,
    walletPaymentPrisma
}