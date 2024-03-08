import { BaseButton } from '@/components/UI/baseButton';
import { BaseInput } from '@/components/UI/form/baseInput';
import { FormConstructor } from '@/components/formConstructor';
import { authLoginForm } from '@/forms/authForm';
import { LayoutNoAuth } from '@/layout/layoutNoAuth';
import { useLoginUserMutation } from '@/service/vartsService';
import { useAppDispatch } from '@/store/hooks';
import { setCredentials, setUser } from '@/store/slice/authSlice';
import { CalcWidth } from '@/utils/calcSize';
import { authLogin } from '@/utils/isAuth';
import { ISignInType, SignInSchema } from '@/utils/yupSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function Registration() {
  const { register, control, handleSubmit, formState: { errors } } = useForm<ISignInType>({
    resolver: yupResolver(SignInSchema),
  });

  const [loginUser, { isLoading, isError, isSuccess }] = useLoginUserMutation();

  const dispatch = useAppDispatch()

  const router = useRouter()

  const loginUserSend: SubmitHandler<ISignInType> = (data) => {

    toast.promise(
      loginUser(data).unwrap(),
      {
        loading: 'Вход...',
        success: (data) => `Вход прошел успешно ${data.data.user.email}`,
        error: (err) => `Произошла ошибка (${err.message})`
      }
    ).then((res) => {
      authLogin(res.data.access)
      const token = res.data.access
      localStorage.setItem('access', token)
      dispatch(setCredentials(res.data))
      dispatch(setUser(res.data.user))
      router.push('/')
    })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <LayoutNoAuth>
      <div className="mt-[2.93vh] flex flex-col items-center">
        <FormConstructor
          containerClassName="h-[40vh] w-1/2 p-[3.15vh] bg-opacity20 rounded-[1.09vh] "
          inputClassName="gap-[3.26vh] flex flex-col"
          formClassName="gap-[3.26vh] flex flex-col"
          onSubmit={handleSubmit(data => loginUserSend(data))}
          errors={errors}
          fieldList={authLoginForm}
          register={register}
        >

          <div className="flex justify-end mt-2.5 text-white">
            Забыли пароль?
          </div>
          <div>
            <BaseButton type="submit" color="formAuth" disabled={isLoading}>Войти</BaseButton>
          </div>
          <div className="text-base font-medium text-white text-center">
            <Link href="/registration">Зарегистрироваться</Link>
          </div>
        </FormConstructor>
      </div>
    </LayoutNoAuth>
  )
}