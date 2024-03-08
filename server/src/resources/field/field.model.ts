import { GameField, HashTags } from "@prisma/client"

// Модель карточек
function fieldsModel(field: GameField & { hashTag: HashTags[] }) {
    const fieldsView = {
        id: field.id,
        createdAt: field.createdAt,
        updatedAt: field.updatedAt,
        name: field.name,
        author: field.author,
        hashTag: field.hashTag,
        image: field.image
    }
    return fieldsView
}

export {
    fieldsModel
}