import { HashTags } from "@prisma/client"

// Модель хештегов
function hashTagsModel(hashTags: HashTags) {
    const hashTagsView = {
        id: hashTags.id,
        created_at: hashTags.created_at,
        updated_at: hashTags.updated_at,
        title: hashTags.title
    }
    return hashTagsView
}

export {
    hashTagsModel
}