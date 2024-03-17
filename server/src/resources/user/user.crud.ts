import prisma from '@/utils/prisma'

async function create_user(email: string, password: string)
{
    const user = await prisma.user.create({
        data: { email, password }
    })

    return user
}

async function create_verification_code(hashed_email: string, user_id: string)
{
    const verification_code = await prisma.verificationCodes.create({
        data: { hash: hashed_email, user_id }
    })

    return verification_code
}

async function verificate_and_delete(slug: string)
{
    const verification_code = await prisma.verificationCodes.delete({
        where: { hash: slug }
    })

    return verification_code
}

async function find_verification_code(user_id: string)
{
    const verification_code = await prisma.verificationCodes.findFirst({
        where: { user_id }
    })

    return verification_code
}

async function verify_user(id: string)
{
    const updated_user = await prisma.user.update({
        where: { id },
        data: { verified: true }
    })
    
    return updated_user
}

async function get_user_by_id(id: string)
{
    if (!id)
    {
        return null
    }

    const user = await prisma.user.findUnique({
        where: { id }
    })

    return user
}

async function get_user_by_email(email: string)
{
    if (!email)
    {
        return null
    }

    const user = await prisma.user.findUnique({
        where: { email }
    })

    return user
}

async function init_profile(
    id: string,
    username: string,
    birthday: string,
    language: 'russian' | 'english'
)
{
    const user = await prisma.user.update({
        where: { id },
        data: { username, birthday, language }
    })

    return user
}

async function update_profile(
    id: string,
    username: string,
    birthday: string,
    language: 'russian' | 'english'
)
{
    const user = await prisma.user.update({
        where: { id },
        data: { username, birthday, language }
    })

    return user
}

async function find_users_by_username(
    username: string,
    page: number,
    limit: number
)
{
    const users = await prisma.user.findMany({
        where: {
            username: {
                contains: username
            }
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
            username: 'asc'
        }
    })

    return users
}

export default {
    create_user,
    create_verification_code,
    verificate_and_delete,
    find_verification_code,
    verify_user,
    get_user_by_id,
    get_user_by_email,
    init_profile,
    update_profile,
    find_users_by_username
}