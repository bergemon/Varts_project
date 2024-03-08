import { NavbarComponent } from "@/components/navbar";
import { SideBar } from "@/components/sidebar";

type Props = {
    children: React.ReactNode;
}

export const PageLayout = ({ children }: Props) => {
    return (
        <div className="flex">
            <SideBar />
            <div className="flex flex-col w-full">
                <NavbarComponent />
                <div className="px-10 py-10">
                    {children}
                </div>
            </div>
        </div>
    );
};