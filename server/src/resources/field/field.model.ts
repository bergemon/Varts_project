import { GameField, HashTags } from "@prisma/client"

// Модель карточек
function fieldsModel(field: GameField & { hashTag: HashTags[] }) {
    const fieldsView = {
        id: field.id,
        created_at: field.created_at,
        updated_at: field.updated_at,
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