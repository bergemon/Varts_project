import Logo from 'public/assets/vector/logo.svg';
import QuestionIcon from 'public/assets/vector/question_icon.svg';
import EmailIcon from 'public/assets/vector/support_icon.svg';
import AvatarIcon from 'public/assets/vector/avatar_icon.svg';
import DropIcon from 'public/assets/vector/dropdown_icon.svg';

export const Header = () => {
    return (
        <header className="w-screen shadow-primHead px-5 py-2.5 flex justify-between items-center">
            <Logo className="w-[91px]" />
            <div className="flex items-center gap-5">
                <div className="flex gap-2.5 items-center">
                    <QuestionIcon className="w-6 h-6" />
                    <span>250 монет</span>
                    <DropIcon />
                </div>
                <div className="bg-opacity10 gap-2.5 rounded-[500px] pl-[3px] pt-0.5 pb-0.5 pr-2.5 flex items-center">
                    <AvatarIcon />
                    <span>Алиса Петрова</span>
                    <DropIcon />
                </div>
                <div>
                    <EmailIcon />
                </div>
            </div>
        </header>
    );
};