import Checked from 'public/assets/vector/checked_icon.svg';

type Props = {
    label: string;
}

export const CheckPass = ({ label }: Props) => {
    return (
        <div className="flex gap-[0.625vw] items-center">
            <Checked className="w-[1vw]" />
            <span style={{fontSize: "clamp(6px, 2vw, 22px)"}}>{label}</span>
        </div>
    )
};