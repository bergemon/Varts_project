import { getButtonColor } from "@/colors";
import { ColorButtonKey } from "@/types/config";


type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    color: ColorButtonKey;
    href?: string;
}

export const BaseButton = ({ children, color, ...props }: Props) => {
    const componentClass = [
        'ease-in-out',
        'transition',
        'duration-300',
        'disabled:bg-opacity20',
        'disabled:cursor-wait',
        getButtonColor(color)
    ]
    const componentClassString = componentClass.join(' ')

        return (
            <button className={componentClassString} {...props}>{children}</button>
        );
};