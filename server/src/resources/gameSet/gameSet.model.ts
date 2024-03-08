import { GameCard, GameField, GameSet, HashTags } from "@prisma/client"

// Модель карточек
function gameSetModel(set: GameSet & { hashTag: HashTags[], GameCard?: GameCard[] | null, field?: GameField | null  }) {
    const gameSetView = {
        id: set.id,
        createdAt: set.createdAt,
        updatedAt: set.updatedAt,
        name: set.name,
        author: set.author,
        hashTag: set.hashTag,
        image: set.image,
        cards: set.GameCard,
        field: set.field
    }
    return gameSetView;
}

export {
    gameSetModel
}