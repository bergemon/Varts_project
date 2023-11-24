import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";

type ActiveLinkProps = LinkProps & {
    children: ReactNode;
}

export const ActiveLink: FC<ActiveLinkProps> = ({ href, children }) => {
    const router = useRouter()
    const currentPath = router.pathname.split('/')
    const isActive = currentPath.includes(String(href).split('/')[1])

    return (
        <Link className={`${isActive ? 'bg-opacity10' : ''} flex items-center hover:bg-opacity10 cursor-pointer gap-5 p-4 border-b-gray-90 border-b-[1px]`} href={href}>
            {children}
        </Link>
    )
}