import { IGameCardResponse, IGameCardsResponse } from "@/types/gameCard";
import { vartsApi } from "./vartsService";
import { IResponseQuery } from "@/types/response";


const gameCardService = vartsApi.injectEndpoints({
    endpoints: (build) => ({
        // get all cards
        getAllCards: build.query<IGameCardsResponse, IResponseQuery>({
            query: ({ page, take }) => ({
                url: `/card`,
                params: { page, take }
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.data.cards.map(({ id }) => ({ type: 'Cards' as const, id })),
                        { type: 'Cards', id: 'LIST' },
                    ]
                    : [{ type: 'Cards', id: 'LIST' }],
        }),
        // create new card
        createNewCard: build.mutation<IGameCardResponse, any>({
            query: (data) => ({
                method: 'POST',
                url: '/card',
                body: data,
            }),
            invalidatesTags: [{ type: 'Cards', id: 'LIST' }],
        }),
        // update card
        updateCard: build.mutation<IGameCardResponse, { id: string, data: FormData}>({
            query: ({ id, data }) => ({
                method: 'PUT',
                url: `/card/${id}`,
                body: data,
            }),
            invalidatesTags: [{ type: 'Cards', id: 'LIST' }],
        }),
        // delete card
        deleteCard: build.mutation<IGameCardResponse, string>({
            query: (id) => ({
                method: 'DELETE',
                url: `/card/${id}`,
            }),
            invalidatesTags: [{ type: 'Cards', id: 'LIST' }],
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetAllCardsQuery,
    useCreateNewCardMutation,
    useUpdateCardMutation,
    useDeleteCardMutation,
} = gameCardService;