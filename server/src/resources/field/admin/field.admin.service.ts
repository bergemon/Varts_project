import hashtagControllers from "@/resources/hashtag/hashtag.controllers";
import prisma from "@/utils/prisma";

// create gameField
async function fieldCreatePrisma(
    name: string,
    author: string,
    image: string,
    hashTag: string[]
) {

    const allTags = await hashtagControllers.processHashTags(hashTag);

    const fields = await prisma.gameField.create({
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
    return fields;
}

// get all fields
async function fieldGetAllPrisma(page: number, take: number) {
    const skip = (page - 1) * take;
    const fields = await prisma.gameField.findMany({
        skip: skip,
        take: take,
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            hashTag: true
        }
    });
    return fields;
}

// has next page
async function hasNextPage() {
    const total = await prisma.gameField.count();
    return total;
}

// update field
async function fieldUpdatePrisma(
    id: string,
    name: string,
    author: string,
    image: string,
    hashTag: string[]
) {

    const allTags = await hashtagControllers.processHashTags(hashTag);

    const field = await prisma.gameField.update({
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

// delete field
async function fieldDeletePrisma(
    id: string
) {
    const card = await prisma.gameField.delete({
        where: { id: id },
    })
    return card;
}

export default {
    fieldCreatePrisma,
    fieldGetAllPrisma,
    hasNextPage,
    fieldUpdatePrisma,
    fieldDeletePrisma
}