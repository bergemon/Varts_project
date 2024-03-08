import { GameCard, HashTags } from "@prisma/client"


// Модель карточек
function cardsModel(cards: GameCard & { hashTag: HashTags[] }) {
    const cardsView = {
        id: cards.id,
        createdAt: cards.createdAt,
        updatedAt: cards.updatedAt,
        name: cards.name,
        author: cards.author,
        hashTag: cards.hashTag,
        image: cards.image
    }
    return cardsView
}

export {
    cardsModel
}