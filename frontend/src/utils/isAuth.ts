import axios from 'axios'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import { isServer } from './server'
import { NextPageContext } from 'next'
import Router from 'next/router'

export const isAuth = async ({ req, res }: NextPageContext) => {
  const token = getCookie('_accessToken', { req, res })

  try {
    if (!token) {
      return false
    }
    await axios.get(isServer + '/v1/user', {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true
    })
    return true
  } catch (error: any) {
    // Проверка, является ли ошибка ошибкой истечения токена
    // if (error.response && error.response.status === 401) {
    //   // Получение refresh токена из cookie
    //   // Отправка запроса на сервер для получения нового access токена
    //   try {
    //     const refreshResponse = await axios.get(isServer + '/api/users/refresh', {
    //       withCredentials: true,
    //       headers: {
    //         Cookie: req?.headers.cookie || ''
    //       }
    //     });
    //     if (refreshResponse.data && refreshResponse.data.access) {
    //       // Сохранение нового access токена в cookie
    //       setCookie('_accessToken', refreshResponse.data.access, { req, res });
    //       // Повторная попытка выполнить исходный запрос с новым access токеном
    //       await axios.get(isServer + '/v1/user', {
    //         headers: { Authorization: `Bearer ${refreshResponse.data.access}` },
    //         withCredentials: true
    //       });
    //       return true;
    //     }
    //   } catch (refreshError) {
    //     console.error('Failed to refresh token:', refreshError);
    //   }
    // }
    deleteCookie('token')
    return false
  }
}

export const authLogin = async (token: string) => {
  setCookie('_accessToken', token, { maxAge: 60 * 60 * 24 })
}

export const authLogout = () => {
  deleteCookie('_accessToken')
  Router.push('/login')
}
