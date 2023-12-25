import { BaseButton } from '@/components/UI/baseButton';
import { BaseInput } from '@/components/UI/baseInput';
import { LayoutNoAuth } from '@/layout/layoutNoAuth';
import { useLoginUserMutation } from '@/service/vartsService';
import { useAppDispatch } from '@/store/hooks';
import { setCredentials, setUser } from '@/store/slice/authSlice';
import { IUserRegister } from '@/types/user';
import { CalcWidth } from '@/utils/calcSize';
import { authLogin } from '@/utils/isAuth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function Registration() {
  const { register, control, handleSubmit, formState: { errors } } = useForm<IUserRegister>();

  const [loginUser, { data, isLoading, isError, isSuccess }] = useLoginUserMutation();

  const dispatch = useAppDispatch()

  const router = useRouter()

  const registrationUser: SubmitHandler<IUserRegister> = (data) => {
    
    toast.promise(
      loginUser(data).unwrap(),
      {
        loading: 'Вход...',
        success: (data) => `Вход прошел успешно ${data.user.email}`,
        error: (err) => `Произошла ошибка (${err.data.message})`
      }
    ).then((res) => {
      authLogin(res.access)
      const token = res.access
      localStorage.setItem('access', token)
      dispatch(setCredentials(res))
      dispatch(setUser(res))
      router.push('/')
    })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <LayoutNoAuth>
      <div className="mt-[2.93vh] flex flex-col items-center">
        <form onSubmit={handleSubmit((data) => registrationUser(data))} style={{ width: CalcWidth(430) }} className={`h-[40vh] flex flex-col p-[3.15vh] bg-opacity20 rounded-[1.09vh]`}>
          <div className="gap-[3.26vh] flex flex-col">
            <BaseInput {...register('email')} error={errors.email} placeholder="E-email" color="form" />
            <BaseInput {...register('password')} error={errors.password} type="password" placeholder="Пароль" color="form" />
          </div>
          <div className="flex justify-end mt-2.5 text-white">
            Забыли пароль?
          </div>
          <div className="mt-auto">
            <BaseButton type="submit" color="formAuth" disabled={isLoading}>Войти</BaseButton>
          </div>
          <div className="text-base font-medium text-white text-center mt-[30px]">
            <Link href="/registration">Зарегистрироваться</Link>
          </div>
        </form>
      </div>
    </LayoutNoAuth>
  )
}