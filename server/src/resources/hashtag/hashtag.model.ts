import { HashTags } from "@prisma/client"

// Модель хештегов
function hashTagsModel(hashTags: HashTags) {
    const hashTagsView = {
        id: hashTags.id,
        createdAt: hashTags.createdAt,
        updatedAt: hashTags.updatedAt,
        title: hashTags.title
    }
    return hashTagsView
}

export {
    hashTagsModel
}