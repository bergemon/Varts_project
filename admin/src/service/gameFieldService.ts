import { vartsApi } from "./vartsService";
import { IGameField, IFieldResponse, IFieldsResponse } from "@/types/gameField";
import { IResponseQuery } from "@/types/response";


const fieldService = vartsApi.injectEndpoints({
    endpoints: (build) => ({
        // Получение всех полей
        getAllFields: build.query<IFieldsResponse, IResponseQuery>({
            query: ({ page, take }) => ({
                url: `/fields`,
                params: { page, take }
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.data.map(({ id }) => ({ type: 'Fields' as const, id })),
                        { type: 'Fields', id: 'LIST' },
                    ]
                    : [{ type: 'Fields', id: 'LIST' }],
        }),
        // Создание нового поля
        createNewField: build.mutation<IFieldResponse, Partial<IGameField>>({
            query: (newField) => ({
                method: 'POST',
                url: '/fields',
                body: newField,
            }),
            invalidatesTags: [{ type: 'Fields', id: 'LIST' }],
        }),
        // Обновление поля
        updateField: build.mutation<IFieldResponse, { id: string; data: Partial<IGameField> }>({
            query: ({ id, data }) => ({
                method: 'PUT',
                url: `/fields/${id}`,
                body: data,
            }),
            invalidatesTags: [{ type: 'Fields', id: 'LIST' }],
        }),
        // Удаление поля
        deleteField: build.mutation<IFieldResponse, { id: string }>({
            query: ({ id }) => ({
                method: 'DELETE',
                url: `/fields/${id}`,
            }),
            invalidatesTags: [{ type: 'Fields', id: 'LIST' }],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetAllFieldsQuery,
    useCreateNewFieldMutation,
    useUpdateFieldMutation,
    useDeleteFieldMutation,
} = fieldService;