import { Manager } from "@prisma/client"

// Модель менеджеров
function managerModel(manager: Manager) {
    const managerView = {
        id: manager.id,
        userName: manager.userName,
        email: manager.email,
        language: manager.language,
        createdAt: manager.createdAt,
        updatedAt: manager.updatedAt,
        role: manager.role
    }
    return managerView
}

export {
    managerModel
}