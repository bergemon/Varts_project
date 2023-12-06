export type ILot = {
    id: string;
    image: string;
    title: string;
    date: string;
    kit: number | null;
    quantity: number;
    price: number;
    sell: true;
    button?: never;
}