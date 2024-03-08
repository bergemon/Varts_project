import { BaseButton } from '@/components/UI/baseButton';
import { CheckPass } from '@/components/UI/validatePassword';
import { LayoutNoAuth } from '@/layout/layoutNoAuth';
import { useRegUserMutation } from '@/service/vartsService';
import { useAppDispatch } from '@/store/hooks';
import { setCredentials, setUser } from '@/store/slice/authSlice';
import { authLogin } from '@/utils/isAuth';
import { CheckFieldPass } from '@/utils/validateRegisterPassword';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { yupResolver } from "@hookform/resolvers/yup";
import { FormConstructor } from '@/components/formConstructor';
import { authSignUpForm } from '@/forms/authForm';
import { ISignUpType, SignUpSchema } from '@/utils/yupSchema';

export default function Registration() {

  // хук регистрации
  const [registerUser, { data, isError, isLoading, error }] = useRegUserMutation();

  // регистрация формы
  const { register, watch, handleSubmit, formState: { errors } } = useForm<ISignUpType>({
    resolver: yupResolver(SignUpSchema),
  });

  // слежение за паролем
  const password = watch('password');

  const dispatch = useAppDispatch()

  const router = useRouter()

  const registrationUser: SubmitHandler<ISignUpType> = (data) => {
    toast.promise(
      registerUser(data).unwrap(),
      {
        loading: 'Регистрация...',
        success: (data) => `Регистрация прошла успешно ${data.data.email}`,
        error: (err) => `Произошла ошибка (${err.data.message})`
      }
    ).then((res) => {
      authLogin(res.data.access)
      const token = res.data.access
      localStorage.setItem('access', token)
      dispatch(setCredentials(res.data))
      dispatch(setUser(res))
      console.log(res)
      router.push('/create-profile')
    })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <LayoutNoAuth>
      <div className="mt-[2.93vh] flex flex-col items-center">
        <FormConstructor
          containerClassName="h-full p-[3.15vh] bg-opacity20 rounded-[1.09vh] "
          inputClassName="gap-[3.26vh] flex flex-col"
          formClassName="gap-[3.26vh] flex flex-col"
          onSubmit={handleSubmit(data => registrationUser(data))}
          errors={errors}
          fieldList={authSignUpForm}
          register={register}
        >
          {password && <div className="grid grid-cols-2 gap-[0.625vw] text-white">
            {CheckFieldPass.map(item => (
              <CheckPass label={item.label} key={item.id} checked={item.regex.test(password)} />
            ))}
          </div>}
          <div>
            <BaseButton type="submit" color="formAuth" disabled={isLoading}>Зарегистрироваться</BaseButton>
          </div>
          <div className="flex justify-center text-white text-xs px-5 text-center">
            Нажимая на кнопку «Отправить» Вы даете свое согласие с пользовательским соглашением
          </div>
          <div className="text-base font-medium text-white text-center">У меня уже есть аккаунт</div>
        </FormConstructor>
      </div>
    </LayoutNoAuth>
  )
}