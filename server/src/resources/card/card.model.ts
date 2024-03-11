import { GameCard, HashTags } from "@prisma/client"

// Модель карточек
function cardsModel(cards: GameCard & { hashTag: HashTags[] }) {
    const cardsView = {
        id: cards.id,
        created_at: cards.created_at,
        updated_at: cards.updated_at,
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