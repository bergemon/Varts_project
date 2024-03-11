import { Notifications } from "@prisma/client"

// Модель уведомлений
function notificationsModel(notifications: Notifications) {
    const notificationsView = {
        id: notifications.id,
        created_at: notifications.created_at,
        updated_at: notifications.updated_at,
        read: notifications.read,
        event: notifications.event
    }
    return notificationsView
}

export {
    notificationsModel
}