import { colorsBg } from "@/colors";
import { ITab } from "@/types/tab";
import { Tab } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
    tabs: ITab[];
    baseLink: string;
}

export const TopBarTab = ({ tabs, baseLink }: Props) => {
    const router = useRouter();
    const _selectedTab = (router.query.pid as string) ?? tabs[0].href;
    const selectedIndex = tabs.findIndex(tab => tab.href.toLowerCase() === _selectedTab) ?? 0;

    if (!router.isReady) {
        return null;
    }
    return (
        <Tab.Group
            selectedIndex={selectedIndex}
            onChange={(index) => {
                const tab = tabs.at(index);
                router.replace(`/${baseLink}/${tab?.href}`, undefined, { shallow: true });
            }}
        >
            <Tab.List className="flex space-x-[1px]">
                {tabs.map((tab, index) => (
                    <Tab className={`${selectedIndex === index ? colorsBg.tab_active : colorsBg.tab_style} outline-none py-4 w-full text-center`} key={tab.name} as={Link} href={`/${baseLink}/${tab.href}`}>
                        {tab.name}
                    </Tab>
                ))}
            </Tab.List>
        </Tab.Group>
    );
};