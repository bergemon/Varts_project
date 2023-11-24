export type ICatalogCard = {
    id: number;
    card: string;
    countCards: number | null;
    promotion: Promotion | null;
    price: number;
    discount: number | null;
}

type Promotion = {
    name: string;
    time: string;
}