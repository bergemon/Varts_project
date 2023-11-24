import { GlobalHeight, GlobalWidth } from "@/config";

export const CalcWidth = (num: number) => {
    return `${num / GlobalWidth * 100}vw`;
};

export const CalcHeight = (num: number) => {
    return `${num / GlobalHeight * 100}vh`;
};