import { colorsBg } from "@/colors";
import { BaseButton } from "@/components/UI/baseButton";
import { CurrensyShop } from "@/data/currensyShop";
import { usePaymentsWalletMutation } from "@/service/paymentService";
import QuestionIcon from 'public/assets/vector/question_icon.svg';

export const CurrensyScreen = () => {
    const [payment] = usePaymentsWalletMutation();
    return (
        <div>
            <div className="grid grid-cols-4 mt-8 gap-2.5">
                {CurrensyShop.map(item => (
                    <div key={item.id} className={`${colorsBg.gray_90} h-[192px] flex flex-col items-center justify-center`}>
                        <div className="flex items-center gap-2.5 mb-10">
                            <QuestionIcon className="w-9 h-9" />
                            <div className="text-3xl font-bold">{item.numberCoins}</div>
                        </div>
                        <div className="w-full px-4">
                            <BaseButton onClick={() => payment(item.query)} color="purchase">
                                {`Купить за ${item.money} ₽`}
                            </BaseButton>
                        </div>
                    </div>
                ))}
            </div>
            <div className={`${colorsBg.gray_90} h-[200px] mt-[30px] flex flex-col items-center justify-center`}>
                <span className="text-base">Баннер со спецпредложением</span>
            </div>
        </div>
    );
};