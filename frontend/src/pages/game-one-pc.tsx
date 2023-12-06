import { PageTitle } from '@/components/pageTitle';
import { LayoutAuth } from '@/layout/layoutAuth';

export default function GameOnePc() {
    return (
        <LayoutAuth>
            <section>
                <PageTitle items={[
                    { id: 1, title: 'Главная', url: '/' },
                    { id: 2, title: 'Профиль', url: '/profile' },
                ]} title={'Игра с одного компьютера'} />
            </section>
        </LayoutAuth>
    )
}