import Logo from 'public/assets/vector/logo.svg';
import QuestionIcon from 'public/assets/vector/question_icon.svg';
import EmailIcon from 'public/assets/vector/support_icon.svg';
import AvatarIcon from 'public/assets/vector/avatar_icon.svg';
import DropIcon from 'public/assets/vector/dropdown_icon.svg';
import { MenuDropDown } from '../menuDropdown';
import { menuDropDownSupport, menuDropDownWallet, menuDropdownProfile } from '@/menuDropdown';
import { useGetUserQuery } from '@/service/userService';
import { useGetWalletQuery } from '@/service/paymentService';
import CountUp from 'react-countup';
import { useEffect, useState } from 'react';

export const Header = () => {
    const { data: user, isLoading } = useGetUserQuery(undefined, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true
    })

    const { data: wallet } = useGetWalletQuery(undefined, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true
    })

    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(0);

    useEffect(() => {
        if (!wallet) return;
        setEnd(wallet.data);
        if (wallet?.data !== end) {
            setStart(end);
        }
    }, [wallet, end, start]);

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
                    <span>
                        <CountUp start={start} end={end} duration={2} />
                        монет
                    </span>
                    <DropIcon />
                </MenuDropDown>
                <MenuDropDown width="195" isBg links={menuDropdownProfile}>
                    <AvatarIcon />
                    <span>{user?.userName}</span>
                    <DropIcon />
                </MenuDropDown>
                <MenuDropDown width="440" menuRight links={menuDropDownSupport}>
                    <EmailIcon />
                </MenuDropDown>
            </div>
        </header>
    );
};