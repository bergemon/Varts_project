import prisma from "@/utils/prisma";

// get all cards
async function cardGetAllPrisma(page: number, take: number) {
    const skip = (page - 1) * take;
    const cards = await prisma.gameCard.findMany({
        skip: skip,
        take: take,
        orderBy: {
            createdAt: 'desc',
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


export default {
    cardGetAllPrisma,
    hasNextPage
}