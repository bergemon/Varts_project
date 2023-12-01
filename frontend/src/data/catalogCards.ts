import { ICatalogCard } from "@/types/catalog";

export const CatalogCards: ICatalogCard[] = [
    {
        id: 1,
        card: "/assets/images/card_1.png",
        countCards: 95,
        promotion: {
            name: "Ограниченный тираж",
            time: "4 д 32 ч 48 м"
        },
        price: 720,
        discount: 680
    },
    {
        id: 2,
        card: "/assets/images/card_2.png",
        countCards: 5,
        promotion: null,
        price: 30,
        discount: null
    },
    {
        id: 3,
        card: "/assets/images/card_3.png",
        countCards: null,
        promotion: {
            name: "Ограниченный тираж",
            time: "24 карты"
        },
        price: 50,
        discount: 75
    },
    {
        id: 4,
        card: "/assets/images/card_4.png",
        countCards: null,
        promotion: null,
        price: 30,
        discount: null
    },
];