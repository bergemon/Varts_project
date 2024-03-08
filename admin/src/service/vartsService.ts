import { RootState } from '@/store/store';
import { IUser } from '@/types/user';
import { ISignInType, ISignUpType } from '@/utils/yupSchema';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'
import * as dotenv from "dotenv";

dotenv.config({ path: '../.env' })

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.BASE_URL_SERVICE,
  prepareHeaders: (headers, { getState }) => {
    // const token = (getState() as RootState).auth.access;
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
  credentials: 'include'
});

const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if ((result.error?.data as any)) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshResult = await baseQuery(
          { url: '/users/refresh', credentials: 'include' },
          api,
          extraOptions
        );

        // if (refreshResult.data) {
        //   const { access } = refreshResult.data as any;
        //   localStorage.setItem('token', access);
        //   api.dispatch(setCredentials({ token: access }))
        //   result = await baseQuery(args, api, extraOptions);
        // } else {
        //   api.dispatch(setCredentialsNull());
        //   localStorage.removeItem('token')
        // }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};


export const vartsApi = createApi({
  reducerPath: 'vartsApi', // name api
  tagTypes: ['Cards', 'Fields', 'GameSets'],
  baseQuery: baseQuery,
  endpoints: (build) => ({
    // auth
    regUser: build.mutation<{ data: { manager: IUser, accessToken: string }, message: string, status: string }, ISignUpType>({
      query: (data) => ({
        method: 'POST',
        url: '/dashboard/manager/register',
        body: data,
      }),
    }),
    loginUser: build.mutation<any, ISignInType>({
      query: (data) => ({
        method: 'POST',
        url: '/dashboard/manager/login',
        body: data,
      }),
    }),
    getUser: build.query<{data: IUser, }, void>({
      query: () => ({
        url: '/dashboard/manager'
      }),
    }),
  }),
})

// export hook

export const {
  useRegUserMutation,
  useLoginUserMutation,
  useGetUserQuery
} = vartsApi;
