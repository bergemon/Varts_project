import { PageTitle } from '@/components/pageTitle';
import { ReferalsScreen } from '@/components/screens/profile/referalsScreen';
import { SettingsScreen } from '@/components/screens/profile/settingsScreen';
import { TopBarTab } from '@/components/topBarTab';
import { useTab } from '@/hooks/useTab';
import { LayoutAuth } from '@/layout/layoutAuth';

const tabs = [
    {
        name: "Настройка аккаунта", href: "settings"
    },
    {
        name: "Реферальная программа", href: "referals"
    }
];

export default function Shop() {
    // хук для таба
    const selectedIndex = useTab(tabs);
    return (
        <LayoutAuth>
            <section>
                <PageTitle items={[
                    { id: 1, title: 'Главная', url: '/' },
                    { id: 2, title: 'Профиль', url: '/profile' },
                    { id: 3, title: String(tabs.find((x, index) => selectedIndex === index)?.name), url: '/' },
                ]} title={String(tabs.find((x, index) => selectedIndex === index)?.name)} />
                <div className="mt-5">
                    <TopBarTab tabs={tabs} baseLink="profile" />
                </div>
                {selectedIndex === 0 && <SettingsScreen />}
                {selectedIndex === 1 && <ReferalsScreen />}
            </section>
        </LayoutAuth>
    )
}