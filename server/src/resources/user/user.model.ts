import { User, Wallet } from "@prisma/client"

// Пользовательская модель
function userModel(user: User) {
    const userView = {
        id: user.id,
        userName: user.username,
        email: user.email,
        birthDay: user.birthday,
        language: user.language,
    }
    return userView
}

export {
    userModel
}