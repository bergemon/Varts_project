import prisma from "@/utils/prisma";

// создание пользователя в бд
async function managerCreatePrisma(
    username: string,
    email: string,
    password: string,
) {
    const manager = await prisma.manager.create({
        data: { username, email, password },
    })
    return manager;
}

// получение пользователя из бд
async function managerGetPrisma(id: string) {
    if (!id) return null
    const manager = await prisma.manager.findUnique({
        where: { id },
    })
    return manager;
}

// получение пользователя из бд по email
async function managerEmailPrisma(email: string) {
    if (!email) return null
    const manager = await prisma.manager.findUnique({
        where: { email },
    })
    return manager;
}

// обновление данных пользователя
async function managerUpdatePrisma(
    id: string,
    username: string,
    password: string,
  ) {
    const manager = await prisma.manager.update({
      where: { id },
      data: {
        username,
        password
      }
    })
    return manager;
  }

export default {
    managerCreatePrisma,
    managerGetPrisma,
    managerEmailPrisma,
    managerUpdatePrisma
}