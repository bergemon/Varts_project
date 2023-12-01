import { PageTitle } from '@/components/pageTitle';
import { LayoutAuth } from '@/layout/layoutAuth';


export default function Friends() {
    return (
        <LayoutAuth>
            <section>
                <PageTitle items={[
                    { id: 1, title: "Главная", url: '/' },
                    { id: 2, title: "Друзья" },
                ]} title="Друзья" />
                <div className={`w-full mt-5 overflow-y-auto scrollbar h-[10rem] flex flex-col`}>
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
            </section>
        </LayoutAuth>
    )
}