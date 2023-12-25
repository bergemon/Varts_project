import Checked from 'public/assets/vector/checked_icon.svg';

type Props = {
    label: string;
    checked: boolean;
}

export const CheckPass = ({ label, checked }: Props) => {
    return (
        <div className="flex gap-[0.625vw] items-center">
            <Checked className={`w-[1vw] transition-opacity duration-200 ${checked ? 'opacity-100' : 'opacity-0'}`} />
            <span style={{fontSize: "clamp(6px, 2vw, 22px)"}}>{label}</span>
        </div>
    )
};