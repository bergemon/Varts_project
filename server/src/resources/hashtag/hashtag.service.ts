import prisma from "@/utils/prisma";

// create hashtag
async function hashTagCreatePrisma(
    title: string,
) {
    const hashtag = await prisma.hashTags.create({
        data: { title },
    })
    return hashtag;
}

// find hashtag
async function hashTagFindAllPrisma(
    title: string[],
) {
    const hashtag = await prisma.hashTags.findMany({
        where: { 
            title: {
                in: title
            }
        },
    })
    return hashtag;
}

export default {
    hashTagCreatePrisma,
    hashTagFindAllPrisma
}