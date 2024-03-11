import prisma from "@/utils/prisma"

// создание пользователя в бд
async function userCreatePrisma(email: string, password: string)
{
    const user = await prisma.user.create({
        data: { email, password }
    })
    return user
}

// получение пользователя из бд
async function userGetPrisma(id: string) {
    if (!id) { return null }

    const user = await prisma.user.findUnique({
        where: { id }
    })
    return user
}

// получение пользователя из бд по email
async function userEmailPrisma(email: string) {
    if (!email) { return null }

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
) {
  const user = await prisma.user.update({
    where: { id },
    data: {
      username,
      birthday,
      language
    }
  })
  return user;
}

// обновление данных пользователя
async function userUpdateProfilePrisma(
  id: string,
  username: string,
  birthday: string,
  language: 'russian' | 'english'
) {
  const user = await prisma.user.update({
    where: { id },
    data: {
      username,
      birthday,
      language
    }
  })
  return user;
}

export default {
  userCreatePrisma,
  userGetPrisma,
  userEmailPrisma,
  userCreateUserNamePrisma,
  userUpdateProfilePrisma
}