import { ILot } from "@/types/lot";

export const auctionSellData: Partial<ILot>[] = [
    {
        id: "1",
        image: "/assets/images/table_1.png",
        title: "Странные дела",
        date: "12.08.2022",
        kit: 95,
        quantity: 8,
        price: 87
    }
];

export const auctionBuyData: Partial<ILot>[] = [
    {
        id: "1",
        image: "/assets/images/table_2.png",
        title: "Странные дни",
        date: "12.08.2022",
        kit: null,
        quantity: 1,
        price: 30
    }
];

export const auctionCardData: Partial<ILot>[] = [
    {
        id: "1",
        image: "/assets/images/table_3.png",
        title: "Ночной город",
        kit: null,
        quantity: 4,
        price: 5
    },
    {
        id: "2",
        image: "/assets/images/table_4.png",
        title: "Женщины",
        kit: null,
        quantity: 1,
        price: 16
    },
    {
        id: "3",
        image: "/assets/images/table_5.png",
        title: "Карандаши",
        kit: null,
        quantity: 1,
        sell: true,
        price: 16
    }
];