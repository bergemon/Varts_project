import prisma from "@/utils/prisma";

async function create_manager(
    username: string,
    email: string,
    password: string,
    language?: 'russian' | 'english'
)
{
    const manager = await prisma.manager.create({
        data: { username, email, password, language }
    })

    return manager
}

async function get_manager_by_id(id: string)
{
    if (!id)
    {
        return null
    }

    const manager = await prisma.manager.findUnique({
        where: { id }
    })

    return manager
}

async function get_manager_by_email(email: string)
{
    if (!email)
    {
        return null
    }

    const manager = await prisma.manager.findUnique({
        where: { email }
    })

    return manager
}

async function get_managers_by_username(
    username: string,
    page: number,
    limit: number
)
{
    const managers = await prisma.manager.findMany({
        where: {
            username: {
                contains: username
            },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
            username: 'asc'
        }
    })

    return managers
}

async function get_managers_by_email(
    email: string,
    page: number,
    limit: number
)
{
    const managers = await prisma.manager.findMany({
        where: {
            email: {
                contains: email
            },
        },
        skip: page * limit,
        take: limit,
        orderBy: {
            username: 'asc'
        }
    })

    return managers
}

async function update_manager(
    id: string,
    username: string,
    password: string,
    language?: 'russian' | 'english'
)
{
    const manager = await prisma.manager.update({
        where: { id },
        data: { username, password, language }
    })

    return manager
}

async function delete_manager(id: string)
{
    const manager = await prisma.manager.delete({
        where: { id }
    })

    return manager
}

export default
{
    create_manager,
    get_manager_by_id,
    get_manager_by_email,
    get_managers_by_username,
    get_managers_by_email,
    update_manager,
    delete_manager
}