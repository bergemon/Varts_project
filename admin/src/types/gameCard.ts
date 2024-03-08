import { IResponse } from "./response";

export interface IGameCard {
    id: string;
    name: string;
    author: string;
    hashTag: string[];
    image: string;
    createdAt: string;
    updatedAt: string;
}

export interface IGameCardResponse extends IResponse {
    data: IGameCard;
}

export interface IGameCardsResponse extends IResponse {
    data: {
        currentPage: number;
        totalPages: number;
        cards: IGameCard[];
    };
}