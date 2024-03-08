import prisma from "@/utils/prisma";

// получение кошелька
async function walletGetPrisma(
    userId: string
) {
    const wallet = await prisma.wallet.findFirst({
        where: { userId: userId }
    })
    return wallet;
}

// создание нового кошелька
async function walletCreatePrisma(
    userId: string
) {
    const wallet = await prisma.wallet.create({
        data: { userId: userId, amount: 0 },
    })
    return wallet;
}

// пополнение кошелька
async function walletPaymentPrisma(
    userId: string,
    amount: number,
) {
    const wallet = await prisma.wallet.update({
        where: { userId: userId },
        data: {
            amount: {
                increment: amount
            }
        }
    })
    return wallet;
}

export default {
    walletGetPrisma,
    walletCreatePrisma,
    walletPaymentPrisma
}