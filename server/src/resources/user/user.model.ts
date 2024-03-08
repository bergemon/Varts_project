import { User, Wallet } from "@prisma/client"

// Пользовательская модель
function userModel(user: User) {
    const userView = {
        id: user.id,
        userName: user.userName,
        email: user.email,
        birthDay: user.birthDay,
        language: user.language,
    }
    return userView
}

export {
    userModel
}