import { IBreadcrumbs } from "@/types/breadcrumbs";
import { Breadcrumbs } from "../breadcrumbs";

type Props = {
    title: string;
    items: IBreadcrumbs[];
}

export const PageTitle = ({ title, items }: Props) => {
    return (
        <div className="pt-2.5">
            <Breadcrumbs items={items} />
            <h3 className="mt-2.5 text-lg font-medium">{title}</h3>
        </div>
    );
};