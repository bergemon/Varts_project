import { User } from "@prisma/client"

// Пользовательская модель
function userModel(user: User) {
    const userView = {
        id: user.id,
        name: user.name,
        dateBirth: user.dateBirth,
        email: user.email,
        language: user.language,
        avatar: user.avatar,
    }
    return userView
}

export {
    userModel
}