import { HashTagList } from "@/components/UI/hashTagList";
import { Column, Table } from "@/components/table";
import { ModalProvider, useModalContext } from "@/context/modalContext";
import { usePageChange } from "@/hooks/usePageChange";
import { PageLayout } from "@/layout/pageLayout";
import { useGetAllCardsQuery } from "@/service/gameCardService";
import { IGameCard } from "@/types/gameCard";
import { Avatar } from "@material-tailwind/react";
import { ReactElement, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IGameCardType, gameCardSchema } from "@/utils/yupSchema";
import { gameCardForm } from "@/forms/cardsForm";

const columns: Column<Partial<IGameCard>>[] = [
  {
    id: 'image', title: 'Изображение', empty: true, Cell: ({ row }) => (
      <Avatar
        src={row.image!}
        alt={'name'}
        size="md"
        className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
      />
    )
  },
  { id: 'name', title: 'Название' },
  { id: 'author', title: 'Автор' },
  { id: 'createdAt', title: 'Создано', isDate: true },
  { id: 'updatedAt', title: 'Обновлено', isDate: true },
  {
    id: 'hashTag', title: 'Хештеги', Cell: ({ row }) => (
      <HashTagList tags={row.hashTag} />
    )
  },
];

export default function GameCard() {
  const { currentPage, setCurrentPage } = usePageChange(0);

  const { data } = useGetAllCardsQuery({ page: currentPage.toString(), take: '10' });


  const { register, handleSubmit, reset, formState: { errors } } = useForm<IGameCardType>({
    resolver: yupResolver(gameCardSchema),
  });


  return (
    <ModalProvider register={register} fieldList={gameCardForm} onSubmit={() => console.log('')} reset={reset}>
      {data &&
        <Table
          title="Карты"
          postTitle="Заметка после названия"
          columns={columns}
          onDeleteOpen={(row) => console.log(row)}
          onEditOpen={(row) => console.log(row)}
          totalPages={data?.data.totalPages || 0}
          onPageChange={setCurrentPage}
          currentPage={currentPage}
          data={data?.data.cards} />
      }
  </ModalProvider>
  );
}

GameCard.getLayout = function getLayout(page: ReactElement) {
  return <PageLayout>{page}</PageLayout>
}