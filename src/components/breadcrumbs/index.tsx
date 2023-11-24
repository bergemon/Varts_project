import { IBreadcrumbs } from '@/types/breadcrumbs';
import Link from 'next/link'

type BreadCrumbsProps = {
  items: IBreadcrumbs[];
}

export const Breadcrumbs = ({ items }: BreadCrumbsProps) => {
  return (
    <nav className="flex gap-2 text-xs items-center">
      {items.map((crumb, index) => {
        const isLastItem = index === items.length - 1
        if (!isLastItem) {
          return (
            <div className="flex items-center gap-2" key={crumb.id}>
              <Link
                href={crumb.url}
                className="hover:text-primary"
              >
                {crumb.title}
              </Link>
              /
            </div>
          )
        } else {
          return <div className="opacity-30" key={crumb.id}>{crumb.title}</div>
        }
      })}
    </nav>
  )
}
