import { IResponse } from "./response";

export interface IGameSet {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    author: string;
    hashTag: string[];
    image: string;
}

export interface IGameSetResponse extends IResponse {
    data: IGameSet;
}

export interface IGameSetsResponse extends IResponse {
    data: IGameSet[];
}