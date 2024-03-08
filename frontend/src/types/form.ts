import { Path } from "react-hook-form";

export type IFormType = 'input' | 'title';

export type IFormIcon = 'search' | 'password';

export type IColorInputKey = 'form' | 'search';

export type IFormArea<T, U extends IFormType>  = {
    fieldName?: U extends 'input' ? Path<T> : never;
    type: U;
    label?: string;
    placeholder?: string;
    color?: IColorInputKey;
    icon?: IFormIcon;
    postLabel?: string;
};

export type IForm<T> = IFormArea<T, "input"> | IFormArea<T, "title">;