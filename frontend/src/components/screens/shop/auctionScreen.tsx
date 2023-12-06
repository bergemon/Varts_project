import { BaseInput } from "@/components/UI/baseInput";
import { BaseSelect } from "@/components/UI/baseSelect";
import { Column, SortOrder, Table } from "@/components/table";
import { auctionBuyData, auctionSellData } from "@/data/auctionData";
import { ILot } from "@/types/lot";
import Image from "next/image";
import React from "react";

const columns: Column<Partial<ILot>>[] = [
    {
        id: 'image', title: 'image', empty: true, Cell: ({ row }) => (
            <Image className="rounded-3xl" width={55} height={84} src={row.image!} alt="" />
        )
    },
    { id: 'title', title: 'Название' },
    { id: 'date', title: 'Размещено' },
    { id: 'kit', title: 'Комплект' },
    { id: 'quantity', title: 'Кол-во' },
    { id: 'price', title: 'Цена' },
    {
        id: 'button', title: 'Button', empty: true, Cell: ({ row }) => (
            <button onClick={() => console.log(row)}>Снять с продажи</button>
        )
    },
];

export const AuctionScreen = () => {
    const [sortField, setSortField] = React.useState<keyof ILot | null>(null);
    const [sortOrder, setSortOrder] = React.useState<SortOrder>(null);

    const handleSort = (field: keyof ILot) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };
    return (
        <div className="mt-2.5">
            <div className="flex items-center gap-5">
                <BaseSelect allOptions={[['buy', 'Покупка'], ['sell', 'Продажа']]} />
                <BaseInput className="w-full" color="search" icon="search" />
            </div>
            <div className="mt-6">
                <div>
                    <h3 className="mb-3.5 text-base font-medium">Мои лоты на продажу <span className="ml-2.5 text-gray-70 font-normal">(1)</span></h3>
                    <Table
                        columns={columns}
                        data={auctionSellData}
                        sortField={sortField}
                        sortOrder={sortOrder}
                        handleSort={handleSort}
                    />
                </div>
                <div>
                    <h3 className="mb-3.5 text-base font-medium">Мои запросы на покупку <span className="ml-2.5 text-gray-70 font-normal">(1)</span></h3>
                    <Table
                        columns={columns}
                        data={auctionBuyData}
                        sortField={sortField}
                        sortOrder={sortOrder}
                        handleSort={handleSort}
                    />
                </div>
            </div>
        </div>
    );
};