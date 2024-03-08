import { IUser } from "@/types/user";
import { vartsApi } from "./vartsService";


const paymentService = vartsApi.injectEndpoints({
    endpoints: (build) => ({
        getWallet: build.query<{ data: number }, unknown>({
            query: () => ({
                url: '/payment',
            }),
            providesTags: [{ type: 'Wallet', id: 'LIST' }],
        }),
        // payments
        paymentsWallet: build.mutation<{data: { id: string, amount: number }}, 'pay80' | 'pay250' | 'pay500' | 'pay1000'>({
            query: (query) => ({
                method: 'POST',
                url: `/payment/${query}`,
            }),
            invalidatesTags: [{ type: 'Wallet', id: 'LIST' }],
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetWalletQuery,
    usePaymentsWalletMutation
} = paymentService;