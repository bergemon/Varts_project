import { FormConstructor } from "@/components/formConstructor";
import { LayoutNoAuth } from "@/layout/layoutNoAuth";
import { ISignUpType, SignUpSchema } from "@/utils/yupSchema";
import { Button, Card, Typography } from "@material-tailwind/react";
import Link from "next/link";
import { ReactElement } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { authSignUpForm } from "@/forms/authForm";
import { useRegUserMutation } from "@/service/vartsService";
import toast from 'react-hot-toast';
import { useAppDispatch } from "@/store/hooks";
import { setCredentials, setUser } from "@/store/slice/authSlice";
import { useRouter } from "next/router";
import { authLogin } from "@/utils/isAuth";


export default function Register() {
  // регистрация формы
  const { register, handleSubmit, formState: { errors } } = useForm<ISignUpType>({
    resolver: yupResolver(SignUpSchema),
  });

  const [registerUser, { isLoading }] = useRegUserMutation();

  const dispatch = useAppDispatch();
  const router = useRouter();

  const registrationUser: SubmitHandler<ISignUpType> = (data) => {
    toast.promise(
      registerUser(data).unwrap(),
      {
        loading: 'Регистрация...',
        success: (data) => `Регистрация прошла успешно ${data.data.manager.email}`,
        error: (err) => `Произошла ошибка (${err.data.message})`
      }
    ).then((res) => {
      dispatch(setUser(res.data.manager));
      authLogin(res.data.accessToken);
      localStorage.setItem('token', res.data.accessToken);
      dispatch(setCredentials(res.data.accessToken));
      router.push('/')
    })
      .catch((error) => {
        console.error(error);
      });
  };


  return (
    <Card color="transparent" className="px-10 py-10" shadow={true}>
      <Typography variant="h4" color="blue-gray">
        Регистрация аккаунта
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Зарегистрировать новый аккаунт
      </Typography>
      <FormConstructor fieldList={authSignUpForm} onSubmit={handleSubmit(data => registrationUser(data))} register={register}
        formClassName="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        inputClassName="mb-1 flex flex-col gap-6"
        errors={errors}
      >
        <Button loading={isLoading} type="submit" className="mt-6" fullWidth>
          Регистрация
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Уже есть аккаунт?{" "}
          <Link href="/login" className="font-medium text-blue-700">
            Войти
          </Link>
        </Typography>
      </FormConstructor>
    </Card>
  );
}

Register.getLayout = function getLayout(page: ReactElement) {
  return <LayoutNoAuth>{page}</LayoutNoAuth>
}