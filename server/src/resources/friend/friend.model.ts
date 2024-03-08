import { Friends } from "@prisma/client"

// Модель друзей
function friendsModel(friends: Friends) {
    const friendsView = {
        id: friends.id,
        createdAt: friends.createdAt,
        updatedAt: friends.updatedAt
    }
    return friendsView
}

export {
    friendsModel
}