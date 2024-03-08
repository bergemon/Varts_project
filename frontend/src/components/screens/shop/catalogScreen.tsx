
import { ChoiseBar } from "@/components/UI/choiseBar";
import { BaseInput } from "@/components/UI/form/baseInput";
import { CatalogCards } from "@/data/catalogCards";
import { Tab } from "@headlessui/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const tabsData = [
    "Все", "Бесплатные"
];

export const CatalogScreen = () => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [tabUnderlineWidth, setTabUnderlineWidth] = useState<string | number>(0);
    const [tabUnderlineLeft, setTabUnderlineLeft] = useState<string | number>(0);

    const tabsRef = useRef<any>([]);

    useEffect(() => {
        function setTabPosition() {
            const currentTab = tabsRef.current[activeTabIndex];
            setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
            setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
        }

        setTabPosition();
        window.addEventListener("resize", setTabPosition);

        return () => window.removeEventListener("resize", setTabPosition);
    }, [activeTabIndex]);
    return (
        <div className="mt-2.5">
            <BaseInput color="search" icon="search" />
            <div className="mt-5">
                <div className="relative">
                    <Tab.Group defaultIndex={0} onChange={setActiveTabIndex}>
                        <Tab.List className="flex space-x-[30px]">
                            {tabsData.map((tab, idx) => (
                                <Tab
                                    key={idx}
                                    ref={(el) => (tabsRef.current[idx] = el)}
                                    className="pb-1 outline-none "
                                >
                                    {tab}
                                </Tab>
                            ))}
                        </Tab.List>
                        <span
                            className="absolute bottom-0 block h-[2px] bg-white transition-all duration-300"
                            style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
                        />
                    </Tab.Group>
                </div>
            </div>
            <div className="mt-5 flex items-center gap-5">
                <ChoiseBar title="Карты" button="Посмотреть все" />
                <ChoiseBar title="Игровые поля" button="Посмотреть все" />
            </div>
            <div className="pt-4 grid grid-cols-2">
                <div className="grid gap-5 grid-cols-3 touch-pan-y">
                    {CatalogCards.map((item) => (
                        <div className="flex-slide flex flex-col items-center rounded-[10px]" key={item.id}>
                            <div className="relative">
                                <Image
                                    className="w-[194px] h-[296px]"
                                    src={item.card}
                                    alt="Your alt text"
                                    width={194}
                                    height={296}
                                />
                                {item.promotion &&
                                    <div className="absolute bottom-0 w-full pb-2.5 left-0">
                                        <div className="flex items-center justify-between">
                                            <div className="text-xs font-medium">
                                                <div>{item.promotion.name}</div>
                                                <div className="mt-1">Осталось: {item.promotion.time}</div>
                                            </div>
                                            <div className="text-right pr-2.5">
                                                {item.countCards}
                                                <br />
                                                карт
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    ))}
                </div>
                <div className="grid gap-5 grid-cols-3 touch-pan-y">
                    {CatalogCards.map((item) => (
                        <div className="flex-slide flex flex-col items-center rounded-[10px]" key={item.id}>
                            <div className="relative">
                                <Image
                                    className="w-[194px] h-[296px]"
                                    src={item.card}
                                    alt="Your alt text"
                                    width={194}
                                    height={296}
                                />
                                {item.promotion &&
                                    <div className="absolute bottom-0 w-full pb-2.5 left-0">
                                        <div className="flex items-center justify-between">
                                            <div className="text-xs font-medium">
                                                <div>{item.promotion.name}</div>
                                                <div className="mt-1">Осталось: {item.promotion.time}</div>
                                            </div>
                                            <div className="text-right pr-2.5">
                                                {item.countCards}
                                                <br />
                                                карт
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};