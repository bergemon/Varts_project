import prisma from "@/utils/prisma";

// create hashtag
async function hashTagAdminDeletePrisma(
    id: string,
) {
    const hashtag = await prisma.hashTags.delete({
        where: { id: id },
    })
    return hashtag;
}

export default {
    hashTagAdminDeletePrisma,
}