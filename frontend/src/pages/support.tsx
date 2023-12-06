import { PageTitle } from '@/components/pageTitle';
import { LayoutAuth } from '@/layout/layoutAuth';

export default function Support() {
    return (
        <LayoutAuth>
            <section>
                <PageTitle items={[
                    { id: 1, title: 'Главная', url: '/' },
                    { id: 2, title: 'Профиль', url: '/profile' },
                ]} title={'Служба поддержки'} />
            </section>
        </LayoutAuth>
    )
}