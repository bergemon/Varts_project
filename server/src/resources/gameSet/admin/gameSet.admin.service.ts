import hashtagControllers from "@/resources/hashtag/hashtag.controllers";
import prisma from "@/utils/prisma";

// create gameSet
async function gameSetCreatePrisma(
    name: string,
    author: string,
    image: string,
    hashTag: string[]
) {

    const allTags = await hashtagControllers.processHashTags(hashTag);

    const gameSets = await prisma.gameSet.create({
        data: {
            name,
            author,
            image,
            hashTag: {
                connect: allTags.map(tag => ({ id: tag.id })),
            },
        },
        include: {
            hashTag: true
        }
    })
    return gameSets;
}

// get all gameSet
async function gameSetGetAllPrisma(page: number, take: number) {
    const skip = (page - 1) * take;
    const fields = await prisma.gameSet.findMany({
        skip: skip,
        take: take,
        orderBy: {
            created_at: 'desc',
        },
        include: {
            hashTag: true
        }
    });
    return fields;
}

// has next page
async function hasNextPage() {
    const total = await prisma.gameSet.count();
    return total;
}

// update field
async function GameSetUpdatePrisma(
    id: string,
    name: string,
    author: string,
    image: string,
    hashTag: string[]
) {

    const allTags = await hashtagControllers.processHashTags(hashTag);

    const field = await prisma.gameSet.update({
        where: { id: id },
        data: {
            name,
            author,
            image,
            hashTag: {
                connect: allTags.map(tag => ({ id: tag.id })),
            },
        },
        include: {
            hashTag: true,
        }
    })
    return field;
}

// delete gameSet
async function gameSetDeletePrisma(
    id: string
) {
    const card = await prisma.gameSet.delete({
        where: { id: id },
    })
    return card;
}

// getById
async function gameSetGetByIdCardFieldPrisma(
    id: string
) {
    const card = await prisma.gameSet.findFirst({
        where: { id: id },
        include: {
            hashTag: true,
            cards: true,
            field: true,
        }
    })
    return card;
}

// added cards and field for gameset
async function gameSetAddCardFieldPrisma(
    id: string,
    fieldId: string,
    cards: string[]
) {
    const card = await prisma.gameSet.update({
        where: { id: id },
        data: {
            cards: {
                connect: cards.map(cardId => ({ id: cardId })),
            },
            field: {
                connect: { id: fieldId }
            }
        },
        include: {
            hashTag: true,
            cards: true,
            field: true,
        }
    })
    return card;
}

export default {
    gameSetCreatePrisma,
    gameSetGetAllPrisma,
    hasNextPage,
    GameSetUpdatePrisma,
    gameSetDeletePrisma,
    gameSetGetByIdCardFieldPrisma,
    gameSetAddCardFieldPrisma
}