import { BaseButton } from '@/components/UI/baseButton';
import { BaseInput } from '@/components/UI/baseInput';
import { CheckPass } from '@/components/UI/validatePassword';
import { LayoutNoAuth } from '@/layout/layoutNoAuth';
import { useRegUserMutation } from '@/service/vartsService';
import { useAppDispatch } from '@/store/hooks';
import { setCredentials, setUser } from '@/store/slice/authSlice';
import { IUserRegister } from '@/types/user';
import { CalcHeight, CalcWidth } from '@/utils/calcSize';
import { authLogin } from '@/utils/isAuth';
import { CheckFieldPass } from '@/utils/validateRegisterPassword';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast';

export default function Registration() {

  // хук регистрации
  const [registerUser, { data, isError, isLoading, error }] = useRegUserMutation();

  // регистрация формы
  const { register, watch, handleSubmit, formState: { errors } } = useForm<IUserRegister>();

  // слежение за паролем
  const password = watch('password');

  const dispatch = useAppDispatch()

  const router = useRouter()

  const registrationUser: SubmitHandler<IUserRegister> = (data) => {
    toast.promise(
      registerUser(data).unwrap(),
      {
        loading: 'Регистрация...',
        success: (data) => `Регистрация прошла успешно ${data.user.email}`,
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
        <form onSubmit={handleSubmit((data) => registrationUser(data))} style={{ width: CalcWidth(430) }} className={`h-full p-[3.15vh] bg-opacity20 rounded-[1.09vh] gap-[3.26vh] flex flex-col`}>
          <BaseInput {...register("email")} error={errors.email} placeholder="E-email" color="form" />
          <BaseInput {...register("password")} error={errors.password} type="password" placeholder="Пароль" color="form" />
          <BaseInput {...register("password_repeat")} error={errors.password_repeat} type="password" placeholder="Пароль" color="form" />
          {password && <div className="grid grid-cols-2 gap-[0.625vw] text-white">
            {CheckFieldPass.map(item => (
              <CheckPass label={item.label} key={item.id} checked={item.regex.test(password)} />
            ))}
          </div>}
          {/* {isError && error && <p>{error.data.message.toString()}</p>} */}
          <div>
            <BaseButton type="submit" color="formAuth" disabled={isLoading}>Зарегистрироваться</BaseButton>
          </div>
          <div className="flex justify-center text-white text-xs px-5 text-center">
            Нажимая на кнопку «Отправить» Вы даете свое согласие с пользовательским соглашением
          </div>
          <div className="text-base font-medium text-white text-center">У меня уже есть аккаунт</div>
        </form>
      </div>
    </LayoutNoAuth>
  )
}