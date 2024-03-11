import { Manager } from "@prisma/client"

// Модель менеджеров
function managerModel(manager: Manager) {
    const managerView = {
        id: manager.id,
        userName: manager.username,
        email: manager.email,
        language: manager.language,
        created_at: manager.created_at,
        updated_at: manager.updated_at,
        role: manager.role
    }
    return managerView
}

export {
    managerModel
}