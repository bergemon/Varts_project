import PublicIcon from 'public/assets/vector/public_room_icon.svg';
import PrivateIcon from 'public/assets/vector/private_room_icon.svg';
import OnePkIcon from 'public/assets/vector/one_pk_icon.svg';
import FriendsIcon from 'public/assets/vector/friends_icon.svg';
import PhotoIcon from 'public/assets/vector/photo_icon.svg';
import ShopIcon from 'public/assets/vector/shop_icon.svg';
import RulesIcon from 'public/assets/vector/rules_icon.svg';
import SupportIcon from 'public/assets/vector/support_icon_aside.svg';

type MenuAsside = {
    id: number;
    title: string;
    isButton?: boolean;
    icon: any;
    link?: string;
}

export const MenuAsside: MenuAsside[] = [
    {
        id: 1,
        title: "Публичные комнаты",
        isButton: true,
        icon: <PublicIcon />
    },
    {
        id: 2,
        title: "Приватные комнаты",
        isButton: true,
        icon: <PrivateIcon />,
    },
    {
        id: 3,
        title: "Игра с одного компьютера",
        icon: <OnePkIcon />,
        link: '/game-one-pc'
    },
    {
        id: 4,
        title: "Список друзей",
        icon: <FriendsIcon />,
        link: '/friends'
    },
    {
        id: 5,
        title: "Мой альбом",
        icon: <PhotoIcon />,
        link: '/my-album'
    },
    {
        id: 6,
        title: "Магазин",
        icon: <ShopIcon />,
        link: '/shop/currency'
    },
    {
        id: 7,
        title: "Правила игры",
        icon: <RulesIcon />,
        link: '/rules'
    },
    {
        id: 8,
        title: "Служба поддержки",
        icon: <SupportIcon />,
        link: '/support'
    }
];