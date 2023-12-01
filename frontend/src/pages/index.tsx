import { LayoutAuth } from '@/layout/layoutAuth';
import SearchRoomIcon from 'public/assets/vector/search_room_icon.svg';
import PrivateRoomIcon from 'public/assets/vector/in_private_icon.svg';
import SubscribeIcon from 'public/assets/vector/subscription_icon.svg';
import ReferalIcon from 'public/assets/vector/referral_icon.svg';
import { BaseButton } from '@/components/UI/baseButton';
import { RulesModal } from '@/components/modal/rulesModal';

export default function Home() {
    return (
        <LayoutAuth>
          <section className="grid h-full grid-cols-2 gap-2.5">
            <div className="p-10 flex flex-col bg-gradient-room rounded-[5px]">
                <SearchRoomIcon />
                <h2 className="w-3/12 text-3xl font-bold mt-9">Публичные комнаты</h2>
                <div className="bg-gray-70 w-[30px] h-1 my-5"></div>
                <div>Находите новых друзей</div>
                <div className="flex items-center gap-5 mt-auto">
                    <BaseButton color="createRoomXl">Создать</BaseButton>
                    <BaseButton color="createRoomXl">Найти</BaseButton>
                </div>
            </div>
            <div className="p-10 flex flex-col bg-gradient-room rounded-[5px]">
                <PrivateRoomIcon />
                <h2 className="w-3/12 text-3xl font-bold mt-9">Приватные комнаты</h2>
                <div className="bg-gray-70 w-[30px] h-1 my-5"></div>
                <div>Играйте вместе с друзьями</div>
                <div className="flex items-center gap-5 mt-auto">
                    <BaseButton color="createRoomXl">Создать</BaseButton>
                    <BaseButton color="createRoomXl">Найти</BaseButton>
                </div>
            </div>
            <div className="bg-gray-90 p-16 flex items-start gap-[30px] rounded-[5px]">
                <div>
                    <SubscribeIcon />
                </div>
                <div>
                    <h3>Подписка</h3>
                    <p className="text-gray-40 mt-2.5 mb-5">Приобретите подписку на месяц и воспользуйтесь расширенными функциями в игре</p>
                    <BaseButton color="details">Подробнее</BaseButton>
                </div>
            </div>
            <div className="bg-gray-90 p-16 flex items-start gap-[30px] rounded-[5px]">
                <div>
                    <ReferalIcon />
                </div>
                <div>
                    <h3>Реферальная программа</h3>
                    <p className="text-gray-40 mt-2.5 mb-5">Приглашайте друзей и получайте новые карты для игры</p>
                    <BaseButton color="details">Подробнее</BaseButton>
                </div>
            </div>
          </section>
        </LayoutAuth>
    )
}