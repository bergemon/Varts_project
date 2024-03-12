import prisma from "@/utils/prisma"

// создание пользователя в бд
async function userCreatePrisma(email: string, password: string)
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
        data: {
            verified: true
        }
    })
    return updated_user
}

// получение пользователя из бд
async function get_user(id: string)
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

// получение пользователя из бд по email
async function userEmailPrisma(email: string)
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

// создания пользователя и указание даты рождения
async function userCreateUserNamePrisma(
  id: string,
  username: string,
  birthday: string,
  language: 'russian' | 'english'
)
{
    const user = await prisma.user.update({
        where: { id },
        data: {
            username,
            birthday,
            language
        }
    })
    return user
}

// обновление данных пользователя
async function userUpdateProfilePrisma(
  id: string,
  username: string,
  birthday: string,
  language: 'russian' | 'english'
)
{
    const user = await prisma.user.update({
        where: { id },
        data: {
            username,
            birthday,
            language
        }
    })
    return user
}

export default {
    userCreatePrisma,
    create_verification_code,
    verificate_and_delete,
    find_verification_code,
    verify_user,
    get_user,
    userEmailPrisma,
    userCreateUserNamePrisma,
    userUpdateProfilePrisma
}