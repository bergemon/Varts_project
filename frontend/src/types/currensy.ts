export type ICurrensy = {
    id: number;
    numberCoins: number;
    money: number;
    query: 'pay80' | 'pay250' | 'pay500' | 'pay1000';
}