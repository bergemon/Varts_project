import { colorsBg } from "@/colors";
import { BaseButton } from "./baseButton";

type Props = {
    title: string;
    button: string;
}

export const ChoiseBar = ({ title, button }: Props) => {
    return (
        <div className={"border-[1px] border-gray-90 rounded-[5px] py-2.5 pl-5 pr-3 h-[52px] flex items-center justify-between w-full"}>
            <h4>{title}</h4>
            <BaseButton color="check_all">{button}</BaseButton>
        </div>
    )
};