import { User } from "@prisma/client"

// Пользовательская модель
function get(user: User) {
    const userView = {
        id: user.id,
        email: user.email,
        userName: user.username,
        birthDay: user.birthday,
        language: user.language,
    }
    return userView
}

export default {
    get
}