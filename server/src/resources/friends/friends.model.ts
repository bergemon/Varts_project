import { Friends } from "@prisma/client"

function friendship_view(friends: Friends)
{
    const view = {
        id: friends.id,
        user_id: friends.user_id,
        friend_id: friends.friend_id,
        created_at: friends.created_at
    }
    return view
}

export default {
    friendship_view
}