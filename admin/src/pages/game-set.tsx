import { Column, Table } from "@/components/table";
import { PageLayout } from "@/layout/pageLayout";
import { useGetAllCardsQuery } from "@/service/gameCardService";
import { IGameCard } from "@/types/gameCard";
import { Avatar } from "@material-tailwind/react";
import { ReactElement } from "react";

const columns: Column<Partial<IGameCard>>[] = [
  {
    id: 'image', title: 'image', empty: true, Cell: ({ row }) => (
      <Avatar
        src={row.image!}
        alt={'name'}
        size="md"
        className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
      />
    )
  },
  { id: 'name', title: 'Название' },
  { id: 'author', title: 'Размещено' },
  { id: 'createdAt', title: 'Комплект', isDate: true },
  { id: 'updatedAt', title: 'Кол-во', isDate: true },
  {
    id: 'id', title: 'Button', empty: true, Cell: ({ row }) => (
      <button onClick={() => console.log(row)}>Снять с продажи</button>
    )
  },
];

export const auctionSellData: Partial<any>[] = [
  {
    id: "1",
    image: "/assets/images/table_1.png",
    title: "Странные дела",
    date: "12.08.2022",
    kit: 95,
    quantity: 8,
    price: 87
  }
];

export default function GameSet() {
  const { data } = useGetAllCardsQuery({ page: '0', take: '10'});
  console.log(data)
  return (
    <div>
      {data && <Table columns={columns}
        data={data?.data.cards} />}
    </div>
  );
}

GameSet.getLayout = function getLayout(page: ReactElement) {
  return <PageLayout>{page}</PageLayout>
}