import friends_crud from '@/resources/friends/friends.crud'

async function is_friend(user_id: string, friend_id: string): Promise<boolean>
{
    const friend = await friends_crud.find_friend(user_id, friend_id)

    return friend ? true : false
}

export default
{
    is_friend
}