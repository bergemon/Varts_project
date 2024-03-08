import { IForm } from "@/types/form";
import { IGameCardType, IGameFieldType, IGameSetType } from "@/utils/yupSchema";

// форма карточки
export const gameCardForm: IForm<IGameCardType>[] = [
    {
        fieldName: "name",
        type: "input",
        placeholder: "Название",
        label: "Название"
    },
    {
        fieldName: "author",
        type: "input",
        placeholder: "Автор",
        label: "Автор"
    },
    {
        fieldName: "hashtag",
        type: "input",
        placeholder: "Название",
        label: "Название"
    }
];


// форма игрового поля
export const gameFieldForm: IForm<IGameFieldType>[] = [
    {
        fieldName: "name",
        type: "input",
        placeholder: "Название",
        label: "Название"
    },
    {
        fieldName: "author",
        type: "input",
        placeholder: "Автор",
        label: "Автор"
    },
    {
        fieldName: "hashtag",
        type: "input",
        placeholder: "Название",
        label: "Название"
    }
];

// форма игрового набор
export const gameSetForm: IForm<IGameSetType>[] = [
    {
        fieldName: "name",
        type: "input",
        placeholder: "Название",
        label: "Название"
    },
    {
        fieldName: "author",
        type: "input",
        placeholder: "Автор",
        label: "Автор"
    },
    {
        fieldName: "hashtag",
        type: "input",
        placeholder: "Название",
        label: "Название"
    }
];