import { Notifications } from "@prisma/client"

// Модель уведомлений
function notificationsModel(notifications: Notifications) {
    const notificationsView = {
        id: notifications.id,
        createdAt: notifications.createdAt,
        updatedAt: notifications.updatedAt,
        read: notifications.read,
        event: notifications.event
    }
    return notificationsView
}

export {
    notificationsModel
}