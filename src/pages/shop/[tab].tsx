import { PageTitle } from '@/components/pageTitle';
import { AuctionScreen } from '@/components/screens/shop/auctionScreen';
import { CatalogScreen } from '@/components/screens/shop/catalogScreen';
import { CurrensyScreen } from '@/components/screens/shop/currensyScreen';
import { TopBarTab } from '@/components/topBarTab';
import { useTab } from '@/hooks/useTab';
import { LayoutAuth } from '@/layout/layoutAuth';

const tabs = [
    {
        name: "Валюта", href: "currency"
    },
    {
        name: "Каталог", href: "catalog"
    },
    {
        name: "Аукционы", href: "auction"
    }
];

export default function Shop() {
    // хук для таба
    const selectedIndex = useTab(tabs)
    return (
        <LayoutAuth>
            <section>
                <PageTitle items={[
                    { id: 1, title: 'Главная', url: '/' },
                    { id: 2, title: 'Магазин', url: '/shop' },
                    { id: 3, title: String(tabs.find((x, index) => selectedIndex === index)?.name), url: '/' },
                ]} title="Магазин" />
                <div className="mt-5">
                   
                    <TopBarTab tabs={tabs} baseLink="shop" />
                </div>
                {selectedIndex === 0 && <CurrensyScreen />}
                {selectedIndex === 1 && <CatalogScreen />}
                {selectedIndex === 2 && <AuctionScreen />}
            </section>
        </LayoutAuth>
    )
}