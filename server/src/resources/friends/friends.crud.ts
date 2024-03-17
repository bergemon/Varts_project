import prisma from '@/utils/prisma'

async function find_friend(
    user_id: string,
    friend_id: string
)
{
    const friend = await prisma.friends.findFirst({
        where: { user_id, friend_id }
    })

    return friend
}

async function get_user_friends(user_id: string)
{
    const friends = await prisma.friends.findMany({
        where: { user_id }
    })

    return friends
}

export default
{
    find_friend,
    get_user_friends
}