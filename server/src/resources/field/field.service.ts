import prisma from "@/utils/prisma";


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


export default {
    fieldGetAllPrisma,
    hasNextPage
}