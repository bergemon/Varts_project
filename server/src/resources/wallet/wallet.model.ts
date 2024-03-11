import { Wallet } from "@prisma/client"

// Пользовательская модель
function walletModel(wallet: Wallet) {
    const walletView = {
        id: wallet.id,
        amount: wallet.amount
    }
    return walletView
}

export {
    walletModel
}