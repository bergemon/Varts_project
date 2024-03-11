import { GameCard, GameField, GameSet, HashTags } from "@prisma/client"

// Модель карточек
function gameSetModel(set: GameSet & { hashTag: HashTags[], GameCard?: GameCard[] | null, field?: GameField | null  }) {
    const gameSetView = {
        id: set.id,
        created_at: set.created_at,
        updated_at: set.updated_at,
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