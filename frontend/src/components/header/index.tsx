import Logo from 'public/assets/vector/logo.svg';
import QuestionIcon from 'public/assets/vector/question_icon.svg';
import EmailIcon from 'public/assets/vector/support_icon.svg';
import AvatarIcon from 'public/assets/vector/avatar_icon.svg';
import DropIcon from 'public/assets/vector/dropdown_icon.svg';
import { MenuDropDown } from '../menuDropdown';
import { menuDropDownSupport, menuDropDownWallet, menuDropdownProfile } from '@/menuDropdown';

export const Header = () => {
    return (
        <header className="w-screen shadow-primHead px-5 py-2.5 flex justify-between items-center">
            <Logo className="w-[91px]" />
            <div className="flex items-center gap-5">
                <MenuDropDown width="228" links={menuDropDownWallet}>
                    <QuestionIcon className="w-6 h-6" />
                    <span>300 валенатов</span>
                    <DropIcon />
                </MenuDropDown>
                <MenuDropDown width="228" links={menuDropDownWallet}>
                    <QuestionIcon className="w-6 h-6" />
                    <span>250 монет</span>
                    <DropIcon />
                </MenuDropDown>
                <MenuDropDown width="195" isBg links={menuDropdownProfile}>
                    <AvatarIcon />
                    <span>Алиса Петрова</span>
                    <DropIcon />
                </MenuDropDown>
                <MenuDropDown width="440" menuRight links={menuDropDownSupport}>
                    <EmailIcon />
                </MenuDropDown>
            </div>
        </header>
    );
};