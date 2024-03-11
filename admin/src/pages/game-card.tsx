import { HashTagList } from "@/components/UI/hashTagList";
import { Column, Table } from "@/components/table";
import { ModalProvider, ModalType, OptionalTitleObject, useModalContext } from "@/context/modalContext";
import { usePageChange } from "@/hooks/usePageChange";
import { PageLayout } from "@/layout/pageLayout";
import { useCreateNewCardMutation, useDeleteCardMutation, useGetAllCardsQuery, useUpdateCardMutation } from "@/service/gameCardService";
import { IGameCard } from "@/types/gameCard";
import { Avatar } from "@material-tailwind/react";
import { ReactElement, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IGameCardType, gameCardSchema } from "@/utils/yupSchema";
import { gameCardForm } from "@/forms/cardsForm";
import { ModalContainer } from "@/context/modalContainer";
import toast from "react-hot-toast";

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
  const [createNewCard] = useCreateNewCardMutation();
  const [updateCard] = useUpdateCardMutation()
  const [deleteCard] = useDeleteCardMutation();


  const { register, reset, handleSubmit, formState: { errors } } = useForm<IGameCardType>({
    resolver: yupResolver(gameCardSchema),
  });

  const { modalType, modalData, closeModal } = useModalContext<IGameCard>();

  const createGameCard: SubmitHandler<IGameCardType> = (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (key !== "image") {
        formData.append(key, (data as any)[key]);
      } else {
        formData.append("file", (data.image as any)[0]);
      }
    }
    toast.promise(
      createNewCard(formData).unwrap(),
      {
        loading: 'Создание...',
        success: (data) => `Карточка ${data.data.name} успешно создана`,
        error: (err) => `Произошла ошибка (${err.data.message})`
      }
    ).then((res) => {
      closeModal()
    })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteGameCard = () => {
    if (modalData)
      toast.promise(
        deleteCard(modalData.id).unwrap(),
        {
          loading: 'Удаление...',
          success: (data) => `Карточка ${data.data.name} успешно удалена`,
          error: (err) => `Произошла ошибка (${err.data.message})`
        }
      ).then((res) => {
        closeModal()
      })
        .catch((error) => {
          console.error(error);
        });
  };

  const updateGameCard: SubmitHandler<IGameCardType> = (data) => {
    if (modalData) {
      const formData = new FormData();
      for (const key in data) {
        if (key !== "image") {
          formData.append(key, (data as any)[key]);
        } else {
          formData.append("file", (data.image as any)[0]);
        }
      }
      toast.promise(
        updateCard({ id: modalData.id, data: formData }).unwrap(),
        {
          loading: 'Создание...',
          success: (data) => `Карточка ${data.data.name} успешно создана`,
          error: (err) => `Произошла ошибка (${err.data.message})`
        }
      ).then((res) => {
        closeModal()
      })
        .catch((error) => {
          console.error(error);
        });
    }
  };


  const objectFunction: any = {
    create: handleSubmit(data => createGameCard(data)),
    edit: handleSubmit(data => updateGameCard(data)),
    delete: deleteGameCard,
  }

  return (
    <ModalContainer
      register={register}
      fieldList={gameCardForm}
      onSubmit={objectFunction[modalType]}
      modalType={modalType}
      closeModal={closeModal}
      errors={errors}
      title={{
        create: "Создать новую карточку",
        delete: `Вы уверены, что хотите удалить карточку ${modalData?.id}`,
        edit: `Редактировать карточку ${modalData?.id}`
      }}
    >
      {data &&
        <Table
          title="Карты"
          postTitle="Заметка после названия"
          tooltips={{
            edit: "Редактировать карту",
            delete: "Удалить карту"
          }}
          reset={reset}
          columns={columns}
          totalPages={data?.data.totalPages || 0}
          onPageChange={setCurrentPage}
          currentPage={currentPage}
          data={data?.data.cards} />
      }
    </ModalContainer>
  );
}

GameCard.getLayout = function getLayout(page: ReactElement) {
  return <PageLayout>{page}</PageLayout>
}