import { ColorBg, ColorText, ColorButtonKey, ColorInputKey } from "./types/config";

/**
 * @param {ColorBg} colorsBg - Объект, содержащий цвета фона и градиента
 * @param {string} colorsBg.main - Цвет фона
 * @param {string} colorsBg.card_room - Градиент на главной паблик/приват рум
 * @param {string} colorsBg.card_banner - Цвет баннеров подписка/реферальная программа
 * @param {string} colorsBg.btn_room - Кнопка найти/создать на sidebar
 * @param {string} colorsBg.btn_create - Кнопка найти создать на главном экране публичные/приватные
 */

// тема оформления
export const colorsBg: ColorBg = {
    // цвет фона
    main: "bg-dark text-white",
    // градиент на главной паблик/приват рум
    card_gradient: "bg-gradient-room text-white",
    // цвет баннеров подписка/реферальная программа
    gray_90: "bg-gray-90 text-white",
    // кнопка найти создать на главном экране публичные/приватные
    gray_70: "bg-gray-70 text-white",
    // стиль для табов в магазине active/default
    tab_active: "bg-gray-50 text-dark",
    tab_style: "bg-gray-90 text-gray-70"
}

// оформление текста
export const colorsText: ColorText = {
    gray_50: 'text-gray-50'
}

const colors = {
    formAuth: 'bg-dark text-white w-full h-[56px] rounded-5xl text-base font-medium',
    createRoomSm: 'bg-gray-90 text-white h-[30px] w-[115px] rounded-[500px] text-xs',
    createRoomXl: 'bg-gray-70 text-white h-[40px] w-[160px] rounded-5xl text-sm',
    details: 'bg-transparent border-1xl border-gray-70 text-white h-[40px] w-[200px] rounded-5xl text-base font-medium',
    purchase: 'bg-gray-70 h-[40px] w-full rounded-5xl text-white font-medium text-base',
    search: 'absolute right-1 top-1/2 -translate-y-1/2 bg-gray-80 h-[38px] w-[99px] rounded-3xl text-white text-base font-medium',
    check_all: 'bg-gray-90 text-white h-[32px] w-[140px] rounded-[500px] text-xs'
}

// оформление кнопок
export const getButtonColor = (
    color: ColorButtonKey,
) => {
    const base = []
    base.push(colors[color])
    return base.join(' ')
};


// оформление инпутов
const inputs = {
    form: 'bg-white rounded-[3px] h-[48px] pl-4 pr-16 outline-none text-dark',
    search: 'bg-white rounded-[3px] h-[48px] pl-12 pr-32 outline-none text-dark'
}

// оформление инпута
export const getInputColor = (
    color: ColorInputKey,
) => {
    const base = []

    base.push(inputs[color])
  
    return base.join(' ')
};