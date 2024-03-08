import hashtagService from "./hashtag.service";


// создание массива хештегов и проверка на существование
async function processHashTags(hashTagsTitles: string[]) {
    const MAX_HASH_TAGS_LIMIT = 10;

    // Проверяем, не превышает ли количество хештегов установленный лимит
    if (hashTagsTitles.length > MAX_HASH_TAGS_LIMIT) {
        throw new Error(`Количество хештегов не может превышать ${MAX_HASH_TAGS_LIMIT}`);
    }

    // Попытка найти существующие хештеги
    const existingTags = await hashtagService.hashTagFindAllPrisma(hashTagsTitles);

    // Найденные хештеги по названию
    const foundTags = new Set(existingTags.map(tag => tag.title));

    // Массив для хранения всех хештегов, которые нужно добавить
    const allTags = existingTags;

    // Создание новых хештегов для тех, которые не найдены
    const newTags = hashTagsTitles.filter(title => !foundTags.has(title)).map(async title => {
        return await hashtagService.hashTagCreatePrisma(title);
    });

    // Добавление созданных хештегов в массив
    allTags.push(...await Promise.all(newTags));

    return allTags;
}

export default {
    processHashTags
}