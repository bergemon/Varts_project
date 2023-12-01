import { BaseInput } from "@/components/UI/baseInput";
import { BaseSelect } from "@/components/UI/baseSelect";

export const AuctionScreen = () => {
    return (
        <div className="mt-2.5">
            <div className="flex items-center gap-5">
                <BaseSelect allOptions={[['buy', 'Покупка'], ['sell', 'Продажа']]} />
                <BaseInput className="w-full" color="search" icon="search" />
            </div>
            <div className="mt-6">
                <div>
                    <h3 className="mb-3.5 text-base font-medium">Мои лоты на продажу <span className="ml-2.5 text-gray-70 font-normal">(1)</span></h3>
                    <div className={`w-full overflow-y-auto scrollbar h-[10rem] flex flex-col`}>
                        <table>
                            <thead>
                                <tr>
                                    <th />
                                    <th>Названия</th>
                                    <th>Размещено</th>
                                    <th>Комплект</th>
                                    <th>Кол-во</th>
                                    <th>Цена</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
    
                                <tr>
                                    <td>
                                        Платеж
                                    </td>
                                    <td>
                                        Платеж
                                    </td>
                                    <td>
                                        Платеж
                                    </td>
                                    <td>
                                        Платеж
                                    </td>
                                    <td>
                                        Платеж
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Платеж
                                    </td>
                                    <td>
                                        Платеж
                                    </td>
                                    <td>
                                        Платеж
                                    </td>
                                    <td>
                                        Платеж
                                    </td>
                                    <td>
                                        Платеж
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Платеж
                                    </td>
                                    <td>
                                        Платеж
                                    </td>
                                    <td>
                                        Платеж
                                    </td>
                                    <td>
                                        Платеж
                                    </td>
                                    <td>
                                        Платеж
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};