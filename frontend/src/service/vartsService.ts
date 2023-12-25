import { RootState } from '@/store/store';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'
import { HYDRATE } from 'next-redux-wrapper'
import * as dotenv from "dotenv";
import { IUser, IUserRegister, IUserResponse } from '@/types/user';

dotenv.config({ path: '../.env' })

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.BASE_URL_SERVICE,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.access
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
  baseQuery: customFetchBase,
  // extractRehydrationInfo(action, { reducerPath }) {
  //   if (action.type === HYDRATE) {
  //     return action.payload[reducerPath]
  //   }
  // },
  endpoints: (build) => ({
    // auth
    regUser: build.mutation<IUserResponse, IUserRegister>({
      query: (data) => ({
        method: 'POST',
        url: '/user/register',
        body: data,
      }),
    }),
    loginUser: build.mutation<any, unknown>({
      query: (data) => ({
        method: 'POST',
        url: '/user/login',
        body: data,
      }),
    }),
  }),
})

// export hook

export const {
    useRegUserMutation,
    useLoginUserMutation
} = vartsApi
