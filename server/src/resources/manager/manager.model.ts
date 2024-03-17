import { Manager } from "@prisma/client"

function manager_view_full(manager: Manager)
{
    const view = {
        id: manager.id,
        username: manager.username,
        email: manager.email,
        language: manager.language,
        created_at: manager.created_at,
        updated_at: manager.updated_at,
        role: manager.role
    }
    return view
}

function manager_view_partial(manager: Manager)
{
    const view = {
        id: manager.id,
        username: manager.username,
        language: manager.language,
        role: manager.role
    }
    return view
}

export default {
    manager_view_full,
    manager_view_partial
}