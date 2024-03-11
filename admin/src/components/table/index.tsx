import { useModalContext } from "@/context/modalContext";
import { dateFormat } from "@/utils/dateFormat";
import {
    MagnifyingGlassIcon,
    PencilIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    CardFooter,
    IconButton,
    Input,
    Tooltip,
} from "@material-tailwind/react";
import { UseFormReset, FieldValues } from "react-hook-form";

export type Column<T> = {
    id: keyof T & string;
    title?: string;
    empty?: boolean;
    Cell?: (props: { row: T }) => React.ReactNode;
    isDate?: boolean;
}

type TableProps<T> = {
    columns: Column<T>[];
    data: T[];
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    title: string;
    postTitle: string;
    tooltips?: {
        edit: string;
        delete: string;
    };
    reset?: any;
}

export const Table = <T,>({ columns, data, currentPage, totalPages, onPageChange, title, postTitle, tooltips, reset }: TableProps<T>) => {
    const handlePreviousPage = () => {
        if (currentPage > 0) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            onPageChange(currentPage + 1);
        }
    };

    const { openModal } = useModalContext<T>();

    const openEdit = (row: T) => {
        openModal("edit", row);
        reset!(row)
    }

    const openDelete = (row: T) => {
        openModal("delete", row);
        reset!(row)
    }

    const openCreate = () => {
        openModal("create");
        reset!(undefined)
    }

    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            {title}
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            {postTitle}
                        </Typography>
                    </div>
                    <div className="flex w-full shrink-0 gap-2 md:w-max">
                        <div className="w-full md:w-72">
                            <Input
                                crossOrigin=""
                                label="Search"
                                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                            />
                        </div>
                        <Button onClick={openCreate} size="sm">
                            Создать
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="overflow-scroll px-0">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {columns.map(column => (
                                <th key={column.id} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                    {column.title ?
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >

                                            {column.title}
                                        </Typography> : null}
                                </th>
                            ))}
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4" />
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index}>
                                {columns.map(column => (
                                    column.Cell ? (
                                        <td className="p-4 border-b border-blue-gray-50" key={column.id}>{column.Cell({ row })}</td>
                                    ) : (
                                        <td className="p-4 border-b border-blue-gray-50" key={column.id}>{column.isDate && row[column.id] ? dateFormat(row[column.id] as string) : row[column.id] as React.ReactNode}</td>
                                    )
                                ))}
                                <td className="p-4 border-b border-blue-gray-50">
                                    <Tooltip content={tooltips?.edit}>
                                        <IconButton onClick={() => openEdit(row)} variant="text">
                                            <PencilIcon className="h-4 w-4" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip content={tooltips?.delete}>
                                        <IconButton onClick={() => openDelete(row)} variant="text">
                                            <TrashIcon className="h-4 w-4" />
                                        </IconButton>
                                    </Tooltip>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Button variant="outlined" size="sm" onClick={handlePreviousPage} disabled={currentPage === 0}>
                    Предыдущая
                </Button>
                <div className="flex items-center gap-2">
                    {[...Array(totalPages).keys()].map((page) => (
                        <IconButton
                            key={page}
                            variant={currentPage === page ? "outlined" : "text"}
                            size="sm"
                            onClick={() => onPageChange(page)}
                        >
                            {page + 1}
                        </IconButton>
                    ))}
                </div>
                <Button variant="outlined" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
                    Следующая
                </Button>
            </CardFooter>
        </Card>
    );
};