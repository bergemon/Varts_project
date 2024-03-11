import { Column, Table } from "@/components/table";
import { ModalContainer } from "@/context/modalContainer";
import { PageLayout } from "@/layout/pageLayout";
import { IGameCard } from "@/types/gameCard";
import { Avatar } from "@material-tailwind/react";
import { ReactElement } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateNewFieldMutation, useDeleteFieldMutation, useGetAllFieldsQuery, useUpdateFieldMutation } from "@/service/gameFieldService";
import { IGameFieldType, gameFieldSchema } from "@/utils/yupSchema";
import { usePageChange } from "@/hooks/usePageChange";
import { useModalContext } from "@/context/modalContext";
import { IGameField } from "@/types/gameField";
import toast from "react-hot-toast";
import { gameFieldForm } from "@/forms/cardsForm";


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

export default function GameField() {
  const { currentPage, setCurrentPage } = usePageChange(0);

  const { data } = useGetAllFieldsQuery({ page: currentPage.toString(), take: '10' });
  const [createNewField] = useCreateNewFieldMutation();
  const [updateField] = useUpdateFieldMutation()
  const [deleteField] = useDeleteFieldMutation();


  const { register, reset, handleSubmit, formState: { errors } } = useForm<IGameFieldType>({
    resolver: yupResolver(gameFieldSchema),
  });

  const { modalType, modalData, closeModal } = useModalContext<IGameField>();

  const createGameField: SubmitHandler<IGameFieldType> = (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (key !== "image") {
        formData.append(key, (data as any)[key]);
      } else {
        formData.append("file", (data.image as any)[0]);
      }
    }
    toast.promise(
      createNewField(formData).unwrap(),
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

  const deleteGameField = () => {
    if (modalData)
      toast.promise(
        deleteField(modalData.id).unwrap(),
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

  const updateGameField: SubmitHandler<IGameFieldType> = (data) => {
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
        updateField({ id: modalData.id, data: formData }).unwrap(),
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
    create: handleSubmit(data => createGameField(data)),
    edit: handleSubmit(data => updateGameField(data)),
    delete: deleteGameField,
  }
  return (
    <ModalContainer
      register={register}
      fieldList={gameFieldForm}
      onSubmit={objectFunction[modalType]}
      modalType={modalType}
      closeModal={closeModal}
      errors={errors}
      title={{
        create: "Создать новое игровое поле",
        delete: `Вы уверены, что хотите удалить игровое поле ${modalData?.id}`,
        edit: `Редактировать игровое поле ${modalData?.id}`
      }}
    >
      {data &&
        <Table
          title="Игровые поля"
          postTitle="Заметка после названия"
          tooltips={{
            edit: "Редактировать поле",
            delete: "Удалить поле"
          }}
          reset={reset}
          columns={columns}
          totalPages={data?.data.totalPages || 0}
          onPageChange={setCurrentPage}
          currentPage={currentPage}
          data={data?.data.fields} />
      }
    </ModalContainer>
  );
}

GameField.getLayout = function getLayout(page: ReactElement) {
  return <PageLayout>{page}</PageLayout>
}