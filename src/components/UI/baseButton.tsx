import { getButtonColor } from "@/colors";
import { ColorButtonKey } from "@/types/config";


type Props = React.InputHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    color: ColorButtonKey;
    href?: string;
}

export const BaseButton = ({ children, color }: Props) => {
    const componentClass = [
        'ease-in-out',
        'transition',
        'duration-300',
        getButtonColor(color)
    ]
    const componentClassString = componentClass.join(' ')

        return (
            <button className={componentClassString}>{children}</button>
        );
};