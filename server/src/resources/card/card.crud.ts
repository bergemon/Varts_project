import prisma from "@/utils/prisma";

// get all cards
async function get_all_cards(page: number, take: number) {
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
    })
    return cards
}

// has next page
async function has_next_page() {
    const total = await prisma.gameCard.count()
    return total
}


export default {
    get_all_cards,
    has_next_page
}