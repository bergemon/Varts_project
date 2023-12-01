import { ITab } from "@/types/tab";
import { useRouter } from "next/router";

export const useTab = (tabs: ITab[]) => {
    const router = useRouter();
    const _selectedTab = (router.query.tab as string) ?? "currency";
    const selectedIndex = tabs.findIndex(tab => tab.href.toLowerCase() === _selectedTab) ?? 0;

    if (!router.isReady) {
        return null;
    }

    return selectedIndex;
};