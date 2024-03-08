import { Path } from "react-hook-form";

export type IFormType = 'input' | 'title';

export type IFormArea<T, U extends IFormType>  = {
    fieldName?: U extends 'input' ? Path<T> : never;
    type: U;
    label?: string;
    placeholder?: string;
};

export type IForm<T> = IFormArea<T, "input"> | IFormArea<T, "title">;