import { User } from "@prisma/client"

function user_view_full(user: User)
{
    const view = {
        id: user.id,
        email: user.email,
        username: user.username,
        language: user.language,
        birthDay: user.birthday,
        verified: user.verified,
        created_at: user.created_at,
        updated_at: user.updated_at
    }
    return view
}

function user_view_default(user: User)
{
    const view = {
        id: user.id,
        email: user.email,
        username: user.username,
        language: user.language,
        birthDay: user.birthday
    }
    return view
}

function user_view_partial(user: User)
{
    const view = {
        id: user.id,
        username: user.username,
        language: user.language
    }

    return view
}

export default {
    user_view_full,
    user_view_default,
    user_view_partial
}