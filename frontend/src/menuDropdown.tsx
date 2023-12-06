import ProfileIcon from "public/assets/vector/dropdown_profile_icon.svg"
import SoundIcon from "public/assets/vector/dropdown_sound_icon.svg"
import LogoutIcon from "public/assets/vector/dropdown_logout_icon.svg"
import PaymentIcon from "public/assets/vector/dropdown_payment_icon.svg";
import WithdrawIcon from "public/assets/vector/dropdown_withdraw_icon.svg";

// выпадающее меню в хедере
/**
 * Определение типа для свойств меню выпадающего списка.
 *
 * @typedef {Object} MenuDropDownProps
 * @property {string} href - URL, на который будет перенаправлен пользователь при нажатии на пункт меню.
 * @property {string} label - Текст, который будет отображаться для пользователя в качестве метки пункта меню.
 * @property {React.ReactElement} icon - Иконка, которая будет отображаться рядом с пунктом меню.
 */
export type MenuDropDownProps = {
    href: string;
    label: string
    icon: React.ReactElement;
} | {
    href: string;
    label: EventTypes;
    icon?: never;
};

enum EventTypes {
    FRIEND_REQUEST = 'Запрос на добавления в друзья',
    INVITED_TO_ROOM = 'Вы приглашены в комнату',
    USER_ENTERED_ROOM = 'Иван Иванов вошел в комнату',
    PREMIUM_ACTION_EXPIRED = 'Действие премиум-аккаунта истекло',
    SUBSCRIPTION_ENDING = 'Срок Подписки заканчивается',
    SUPPORT_MESSAGE = 'Письмо от Службы поддержки',
    GIFT_CARD = 'Карта в подарок (реферальная программа)',
    USER_GIFTED_CARD = 'Иван Иванов подарил вам карту',
    MODERATION_PASSED = 'Модерация пройдена «Дом и хобби»',
    MOVE_TO_AUCTION = '«Дом и хобби» перемещено на аукцион'
}

export const menuDropdownProfile: MenuDropDownProps[] = [
    {
        href: "/profile/settings",
        label: "Профиль",
        icon: <ProfileIcon />
    },
    {
        href: "/sound",
        label: "Звук",
        icon: <SoundIcon />
    },
    {
        href: "/logout",
        label: "Выход",
        icon: <LogoutIcon />
    }
];

export const menuDropDownWallet: MenuDropDownProps[] = [
    {
        href: "/shop/currency",
        label: "Пополнить баланс",
        icon: <PaymentIcon />
    },
    {
        href: "/",
        label: "Вывести на карту",
        icon: <WithdrawIcon />
    }
];

export const menuDropDownSupport: MenuDropDownProps[] = [
    {
        href: "/",
        label: EventTypes.FRIEND_REQUEST
    },
    {
        href: "/",
        label: EventTypes.GIFT_CARD,
    },
    {
        href: "/",
        label: EventTypes.INVITED_TO_ROOM,
    },
    {
        href: "/",
        label: EventTypes.MODERATION_PASSED,
    },
    {
        href: "/",
        label: EventTypes.MOVE_TO_AUCTION,
    },
    {
        href: "/",
        label: EventTypes.PREMIUM_ACTION_EXPIRED,
    },
    {
        href: "/",
        label: EventTypes.SUBSCRIPTION_ENDING,
    },
    {
        href: "/",
        label: EventTypes.SUPPORT_MESSAGE,
    },
    {
        href: "/",
        label: EventTypes.USER_ENTERED_ROOM,
    },
    {
        href: "/",
        label: EventTypes.USER_GIFTED_CARD,
    }
];