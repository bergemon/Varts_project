import { Friends } from "@prisma/client"

// Модель друзей
function friendsModel(friends: Friends) {
    const friendsView = {
        id: friends.id,
        created_at: friends.created_at,
        updated_at: friends.updated_at
    }
    return friendsView
}

export {
    friendsModel
}