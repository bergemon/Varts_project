import { IUser } from "@/types/user";
import { vartsApi } from "./vartsService";


const userService = vartsApi.injectEndpoints({
    endpoints: (build) => ({
        // get all experience
        getUser: build.query<IUser, unknown>({
            query: () => ({
                url: '/user',
            }),
            transformResponse: (res: { data: IUser }) => res.data,
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetUserQuery
} = userService;

export const selectGetMe = userService.endpoints.getUser.select(undefined);