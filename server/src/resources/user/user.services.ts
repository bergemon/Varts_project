import prisma from "@/utils/prisma"

/**
 * Объект пользователя
 * @typedef {Object} User
 * @property {string} id - Уникальный идентификатор пользователя
 * @property {string} name - Имя пользователя
 * @property {string} dateBirth - Дата рождения пользователя
 * @property {string} email - Email пользователя, используется как логин
 * @property {Language} language - Язык пользователя
 * @property {string} password - Пароль пользователя
 * @property {string} [avatar] - Ссылка на аватар пользователя, опциональное свойство
 * @property {DateTime} createdAt - Дата создания аккаунта пользователя
 * @property {DateTime} updatedAt - Дата последнего обновления аккаунта пользователя
 */

// создание пользователя в бд
async function userCreatePrisma(
    email: string,
    password: string
  ) {
    const user = await prisma.user.create({
      data: { email, password },
    })
    return user
  }
  
  // получение пользователя из бд
  async function userGetPrisma(id: string) {
    if (!id) return null
    const user = await prisma.user.findUnique({
      where: { id },
    })
    return user
  }
  
  // получение пользователя из бд по email
  async function userEmailPrisma(email: string) {
    if (!email) return null
    const user = await prisma.user.findUnique({
      where: { email },
    })
    return user
  }

export default {
  userCreatePrisma,
  userGetPrisma,
  userEmailPrisma
}