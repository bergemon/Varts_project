import { vartsApi } from "./vartsService";
import { IGameField, IFieldResponse, IFieldsResponse } from "@/types/gameField";
import { IResponseQuery } from "@/types/response";


const fieldService = vartsApi.injectEndpoints({
    endpoints: (build) => ({
        // Получение всех полей
        getAllFields: build.query<IFieldsResponse, IResponseQuery>({
            query: ({ page, take }) => ({
                url: `/field`,
                params: { page, take }
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.data.fields.map(({ id }) => ({ type: 'Fields' as const, id })),
                        { type: 'Fields', id: 'LIST' },
                    ]
                    : [{ type: 'Fields', id: 'LIST' }],
        }),
        // Создание нового поля
        createNewField: build.mutation<IFieldResponse, FormData>({
            query: (newField) => ({
                method: 'POST',
                url: '/field',
                body: newField,
            }),
            invalidatesTags: [{ type: 'Fields', id: 'LIST' }],
        }),
        // Обновление поля
        updateField: build.mutation<IFieldResponse, { id: string; data: FormData }>({
            query: ({ id, data }) => ({
                method: 'PUT',
                url: `/field/${id}`,
                body: data,
            }),
            invalidatesTags: [{ type: 'Fields', id: 'LIST' }],
        }),
        // Удаление поля
        deleteField: build.mutation<IFieldResponse, string>({
            query: (id) => ({
                method: 'DELETE',
                url: `/field/${id}`,
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