import { Header } from "@/components/header";
import { MenuAsside } from '@/menuAsside';
import Link from 'next/link';
import PremiumIcon from 'public/assets/vector/premium_icon.svg';
import { Roboto } from 'next/font/google'
import { useRouter } from "next/router";
import { ActiveLink } from "@/components/UI/activeLink";
import { BaseButton } from "@/components/UI/baseButton";
import { useModal } from "@/hooks/useModal";
import { RulesModal } from "@/components/modal/rulesModal";

type Props = {
    children: React.ReactNode;
}

const roboto = Roboto({ weight: ['100', '300', '400', '500', '700', '900'], subsets: ['latin'] })

export const LayoutAuth = ({ children }: Props) => {
    const { isOpen, onOpenModal, onCloseModal } = useModal()
    return (
        <div className={`bg-dark text-white h-screen w-screen flex flex-col items-center ${roboto.className}`}>
            <Header />
            <div className="flex w-screen pl-5 pr-[165px] gap-[35px]">
                <aside className="w-[290px] pt-5">
                    <div className="flex flex-col gap-[5px]">
                        {MenuAsside.map(item => {
                            if (item.isButton) {
                                return (
                                    <div key={item.id} className="border-gray-90 rounded-[5px] p-4 border-solid border-[1px]">
                                        <div className="flex items-center gap-5">
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </div>
                                        <div className="flex items-center mt-3.5 gap-2.5">
                                            <BaseButton color="createRoomSm">Найти</BaseButton>
                                            <BaseButton color="createRoomSm">Создать</BaseButton>
                                        </div>
                                    </div>
                                )
                            }
                            if (!item.isButton && item.link) {
                                return (
                                    <ActiveLink href={item.link} key={item.id}>
                                        <div>{item.icon}</div>
                                        <span>{item.title}</span>
                                    </ActiveLink>
                                )
                            }
                        })}
                    </div>
                    <div className="mt-[30px]">
                        <div className="flex bg-gray-90 h-[120px] flex-col items-center justify-center">
                            <PremiumIcon />
                            <div>Премиум-аккаунт</div>
                        </div>
                    </div>
                </aside>
                <div className="w-full">
                    {children}
                </div>
            </div>
            <div className="flex w-screen pb-5 pl-[30px] mt-auto justify-left items-start">
                <div onClick={() => onOpenModal()} className="text-gray cursor-pointer">Пользовательское соглашение</div>
            </div>
            <RulesModal isOpen={isOpen} closeModal={onCloseModal} />
        </div>
    );
};