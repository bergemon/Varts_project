import { Transition } from "@headlessui/react";
import SortIcon from "public/assets/vector/table_sort_icon.svg";

export type Column<T> = {
    id: keyof T & string;
    title: string;
    empty?: boolean;
    Cell?: (props: { row: T }) => React.ReactNode;
}

type TableProps<T> = {
    columns: Column<T>[];
    data: T[];
    sortField: keyof T | null;
    sortOrder: SortOrder;
    handleSort: (field: keyof T) => void;
}

export const Table = <T,>({ columns, data, sortField, sortOrder, handleSort }: TableProps<T>) => {
    return (
        <div className={`w-full overflow-y-auto scrollbar h-[10rem] flex flex-col`}>
            <table>
                <thead>
                    <tr>
                        {columns.map(column => (
                            column.empty ? (
                                <th key={column.id} />
                            ) : (
                                <SortableTh
                                    key={column.id}
                                    title={column.title}
                                    sortable={true}
                                    sorted={sortField === column.id}
                                    sortOrder={sortField === column.id ? sortOrder : null}
                                    onSort={() => handleSort(column.id)}
                                />
                            )
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            {columns.map(column => (
                                column.Cell ? (
                                    <td key={column.id}>{column.Cell({ row })}</td>
                                ) : (
                                    <td key={column.id}>{row[column.id] as React.ReactNode}</td>
                                )
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export type SortOrder = 'asc' | 'desc' | null;

type SortableThProps = {
    title: string;
    sortable: boolean;
    sorted: boolean;
    sortOrder: SortOrder;
    onSort: () => void;
}

const SortableTh: React.FC<SortableThProps> = ({ title, sortable, sorted, sortOrder, onSort }) => {
    return (
        <th onClick={sortable ? onSort : undefined}>
            <div className="flex items-center gap-1">
                <h4>
                    {title}
                </h4>
                <Transition
                    show={sorted}
                    enter="transition-transform duration-200"
                    enterFrom="rotate-0"
                    enterTo="rotate-180"
                    leave="transition-transform duration-200"
                    leaveFrom="rotate-180"
                    leaveTo="rotate-0"
                >

                    <SortIcon className={`w-2.5 h-2.5`} />
                </Transition>
            </div>
        </th>
    );
};