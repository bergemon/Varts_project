import hashtagControllers from "@/resources/hashtag/hashtag.controllers";
import prisma from "@/utils/prisma";

// create GameCard
async function cardCreatePrisma(
    name: string,
    author: string,
    image: string,
    hashTag: string[]
) {

    const allTags = await hashtagControllers.processHashTags(hashTag);

    const card = await prisma.gameCard.create({
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
    return card;
}

// get all cards
async function cardGetAllPrisma(page: number, take: number) {
    const skip = (page - 1) * take;
    const cards = await prisma.gameCard.findMany({
        skip: skip,
        take: take,
        orderBy: {
            created_at: 'desc',
        },
        include: {
            hashTag: true
        }
    });
    return cards;
}

// has next page
async function hasNextPage() {
    const total = await prisma.gameCard.count();
    return total;
}

// update card
async function cardUpdatePrisma(
    id: string,
    name: string,
    author: string,
    image: string,
    hashTag: string[]
) {

    const allTags = await hashtagControllers.processHashTags(hashTag);

    const card = await prisma.gameCard.update({
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
    return card;
}

// delete card
async function cardDeletePrisma(
    id: string
) {
    const card = await prisma.gameCard.delete({
        where: { id: id },
    })
    return card;
}

export default {
    cardCreatePrisma,
    cardGetAllPrisma,
    hasNextPage,
    cardUpdatePrisma,
    cardDeletePrisma
}