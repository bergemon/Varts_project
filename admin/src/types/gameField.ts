import { IResponse } from "./response";

export interface IGameField {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    author: string;
    hashTag: string[];
    image: string;
}

export interface IFieldResponse extends IResponse {
    data: IGameField;
}

export interface IFieldsResponse extends IResponse {
    data: IGameField[];
}