import { vartsApi } from "./vartsService";
import { IGameSet, IGameSetResponse, IGameSetsResponse } from "@/types/gameSet";
import { IResponseQuery } from "@/types/response";


const gameSetService = vartsApi.injectEndpoints({
    endpoints: (build) => ({
        // Получение всех наборов игр
        getAllGameSets: build.query<IGameSetsResponse, IResponseQuery>({
            query: ({ page, take }) => ({
                url: `/gameSets`,
                params: { page, take }
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.data.map(({ id }) => ({ type: 'GameSets' as const, id })),
                        { type: 'GameSets', id: 'LIST' },
                    ]
                    : [{ type: 'GameSets', id: 'LIST' }],
        }),
        // Создание нового набора игр
        createNewGameSet: build.mutation<IGameSetResponse, Partial<IGameSet>>({
            query: (newGameSet) => ({
                method: 'POST',
                url: '/gameSets',
                body: newGameSet,
            }),
            invalidatesTags: [{ type: 'GameSets', id: 'LIST' }],
        }),
        // Обновление набора игр
        updateGameSet: build.mutation<IGameSetResponse, { id: string; data: Partial<IGameSet> }>({
            query: ({ id, data }) => ({
                method: 'PUT',
                url: `/gameSets/${id}`,
                body: data,
            }),
            invalidatesTags: [{ type: 'GameSets', id: 'LIST' }],
        }),
        // Удаление набора игр
        deleteGameSet: build.mutation<IGameSetResponse, { id: string }>({
            query: ({ id }) => ({
                method: 'DELETE',
                url: `/gameSets/${id}`,
            }),
            invalidatesTags: [{ type: 'GameSets', id: 'LIST' }],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetAllGameSetsQuery,
    useCreateNewGameSetMutation,
    useUpdateGameSetMutation,
    useDeleteGameSetMutation,
} = gameSetService;