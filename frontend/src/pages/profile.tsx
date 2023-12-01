import { PageTitle } from '@/components/pageTitle';
import { LayoutAuth } from '@/layout/layoutAuth';


export default function Friends() {
    return (
        <LayoutAuth>
            <section>
                <PageTitle items={[
                    { id: 1, title: "Главная", url: '/' },
                    { id: 2, title: "Профиль" },
                ]} title="Профиль" />
                
            </section>
        </LayoutAuth>
    )
}