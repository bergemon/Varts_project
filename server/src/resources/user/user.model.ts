import { User, Wallet } from "@prisma/client"

// Пользовательская модель
function userModel(user: User) {
    const userView = {
        id: user.id,
        email: user.email,
        userName: user.username,
        birthDay: user.birthday,
        language: user.language,
    }
    return userView
}

export {
    userModel
}